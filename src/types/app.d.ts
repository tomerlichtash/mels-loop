/**
 * App object that contains data about the current build
 */
export interface IYasppApp {
	/**
	 * The full root path of this app
	 */
	readonly rootPath: string;
	/**
	 * The full path of the content folder
	 */
	readonly contentPath: string;
	/**
	 * The relative (to the content path) path of the index page
	 */
	readonly indexPath: string;
	/**
	 * True if this app was initialized successfully and found all its paths
	 */
	readonly isValid: boolean;
}

export interface IYasppLocaleConfig {
	readonly langs: ReadonlyArray<string>;
	readonly defaultLocale?: string;
}

export interface IYasppAppContentConfig {
	readonly root: string;
	readonly index: string;

}

interface IYasppConfig {
	readonly content: IYasppAppContentConfig;
	readonly locales: IYasppLocaleConfig;
}

