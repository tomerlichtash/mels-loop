import * as mdParser from "simple-markdown";

/**
 * A single node in a parsed markdown AST
 */
export type ParsedNode = mdParser.SingleASTNode;

interface INodeTypeMap {
	paragraph: string;
	line: string;
	link: string;
	image: string;
	text: string;
	strong: string;
	em: string;
	list: string;
	ins: string;
	del: string;
	"list-item": string;
	codeBlock: string;
	unknown: string;
}

export type MLParsedNodeType = keyof INodeTypeMap;

/**
 * A markdown node parsed and processed by ML
 */
export interface IMLParsedNode {
	readonly type: MLParsedNodeType;
	readonly key: string;
	readonly line: number;
	readonly children?: IMLParsedNode[];
	readonly text?: string;
	/**
	 * Un/Ordered list
	 */
	readonly ordered?: boolean;
	/**
	 * Link target
	 */
	readonly target?: string;
	/**
	 * Heading level
	 */
	readonly level?: number | string;
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
	 * Moto metadata, if present in the MD
	 */
	readonly moto: string;
	/**
	 * Credits metadata, if present in the MD
	 */
	readonly credits: string;
	/**
	 * Author metadata, if present in the MD
	 */
	readonly author: string;
	/**
	 * Full text of the MD
	 */
	readonly content: string;
	/**
	 * The parsed MD
	 */
	readonly parsed: IMLParsedNode[];
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
	tag?: string;
	style?: string;
}
