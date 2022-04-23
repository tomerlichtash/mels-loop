import { Context, createContext } from "react";
import { IQueryContext } from "../interfaces/query-context";
import { IQueryManager } from "../interfaces/query-manager";
import { QueryManager } from "./query-manager";

export class QueryContext implements IQueryContext {
	constructor(public readonly query: IQueryManager) {}
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;

export const QueryContextProvider = ({ children, router }) => (
	<ReactQueryContext.Provider
		value={new QueryContext(new QueryManager({ router }))}
	>
		{children}
	</ReactQueryContext.Provider>
);
