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


export type MLNodeFilterFunction = (node: IMLParsedNode, options: IContentParseOptions) => IMLParsedNode | null;

export interface IContentParseOptions {
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
	readonly nodeProcessor?: MLNodeFilterFunction

}
