import { NextRouter } from "next/router";
import { Context, createContext } from "react";
import { IQueryContext } from "../interfaces/query-context";

export class QueryContext implements IQueryContext {
	readonly router: NextRouter;

	constructor(props: IQueryContext) {
		debugger;
		this.router = props?.router;
	}

	public getForcePopoverId(id: string) {
		console.log("this", this);
		// if (!this.router && !this.router?.asPath) {
		// 	return null;
		// }
		// if (this.router.asPath.split("show=")[1] === id) {
		// 	this.state = true;
		// 	return true;
		// }
		return null;
	}

	public onExit() {
		return this.router.push(this.router.asPath.split("?")[0]);
	}
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;
