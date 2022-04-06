import { ComponentKeyMap } from "../locales/types";
import { DynamicContentTypes } from "./dynamic-content";

/**
 * Workaround for any
 */
export interface IPlainObject {
	[key: string | number]: string | number | boolean | object | null;
}

/**
 * A single node in a parsed markdown AST
 */
export type ParsedNode = {
	type: ASTNODE_TYPES;

	/* eslint-disable @typescript-eslint/no-explicit-any */
	[prop: string]: any;
};

export enum ASTNODE_TYPES {
	NEWLINE = "newline",
	PARAGRAPH = "paragraph",
	LINK = "link",
	IMAGE = "image",
	TEXT = "text",
	STRONG = "strong",
	EM = "em",
	LIST = "list",
	INS = "ins",
	DEL = "del",
	LIST_ITEM = "list-item",
	CODE = "code",
	BLOCK_QUOTE = "blockQuote",
	HEADING = "heading",
	SUB = "sub",
	SUP = "sup",
}

export enum MLNODE_TYPES {
	SECTION = "section",
	PARAGRAPH = "paragraph",
	DEL = "del",
	INS = "ins",
	STRONG = "strong",
	EM = "em",
	CODE = "code",
	BLOCKQUOTE = "blockquote",
	TEXT = "text",
	LIST = "list",
	LIST_ITEM = "list-item",
	LINK = "link",
	IMAGE = "image",
	FIGURE = "figure",
	UNKNOWN = "unknown",
	SUB = "sub",
	SUP = "sup",
}

export enum NODE_LIST_TYPES {
	ORDERED = "ol",
	UNORDERED = "ul",
}

/**
 * Special display modes for nodes
 */
export enum NODE_DISPLAY_TYPES {
	/**
	 * Show in popover
	 */
	POPOVER = "popover",
	NORMAL = "normal",
}

/**
 * A markdown node parsed and processed by ML
 */
export interface IMLParsedNode {
	readonly type: MLNODE_TYPES;
	/**
	 * Unique key across the tree in which the node resides
	 */
	readonly key: string;
	/**
	 * Line number associated with this node
	 */
	readonly line: number;
	/**
	 * Returns the actual array of children, NOT a copy, so you can manipulate
	 * the node's children in place.
	 */
	readonly children?: IMLParsedNode[];
	/**
	 * Occurrence index in parent line
	 */
	readonly occurrenceIndex?: number;
	/**
	 * Node text, if it is a leaf
	 */
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
	/**
	 * How should this node be displayed?
	 */
	readonly displayType?: NODE_DISPLAY_TYPES;

	/**
	 * Number in a series (e.g. annotation number)
	 */
	readonly sequence?: number;
	/**
	 * The type of link
	 */
	readonly linkType?: DynamicContentTypes;
}

export interface IPageMetaData {
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
	 * Key of term in glossary
	 */
	readonly glossary_key: string;
	/**
	 * Display source URL of glossary item
	 */
	readonly source_url: string;
	/**
	 * Display source name of glossary item
	 */
	readonly source_name: string;
	/**
	 * Display source author of glossary item
	 */
	readonly source_author: string;
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
	 * The relative path of this page
	 */
	readonly path: string;

	/**
	 * The page's metadata properties, from the front matter block
	 */
	metaData: IPageMetaData;
	/**
	 * The parsed MD
	 */
	readonly parsed: IMLParsedNode[];
	/**
	 * If not empty, ignore the data
	 */
	readonly error?: string;
}

export interface ILocaleMap {
	readonly params: { id: string };
	locale: string;
}

export type PageSortField = Omit<keyof IParsedPageData, "parsed" | "error">;

export interface IFolderContent {
	readonly pages: IParsedPageData[];
	readonly ids: ILocaleMap[];
	sortOn(field: PageSortField): IParsedPageData[];
}

/**
 * The data passed to a next component from the static props. The content is serialized to circumvent
 * next's approach to serializing
 */
export interface IContentComponentData {
	pageProps: IGenericPageProps;
}

export interface IGenericPageProps {
	content: string;
	translate: (k: string) => string;
	compLocale: Record<string, string>;
}

/**
 * The data structure passed to a content component
 */
export interface IContentComponentInitData {
	node: IMLParsedNode;
	tag?: string;
	style?: string;
}

export interface ContentComponentProps {
	componentData: IContentComponentInitData;
	className?: string;
}

/**
 * Base component props
 */
export interface ComponentProps {
	compKeys?: Record<string, string>;
	children?: React.ReactNode;
	className?: string;
}

/**
 * Site page navigation props
 */
export interface SitePage {
	id: string;
	targetPathname: string;
	menuNav: boolean;
	locale: Record<string, string>;
	children?: string[];
}

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export interface IPageProps {
	compLocale: ComponentKeyMap;
	locale: string;
	translate: (key: string) => string;
	content: string;
	className?: string;
	metaData?: string;
}

/**
 * A stack of parsed nodes
 */
export interface IContentStack<T> {
	readonly count: number;
	/**
	 * returns the topmost node, null when the stack is empty.
	 */
	readonly current: T | null;

	/**
	 * Returns a copy of the stack array
	 */
	readonly stack: Array<T>;
	/**
	 * Pushes the node only if its not null and different (by key) from the top node
	 * @param node
	 * @returns the content stack object, e.g. for chaining
	 */
	push(node: T): IContentStack<T>;

	/**
	 * Set the tip of the stack to the provided index, if legal (bad input is ignored)
	 * @param index
	 */
	setIndex(index: number): IContentStack<T>;
	/**
	 * returns the topmost node, after removing it from the stack
	 * Null when the stack is empty.
	 */
	pop(): T | null;
	clear(): IContentStack<T>;
}
