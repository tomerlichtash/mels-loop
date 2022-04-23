import React, { Context, createContext } from "react";
import { IDynamicContentServer } from "../interfaces/dynamic-content";
import { IPageContext } from "../interfaces/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";

export class PageContext implements IPageContext {
	constructor(public readonly dynamicContentServer: IDynamicContentServer) {}
}

const ctx = createContext<IPageContext>(new PageContext(null));

export const ReactPageContext: Context<IPageContext> = ctx;

export const PageContextProvider = ({ children }) => (
	<ReactPageContext.Provider
		value={new PageContext(new DynamicContentServer())}
	>
		{children}
	</ReactPageContext.Provider>
);
