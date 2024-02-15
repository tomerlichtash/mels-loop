export type IconAnimtationTypes = 'rotate' | 'frames';

/**
 * The context is assumed to be cleared
 */
export type AnimatorFunction = (
	ctx: CanvasRenderingContext2D,
	props: IFIProps
) => string;

export interface IFavIconAnimator {
	run(): Promise<void>;
	abort(): void;
}

/** Properties used to initialize a favicon animation */
export interface IFavIconProps {
	/**
	 * Currently "rotate" or "frames". "rotate" takes one icon and rotates it in its frame.
	 * "frames" takes an image that should have width*height frames and moves the
	 * favicon between them.
	 */
	type: IconAnimtationTypes;
	/** Image source url, or an image instance */
	image: HTMLImageElement | string;
	/** Animation duration, in seconds (accepts fractions) */
	durationSeconds: number;
	/** Favicon width */
	width: number;
	/** Favicon height */
	height: number;
	/** Optional number of columns in a multi-frame image. Defaults to 1 */
	cols?: number;
	/** Optional number of rows in a multi-frame image. Defaults to 1 */
	rows?: number;
	/** Defaults to 15 FPS */
	fps?: number;
	/** Defaults to the first <link rel="icon" .../> element in the document */
	icon?: HTMLLinkElement;
	/** If true, output warnings to console */
	debug?: boolean;
}

export interface IFIProps extends IFavIconProps {
	canvas: HTMLCanvasElement;
	/** Width of a frame in the source image (full width if 1 column) */
	frameWidth: number;
	/** Height of a frame in the source image (full height if 1 column) */
	frameHeight: number;
	/** The interval number returned by `setInterval` */
	interval: number;
	/** Timestamp of animation start */
	startTime: number;
	/** Current iteration */
	count: number;
	/** Saved icon href, to restore when the animation is done */
	savedIconHref: string;
	/** Computed number of columns */
	rows: number;
	/** Computed number of rows */
	cols: number;
	/** Cache of data urls */
	cache: { [key: string]: string };
	/** Resolve function for the `run()` promise, to call when the animation is done */
	resolve: ((...args: unknown[]) => void) | null;
}
