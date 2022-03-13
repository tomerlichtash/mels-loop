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

/**
 * A function that may return a new node, modify the current node if possible, or return the provided node.
 * @returns a valid node, if one was received
 */
export type MLNodeProcessorFunction = (node: IMLParsedNode, options: IContentParseOptions) => IMLParsedNode;

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
	readonly nodeProcessors?: Array<MLNodeProcessorFunction>

}
