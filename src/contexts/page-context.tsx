import React, { Context, createContext } from "react";
import { IDynamicContentServer } from "../interfaces/dynamic-content";
import { IPageContext } from "../interfaces/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";

export class PageContext implements IPageContext {
	constructor(public readonly dynamicContentServer: IDynamicContentServer, public documentPath: string) {}
}

const ctx = createContext<IPageContext>(new PageContext(null, ""));

export const ReactPageContext: Context<IPageContext> = ctx;

export const PageContextProvider = ({ documentPath, children }) => (
	<ReactPageContext.Provider
		value={new PageContext(new DynamicContentServer(), documentPath as string)}
	>
		{children}
	</ReactPageContext.Provider>
);
