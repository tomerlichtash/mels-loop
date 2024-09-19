import { IParsedNode, IParsedPage } from 'lib/types/models';

/** The data structure passed to a content component */
export interface IContentComponentInitData {
	node: IParsedNode;
	tag?: string;
	style?: string;
}

export interface ContentComponentProps {
	componentData: IContentComponentInitData;
	className?: string;
}

/**
 * Describes a content-related context, available to all rendered components under a ML page.
 * The implementation currently supports only links, which are used to retrieve content
 * from the server and display it in a content browser, but when the dynamic content viewer
 * supports arbitrary content, we can modify this context.
 */
export interface IDynamicContentContext {
	/** The current content node (e.g. the current glossary item) */
	readonly currentNode: IParsedNode;
	/** The current page, currently loaded based on the current node */
	readonly currentPage: IParsedPage;
	readonly pageIndex: number;
	/**
	 * Add a content node to the top of this dynamic context stack
	 * @param node
	 */
	addContentNode(node: IParsedNode): void;
	addPage(page: IParsedPage): void;
	setPageIndex(index: number): void;
}
