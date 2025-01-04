import { DynamicContentTypes } from 'types/content';
import { MLParseModes } from './parser/modes';
import { ASTNODE_TYPES, MLNODE_TYPES, NODE_DISPLAY_TYPES } from './nodes';

/** A single node in a parsed markdown AST */
export type ParsedNode = {
	readonly type: ASTNODE_TYPES;
	readonly attributes?: Map<string, string>;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	[prop: string]: any;
};

/** A markdown node parsed and processed by ML */
export interface IMLParsedNode {
	readonly type: MLNODE_TYPES;

	/** Unique key across the tree in which the node resides */
	readonly key: string;

	/** Line number associated with this node */
	readonly line: number;

	/**
	 * Returns the actual array of children, NOT a copy, so you can manipulate
	 * the node's children in place.
	 */
	readonly children?: IMLParsedNode[];

	/** Occurrence index in parent line */
	readonly occurrenceIndex?: number;

	/** Node text, if it is a leaf */
	readonly text?: string;

	/** Un/Ordered list */
	readonly ordered?: boolean;

	/** Link target */
	readonly target?: string;

	/** Heading level */
	readonly level?: number | string;

	/** How should this node be displayed? */
	readonly displayType?: NODE_DISPLAY_TYPES;

	/** Number in a series (e.g. annotation number) */
	readonly sequence?: number;

	/** The type of link */
	readonly linkType?: DynamicContentTypes;

	readonly attributes?: { [name: string]: string };

	/** If present, other nodes may refer to this node through the ID */
	readonly elementId?: string;
}

export interface ICaptionConfiguration {
	auto: boolean;
	base: number;
	template: string;
}

export interface IPageMetaData {
	/** Date metadata, if present in the MD */
	readonly date: Date;

	/** Title metadata, if present in the MD */
	readonly title: string;

	/** Abstract metadata, if present in the MD */
	readonly abstract: string;

	/** Moto metadata, if present in the MD  */
	readonly moto: string;

	/** Credits metadata, if present in the MD */
	readonly credits: string;

	/** Author metadata, if present in the MD */
	readonly author: string;

	/** Key of term in glossary */
	readonly glossary_key: string;

	/** Display source URL of glossary item */
	readonly source_url: string;

	/**  Display source name of glossary item */
	readonly source_name: string;

	/** Display source author of glossary item */
	readonly source_author: string;

	/**
	 * Guaranteed not null. Each metadata object is created with at least the default
	 * `figure` configuration, which may be overridden by the document metadata
	 */
	readonly captions: Readonly<Partial<Record<MLNODE_TYPES, ICaptionConfiguration>>>;

	readonly parse_mode?: MLParseModes;
}

/** Full results of a parsed page */
export interface IParsedPageData {
	/** Usually the file name */
	readonly id: string;
	/** The relative path of this page */
	readonly path: string;
	/** The page's metadata properties, from the front matter block */
	metaData: IPageMetaData;
	/**  The parsed MD */
	readonly parsed: IMLParsedNode[];
	/** If not empty, ignore the data */
	readonly error?: string;
}

export type StringMap = { [key: string]: string };

export interface ILocaleMap {
	readonly params: StringMap;
	locale: string;
}

export type NodeAttributeMap = { readonly [rekey: string]: string };

export type PageSortField = Omit<keyof IParsedPageData, 'parsed' | 'error'>;

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
	className?: string;
}

export interface IGenericPageProps {
	content: string;
}

/** The data structure passed to a content component */
export interface IContentComponentInitData {
	node: IMLParsedNode;
	tag?: string;
	style?: string;
}

export interface ContentComponentProps {
	componentData: IContentComponentInitData;
	className?: string;
}

/** Site page navigation props */
export interface IPageProps {
	locale: string;
	documentPath: string;
	translate: (key: string) => string;
	content: string;
	className?: string;
	metaData?: string;
}
