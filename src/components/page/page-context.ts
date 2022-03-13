import { Context, createContext } from "react";
import { IDynamicContentServer } from "../../interfaces/dynamic-content";
//import { PageContentAttributes } from "../../interfaces/models";
import { IPageContext } from "../../interfaces/page-context";

export class PageContext implements IPageContext {
	constructor(public readonly dynamicContentServer: IDynamicContentServer) {
		//this.pageAttributes = Array.isArray(attributes)
		//	? attributes.slice()
		//	: [attributes];
	}
	//private readonly pageAttributes: PageContentAttributes[];

	//public unsetAttribute(attr: PageContentAttributes): PageContentAttributes[] {
	//	const ind = this.pageAttributes.indexOf(attr);
	//	if (ind >= 0) {
	//		this.pageAttributes.splice(ind, 1);
	//	}
	//	return this.pageAttributes.slice();
	//}
	//public setAttribute(attr: PageContentAttributes): PageContentAttributes[] {
	//	if (!this.pageAttributes.includes(attr)) {
	//		this.pageAttributes.push(attr);
	//	}
	//	return this.pageAttributes.slice();
	//}
	//public hasAttribute(attr: PageContentAttributes): boolean {
	//	return this.pageAttributes.includes(attr);
	//}
}

const ctx = createContext<IPageContext>(
	new PageContext(null)
);

export const ReactPageContext: Context<IPageContext> = ctx;
