import { IMLParsedNode, IParsedPageData } from "./models";

/**
 * Describes a content-related context, available to all rendered components under a ML page
 */
export interface IDynamicContentContext {
//	readonly contentStack: IContentStack<IMLParsedNode>;
	readonly currentNode: IMLParsedNode;
	setCurrentNode(node: IMLParsedNode): void;
	readonly currentPage: IParsedPageData;
	setCurrentPage(page: IParsedPageData): void;
}
