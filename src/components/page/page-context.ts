import { Context, createContext } from "react";
import { IDynamicContentServer } from "../../interfaces/dynamic-content";
import { IPageContext } from "../../interfaces/page-context";
import {} from "../peephole/peephole";

export class PageContext implements IPageContext {
	constructor(public readonly dynamicContentServer: IDynamicContentServer) {}
}

const ctx = createContext<IPageContext>(new PageContext(null));

export const ReactPageContext: Context<IPageContext> = ctx;
