import React, { Context, createContext } from "react";
import { createDBService } from "../db/client/client-db-service";
import { IClientDBService } from "../interfaces/db-service.d";
import { IDynamicContentServer } from "../interfaces/dynamic-content";
import { IPageContext } from "../interfaces/page-context";
import { DynamicContentServer } from "../lib/dynamic-content-server";

class PageContext implements IPageContext {
	constructor(
		public readonly dynamicContentServer: IDynamicContentServer,
		public readonly dbService: IClientDBService,
		public documentPath: string
	) { 
	}
}

const ctx = createContext<IPageContext>(new PageContext(null, null, ""));

export const ReactPageContext: Context<IPageContext> = ctx;

export const PageContextProvider = ({ documentPath, children }) => {
	return (
		<ReactPageContext.Provider
			value={new PageContext(
				new DynamicContentServer(),
				createDBService(),
				documentPath as string)}
		>
			{children}
		</ReactPageContext.Provider>
	);
}
