type IconAnimtationTypes = "rotate" | "frames";

export interface IFavIconAnimator {
	run(): Promise<void>;
	abort(): void;
}
/**
 * Properties used to initialize a favicon animation
 */
export interface IFavIconProps {
	/**
	 * Currently "rotate" or "frames"
	 */
	type: IconAnimtationTypes;
	/**
	 * Image source url, or an image instance
	 */
	image: HTMLImageElement | string;
	/**
	 * Animation duration, in seconds (accepts fractions)
	 */
	durationSeconds: number;
	/**
	 * Favicon width
	 */
	width: number;
	height: number;

	/**
	 * Optional number of columns in a multi-frame image. Defaults to 1
	 */
	cols?: number;
	 /**
	 * Optional number of rows in a multi-frame image. Defaults to 1
	 */
	rows?: number;
	/**
	 * Defaults to 15 FPS
	 */
	fps?: number;
	/**
	 * Defaults to the first <link rel="icon" .../> element in the document
	 */
	icon?: HTMLLinkElement;
	/**
	 * If true, output warnings to console
	 */
	debug?: boolean;
}

interface IFIProps extends IFavIconProps {
	canvas: HTMLCanvasElement;
	/**
	 * Width of a frame in the source image (full width if 1 column)
	 */
	frameWidth: number;
	/**
	 * Height of a frame in the source image (full height if 1 column)
	 */
	frameHeight: number;
	/**
	 * The interval number returned by `setInterval`
	 */
	interval: number;
	/**
	 * Timestamp of animation start
	 */
	startTime: number;
	/**
	 * Current iteration
	 */
	count: number;
	/**
	 * Saved icon href, to restore when the animation is done
	 */
	savedIconHref: string;
	/**
	 * Computed number of columns
	 */
	rows: number;
	/**
	 * Computed number of rows
	 */
	cols: number;
	/**
	 * Cache of data urls
	 */
	cache: { [key: string]: string };
	/**
	 * Resolve function for the `run()` promise, to call when the animation is done
	 */
	resolve: ((...args: unknown[]) => void) | null;
}

/**
 * The context is assumed to be cleared
 */
type AnimatorFunction = (ctx: CanvasRenderingContext2D, props: IFIProps) => string;

export class FavIconAnimator implements IFavIconAnimator {
	constructor(animationProps: IFavIconProps) {
		const doc = window.top.document;
		const icon = animationProps.icon || doc.querySelector("link[rel='icon']");
		this.warn = animationProps.debug ? (...args: unknown[]) => {
			console.warn("favicon animator: ", ...args);
		} : () => void 0;
		this.props = {
			...animationProps,
			canvas: doc.createElement("canvas"),
			fps: animationProps.fps || 15,
			frameWidth: 0,
			frameHeight: 0,
			interval: 0,
			startTime: 0,
			count: 0,
			resolve: null,
			rows: animationProps.rows || 1,
			cols: animationProps.cols || 1,
			cache: {},
			savedIconHref: (icon && icon.href) || "",
			icon: icon,

		};
		this.props.canvas.width = this.props.width;
		this.props.canvas.height = this.props.height;
	}

	/**
	 * Aborts the animation, if it is running
	 */
	public abort(): void {
		this._abort = true;
	}

	public run(): Promise<void> {
		if (!this.props.icon) {
			this.warn("Missing favicon in document");
			return Promise.resolve();
		}
		if (this.props.durationSeconds <= 0 || isNaN(this.props.durationSeconds)) {
			this.warn(`Meaningless duration  ${this.props.durationSeconds}`);
			return Promise.resolve();
		}
		return new Promise((resolve) => {
			this.props.resolve = resolve;
			this._loadImage(this.props);
		})
		.then(() => { // force execution even if no one has `then`ed this call
			void 0;
		})
	}

	/////////////////// Implementation /////////////////////

	/**
	 * Provided + computed animation properties
	 */
	private readonly props: IFIProps;
	/**
	 * either noop or console warn
	 */
	private readonly warn: (...args: unknown[]) => void;
	private _abort = false;

