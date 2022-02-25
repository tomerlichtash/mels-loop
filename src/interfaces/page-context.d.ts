import { PageContentAttributes } from "./models";


interface IPageContext {
	readonly pageAttrinutes: Array<PageContentAttributes>;
	hasAttribute(attr: PageContentAttributes): boolean;
}