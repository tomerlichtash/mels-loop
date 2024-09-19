import type { LoadContentModes, LoadFolderModes, ParseModes } from 'lib/types/modes';
import type { ParseContext } from './lib/parserContextClass';
import type { ASTNODE_TYPES } from 'lib/types/nodes';
import type { IParsedNode } from 'lib/types/models';

export interface ILoadContentOptions {
	/** Defaults to FOLDER */
	readonly loadMode: LoadFolderModes;
	/** The content path, relative to the content folder */
	readonly relativePath: string;
	/** If true, iterate over children folders */
	readonly locale: string;
	readonly mode?: Partial<IContentParseOptions>;
	readonly rootFolder?: string;
}

export interface IFigureInfo {
	readonly index: number;
	readonly realIndex: number;
	readonly id: string;
}

/** A single node in a parsed markdown AST */
export type ParsedNode = {
	readonly type: ASTNODE_TYPES;
	readonly attributes?: Map<string, string>;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[prop: string]: any;
};

export type ParsedNodeProcessor = (node: ParsedNode, context: ParseContext) => IParsedNode;

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
	setNodeText(node: IParsedNode, text: string): IParsedNode;

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
export type NodeProcessorFn = (
	node: IParsedNode,
	context: INodeProcessorContext
) => IParsedNode;

export interface IContentParseOptions {
	/** Defaults to FULL */
	readonly contentMode: LoadContentModes;
	/** The locale for which this content is parsed */
	readonly locale: string;
	/**  Defaults to NORMAL */
	readonly parseMode?: ParseModes;
	/**  an optional function that may return a new node */
	readonly nodeProcessors?: Array<NodeProcessorFn>;
}
