import { Context, createContext } from "react";
import { ILayoutContext } from "../interfaces/layout-context";

export class LayoutContext {
	// constructor(
	// 	attributes: PageContentAttributes | Array<PageContentAttributes>
	// ) {
	// 	this.pageAttrinutes = Array.isArray(attributes)
	// 		? attributes.slice()
	// 		: [attributes];
	// }
	// public readonly pageAttrinutes: PageContentAttributes[];
	// hasAttribute(attr: PageContentAttributes): boolean {
	// 	return this.pageAttrinutes.includes(attr);
	// }
	ctxTranslate(): string {
		return "dada";
	}
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
