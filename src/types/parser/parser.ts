import { IMLParsedNode } from '../models';
import { LoadContentModes, MLParseModes } from './modes';

/**
 * Provides information about the parse context and
 * helper functions to manipulate nodes
 */
export interface INodeProcessorContext {
	/**  The content loading options, passed by the page (or defaults) */
	readonly mode: IContentParseOptions;

	/**
	 * A helper function that sets the text of the first text child, or creates one.
	 * The node is assumed to be simple, so no drilldown is performed past the node
	 * itself and its immediate children
	 * @param node
	 * @param text
	 */
	setNodeText(node: IMLParsedNode, text: string): IMLParsedNode;

	/**
	 * Returns the next consecutive number, 0 based, in a series keyed by `type`
	 * @param type
	 */
	getEnumerator(type: string): number;
}

/**
 * A function that may return a new node, modify the current node if possible, or return the provided node.
 * @returns a valid node, if one was received
 */
export type MLNodeProcessorFunction = (
	node: IMLParsedNode,
	context: INodeProcessorContext
) => IMLParsedNode;

export interface IContentParseOptions {
	/** Defaults to FULL */
	readonly contentMode: LoadContentModes;
	/** The locale for which this content is parsed */
	readonly locale: string;
	/**  Defaults to NORMAL */
	readonly parseMode?: MLParseModes;
	/**  an optional function that may return a new node */
	readonly nodeProcessors?: Array<MLNodeProcessorFunction>;
}
