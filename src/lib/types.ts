import { IMLParsedNode, IParsedPageData } from 'types/models';

/** Types of dynamic content */
export enum DynamicContentTypes {
	Glossary = 'glossary',
	Annotation = 'annotation',
	/** Must remain an empty string, so it can be used in truthy/falsy tests */
	None = '',
}

/** describes a dynamic content item: its type and id */
export interface IDynamicContentRecord {
	/** Annotation, gloassary etc */
	readonly type: DynamicContentTypes;
	/** The id of the item to fetch */
	readonly id: string;
	/** Is the url relative, or does it start with `/` */
	readonly isRelative: boolean;
}

export interface IDynamicContentRequest {
	type: DynamicContentTypes;
	locale: string;
	ids: Array<string>;
	document?: string;
}

export interface IDynamicContentServer {
	/**
	 * Retrieve parsed page data for each id, given local and content type
	 * @param type
	 * @param locale
	 * @param ids
	 */
	getItems(options: IDynamicContentRequest): Promise<IParsedPageData[]>;
}

/**
 * Describes a content-related context, available to all rendered components under a ML page.
 * The implementation currently supports only links, which are used to retrieve content
 * from the server and display it in a content browser, but when the dynamic content viewer
 * supports arbitrary content, we can modify this context.
 */
export interface IDynamicContentContext {
	/** The current content node (e.g. the current glossary item) */
	readonly currentNode: IMLParsedNode;
	/** The current page, currently loaded based on the current node */
	readonly currentPage: IParsedPageData;
	readonly pageIndex: number;
	/**
	 * Add a content node to the top of this dynamic context stack
	 * @param node
	 */
	addContentNode(node: IMLParsedNode): void;
	addPage(page: IParsedPageData): void;
	setPageIndex(index: number): void;
}

export type BibliographyItem = {
	name: string;
	url?: string;
};