	/**
	 * Icon is guaranteed to exist at this stage
	 * @param props 
	 */
	private _loadImage(props: IFIProps): void {
		let src = "";
		if (!props.image) {
			src = props.icon.getAttribute("href");
		}
		if (typeof props.image === "string") {
			src = props.image;
		}
		if (src) {
			const img = new Image();
			img.addEventListener("load", () => this._onImageLoaded(img, props));
			img.addEventListener("error", () => this._onImageLoaded(null, props));
			img.src = src;
		}
		else if (props.image) {
			this._onImageLoaded(props.image as HTMLImageElement, props);
		}
	}

	private _getAnimator(props: IFIProps): AnimatorFunction | null {
		return props.type === "frames" ? this._drawIconFrame.bind(this)
			: props.type === "rotate" ? this._rotateIconFrame.bind(this)
				: null;
	}

	/**
	 * Launches the animation if the image has been loaded
	 * @param img 
	 * @param p 
	 * @returns 
	 */
	private _onImageLoaded(img: HTMLImageElement | null, p: IFIProps): void {
		if (this._abort) {
			this._abort = false; // object may be reused
			return p.resolve();
		}
		if (!img) {
			this.warn(`failed to load image ${String(p.image)}`);
			return p.resolve();
		}
		p.image = img;
		if (p.type === "frames") {
			p.frameWidth = img.width / p.cols;
			p.frameHeight = img.height / p.rows;
		}
		else {
			p.frameHeight = img.height;
			p.frameWidth = img.width;
		}
		this._animate(p);
	}

	private _animate(p: IFIProps): void {
		if (p.interval) {
			return;
		}
		p.startTime = Date.now();
		const animateIt = this._getAnimator(p);
		if (!animateIt) {
			this.warn("Missing animator for type", p.type);
			return p.resolve();
		}

		p.interval = window.setInterval((p: IFIProps) => {
			const ic = window.top.document.querySelector("link[rel='icon']");
			if (!ic || this._abort || (Date.now() - p.startTime) >= p.durationSeconds * 1000) {
				clearInterval(p.interval);
				this._abort = false;
				p.icon.href = p.savedIconHref;
				return p.resolve();
			}
			if (ic !== p.icon) {
				p.icon = ic as HTMLLinkElement;
				p.savedIconHref = ic && ic.getAttribute("href");
			}
			const ctx = p.canvas.getContext("2d");
			ctx.clearRect(0, 0, p.width, p.height);
			const dataUrl = animateIt(ctx, p);
			p.icon.href = dataUrl;
			p.count++;
		}, (1000 / p.fps), p);
	}

	private _drawIconFrame(ctx: CanvasRenderingContext2D, p: IFIProps): string {
		const col = p.count % p.cols,
			row = Math.floor(p.count / p.rows) % p.rows,
			key = [col, 'x', row].join('');
		let dataUrl = p.cache[key];
		if (dataUrl) {
			return dataUrl;
		}
		ctx.drawImage(p.image as HTMLImageElement,
			col * p.frameWidth, row * p.frameHeight, p.frameWidth, p.frameHeight,
			0, 0, p.width, p.height);
		return p.cache[key] = p.canvas.toDataURL("image/png");
	}

	private _rotateIconFrame(ctx: CanvasRenderingContext2D, p: IFIProps) {
		const frame = p.count % 18;
		let dataUrl = p.cache[String(frame)];
		if (dataUrl) {
			return dataUrl;
		}

		const angle = Math.PI / 18;
		ctx.drawImage(p.image as HTMLImageElement,
			0, 0, p.frameWidth, p.frameHeight,
			0, 0, p.width, p.height);
		ctx.translate(p.width * 0.5, p.height * 0.5);
		ctx.rotate(frame * angle);
		ctx.translate(p.width * -0.5, p.height * -0.5);
		return p.cache[String(frame)] = p.canvas.toDataURL("image/png");
	}
}
