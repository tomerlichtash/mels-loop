import { Context, createContext } from "react";
import { PageContentAttributes } from "../../interfaces/models";
import { IPageContext } from "../../interfaces/page-context";

export class PageContext implements IPageContext {
	constructor(attributes: PageContentAttributes | Array<PageContentAttributes>) {
		this.pageAttrinutes = Array.isArray(attributes) ?
			attributes.slice() : [attributes];
	}
	public readonly pageAttrinutes: PageContentAttributes[];

	hasAttribute(attr: PageContentAttributes): boolean {
		return this.pageAttrinutes.includes(attr);
	}
}

const ctx = 
	createContext<IPageContext>(new PageContext(PageContentAttributes.Plain));

export const ReactPageContext: Context<IPageContext> = ctx;
