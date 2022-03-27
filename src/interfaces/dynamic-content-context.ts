import { IMLParsedNode, IParsedPageData } from "./models";

/**
 * Describes a content-related context, available to all rendered components under a ML page.
 * The implementation currently supports only links, which are used to retrieve content
 * from the server and display it in a content browser, but when the dynamic content viewer
 * supports arbitrary content, we can modify this context.
 */
export interface IDynamicContentContext {
	/**
	 * The current content node (e.g. the current glossary item)
	 */
	readonly currentNode: IMLParsedNode;
	/**
	 * Add a content node to the top of this dynamic context stack
	 * @param node 
	 */
	addContentNode(node: IMLParsedNode): void;
	/**
	 * The current page, currently loaded based on the current node
	 */
	readonly currentPage: IParsedPageData;
	addPage(page: IParsedPageData): void;
	readonly pageIndex: number;
	setPageIndex(index: number): void;
}
