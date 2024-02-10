import type { DynamicContentTypes, IDynamicContentRecord } from 'lib/types';
import type {
	IMLParsedNode,
	IPageMetaData,
	MLNODE_TYPES,
	ParsedNode,
} from 'types/models';
import type {
	IContentParseOptions,
	MLNodeProcessorFunction,
} from 'types/parser';
import type { MLParseContext } from './parserContext';

export interface IContentUtils {
	/**
	 * Convert a markdown parse tree (tree of AST nodes) to a ML parse tree (tree of IMLParsedNode)
	 * @param nodes
	 * @param mode Various parse options
	 */
	processParseTree(
		nodes: ParsedNode[],
		metaData: IPageMetaData,
		mode: IContentParseOptions
	): IMLParsedNode[];

	/**
	 * Strips xml comments from the string
	 * @param source
	 */
	stripComments(source: string): string;

	/**
	 * Creates a content mapping function (maps node => node) only for the provided types
	 * @param filter
	 * @param types
	 */
	createNodeMappingFilter(
		filter: MLNodeProcessorFunction,
		...types: Array<MLNODE_TYPES>
	): MLNodeProcessorFunction;

	/**
	 * Marks links as popovers for the links that match the provided dynamic content types.
	 *
	 * If not types are provided, glossary and annotations are assumed
	 * @param types
	 */
	createPopoverLinksMappingFilter(
		...types: DynamicContentTypes[]
	): MLNodeProcessorFunction;

	/**
	 * Extract content type and id from a url, with a default content type
	 * @param url
	 * @param defaultType
	 */
	urlToContentData(
		url: string,
		defaultType?: DynamicContentTypes
	): IDynamicContentRecord;
}

export type ParsedNodeProcessor = (
	node: ParsedNode,
	context: MLParseContext
) => IMLParsedNode;

export interface IFigureInfo {
	readonly index: number;
	readonly realIndex: number;
	readonly id: string;
}
