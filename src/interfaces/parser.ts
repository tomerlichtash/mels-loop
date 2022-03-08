import { IMLParsedNode } from "./models";
export enum LoadContentModes {
	NONE = "none",
	METADATA = "metadata",
	FULL = "full"
}


export enum MLParseModes {
	VERSE = "verse",
	NORMAL = "normal"
}

export enum LoadFolderModes {
	FOLDER = "folder",
	CHILDREN = "children"
}


export interface IContentParseOptions {
	/**
	 * Defaults to FOLDER
	 */
	readonly loadMode: LoadFolderModes;
	/**
	 * Defaults to FULL
	 */
	readonly contentMode: LoadContentModes;
	/**
	 * Defaults to NORMAL
	 */
	readonly parseMode: MLParseModes;
	/**
	 * an optional function that may return a new node
	 */
	readonly nodeProcessor?: (node: IMLParsedNode, options: IContentParseOptions) => IMLParsedNode | null;

}
