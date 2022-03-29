import { NextRouter } from "next/router";
import { Context, createContext } from "react";
import { IMLParsedNode } from "../interfaces/models";
import { IQueryContext } from "../interfaces/query-context";

export class QueryContext implements IQueryContext {
	readonly router: NextRouter;
	private line: number;
	private key: string;

	constructor(props: IQueryContext) {
		this.router = props?.router;
		this.line = -1;
		this.key = null;
	}

	private get getRouter() {
		return this.router;
	}

	private get getKeyIndex() {
		return this.key;
	}

	public get getLineIndex() {
		return this.line;
	}

	private setKeyIndex = (key: string): void => {
		this.key = key;
	};

	private setLineIndex = (line: number): void => {
		this.line = line;
	};

	private resetIndices = () => {
		this.line = -1;
		this.key = null;
	};

	public registerNode = (node: IMLParsedNode): boolean => {
		const { asPath } = this.getRouter;

		if (this.getKeyIndex === node.key && this.getLineIndex === node.line) {
			return true;
		}

		if (!asPath || (this.getLineIndex > -1 && this.getKeyIndex.length)) {
			return false;
		}

		if (asPath.split("show=")[1] === node.target) {
			this.setKeyIndex(node.key);
			this.setLineIndex(node.line);
			// this.getRouter.push(`${asPath}#line${node.line}`);
			// window.next.router.scrollToHash(`line${node.line}`);
			return true;
		}

		return false;
	};

	public getForcePopoverKey = (node: IMLParsedNode) => {
		return this.getKeyIndex === node.key;
	};

	public onExit = () => {
		this.resetIndices();
		return this.router.push(this.router.asPath.split("?")[0]);
	};
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;
