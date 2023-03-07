/**
 * General utility functions
 */

export interface IAppEnvironment {
	readonly isBrowser: boolean;
	readonly isDevMode: boolean;
}

/**
 * Utilities available on the node and browser sides
 */
export interface IMLUtils {
	uniqueId(prefix?: string): string;

	arrayToMap<T>(array: Array<T>, field: string): { [key: string]: T };

	stringArraysToMap(...arrays: Array<string>[]): { [key: string]: 1 };

	safeMerge(into: object, data: object | string): object;

	parseDate(dateString: string | number | null | undefined): Date;

	clonePlainObject<T extends object>(source: object): T;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	flattenArray(arr: Array<any>): [];

	/**
	 * True if the app is running in a browser (as opposed to the react app constructed during a static build)
	 */
	readonly appEnvironment: IAppEnvironment;
}

const ALLOWED_MERGE_TYPES: Array<string> = [
	"object",
	"string",
	"number",
	"boolean",
];

class MLUtils implements IMLUtils {
	private readonly seed = `mlid-${String(Date.now() % 1000)}`;
	private nextNumber = Math.round(Date.now() % 1000);
	private readonly _appEnvironment: IAppEnvironment;

	constructor() {
		const t = typeof window;
		this._appEnvironment = {
			isDevMode: Boolean(process?.env?.NEXT_PUBLIC_ML_DEBUG),
			isBrowser: (t === "object" || t === "function") && typeof window.setTimeout === "function"
		};
	}

	public get appEnvironment() {
		return this._appEnvironment;
	}

	public uniqueId(prefix: string = this.seed): string {
		return `${prefix}-${this.nextNumber++}`;
	}

	public arrayToMap<T>(array: Array<T>, field: string): { [key: string]: T } {
		const map: { [key: string]: T } = array.reduce((acc, elem) => {
			const value = elem && elem[field];
			if (value !== null && value !== undefined) {
				acc[String(value)] = elem;
			}
			return acc;
		}, {});

		return map;
	}

	public stringArraysToMap(...arrays: Array<string>[]): { [key: string]: 1 } {
		let map: { [key: string]: 1} = {};
		for (const array of arrays) {
			array?.forEach(s => map[s] = 1);
		}
		return map;
	}

	public parseDate(dateString: string | number | null | undefined): Date {
		const t = typeof dateString;
		if (t === "number") {
			return new Date(dateString);
		}
		if (t === "string") {
			try {
				const t = Date.parse(dateString as string);
				return new Date(t);
			} catch (e) {
				console.error(`Error parsing date ${dateString}`);
			}
		}
		return new Date();
	}

	/**
	 * Sort-of-safely merge data into an object. The object should contain values in its fields,
	 * so that the type can be determined at runtime
	 * @param into
	 * @param data
	 * @returns
	 */
	public safeMerge(into: object, data: object | string): object {
		if (!into || !data) {
			return into;
		}
		const realData = typeof data === "string" ? JSON.parse(data) : data;
		Object.keys(into).forEach((key) => {
			const val = realData[key];
			const tSource = typeof val;

			if (!ALLOWED_MERGE_TYPES.includes(tSource)) {
				return;
			}
			const myVal = into[key];
			const tTarget = typeof myVal;
			if (tTarget === "object") {
				if (myVal === null) {
					into[key] = val;
				} else if (val instanceof Date || Array.isArray(val)) {
					// we don't deep-merge arrays
					into[key] = val;
				} else if (tSource === "object") {
					this.safeMerge(myVal as object, val as object);
				} else if (myVal instanceof Date && tSource === "string") {
					into[key] = this.parseDate(val as string);
				} else {
					console.warn(
						`merge data: cannot merge field ${key} of type ${tSource} into object`
					);
				}
			} else {
				// target field is primitive, check source field
				if (tSource !== "object") {
					into[key] = val;
				} else {
					console.warn(
						`merge data: cannot merge field ${key} of type ${tSource} into ${tTarget}}`
					);
				}
			}
		});
		return into;
	}

	public clonePlainObject<T extends object>(source: object): T {
		return JSON.parse(JSON.stringify(source));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public flattenArray(arr: Array<any>) {
		return arr.reduce((flat, toFlatten) => {
			return flat.concat(
				Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten
			);
		}, []);
	}
}

export const mlUtils: IMLUtils = new MLUtils();
