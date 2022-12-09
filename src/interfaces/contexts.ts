import { NextRouter } from "next/router";

export interface IContext {
	children: JSX.Element | JSX.Element[];
	documentPath?: string;
}

export interface IContextWithRouter extends IContext {
	router: NextRouter;
}
