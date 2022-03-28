import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Context, createContext } from "react";
import { IQueryContext } from "../interfaces/query-context";

export class QueryContext implements IQueryContext {
	public query: ParsedUrlQuery | null;
	public router: NextRouter;
	public state: boolean;
	constructor(props) {
		if (props && props.query) {
			debugger;
			this.state = true;
		}
	}

	public getForcePopoverId(id: string) {
		debugger;
		return this.state;
	}

	public onExit() {
		this.state = true;
	}
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;
