import * as mdParser from "simple-markdown"

/**
 * A single node in a parsed markdown AST
 */
export type ParsedNode = mdParser.SingleASTNode;

/**
 * A markdown node parsed and processed by ML
 */
export interface IMLParsedNode extends mdParser.SingleASTNode {
	key: string;
	line: number;
	text?: string;
	children?: IMLParsedNode[] 
}

/**
 * Full results of a parsed page
 */
export interface IParsedPageData {
	/**
	 * Usually the file name
	 */
	readonly id: string;
	/**
	 * Date metadata, if present in the MD
	 */
	readonly date: Date;
	/**
	 * Title metadata, if present in the MD
	 */
	readonly title: string;
	/**
	 * Full text of the MD
	 */
	readonly content: string;
	/**
	 * The parsed MD
	 */
	readonly parsed:IMLParsedNode[]
	/**
	 * If present, ignore the data
	 */
	readonly error?: string;
}

/**
 * The data passed to a next component from the static props. The content is serialized to circumvent
 * next's approach to serializing
 */
export interface IContentComponentData {
	content: string;
	locale: string;
}

/**
 * The data structure passed to a content component
 */
export interface IContentComponentInitData {
	data: IMLParsedNode;
	locale: string;
}
