import { Context, createContext } from "react";
import { IQueryContext } from "../interfaces/query-context";
import { IQueryManager } from "../interfaces/query-manager";

export class QueryContext implements IQueryContext {
	constructor(public readonly query: IQueryManager) {}
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;

// import { NextRouter } from "next/router";
// import { Context, createContext, RefObject } from "react";
// import { IMLParsedNode } from "../interfaces/models";
// import { IQueryContext, RefNode } from "../interfaces/query-context";

// export enum QUERY_PARAMS {
// 	DETAIL_TYPE = "detailtype",
// 	DETAIL_TARGET = "detailtarget",
// 	DETAIL_LINE = "detailline",
// 	DETAIL_OCCURRENCE = "detailoccurrence",
// }

// export class QueryContext implements IQueryContext {
// 	readonly _router: NextRouter;
// 	private line: number;
// 	private occIndex: number;
// 	private key: string;
// 	public nodes: RefNode[];

// 	constructor(props: IQueryContext) {
// 		this._router = props?._router;
// 		this.line = -1;
// 		this.occIndex = -1;
// 		this.key = null;
// 		this.nodes = [];
// 	}

// 	private get router() {
// 		return this._router;
// 	}

// 	get asPath() {
// 		return this.router.asPath;
// 	}

// 	get asSplitPath() {
// 		if (!this.asPath || !this.asPath.includes("?")) {
// 			return;
// 		}
// 		return this.asPath.split("?");
// 	}

// 	get pathParams() {
// 		if (!this.asSplitPath) {
// 			return;
// 		}
// 		return new URLSearchParams(this.asSplitPath[1].toLowerCase());
// 	}

// 	private setKey = (key: string) => {
// 		this.key = key;
// 	};

// 	private getKey = () => {
// 		return this.key;
// 	};

// 	// public get getLineIndex() {
// 	// 	return this.line;
// 	// }

// 	// private resetIndices = () => {
// 	// 	this.line = -1;
// 	// 	this.key = null;
// 	// };

// 	private getQueryParams = () => {
// 		if (!this.asSplitPath) {
// 			return;
// 		}

// 		if (this.asSplitPath.length <= 1) {
// 			return;
// 		}

// 		return Object.fromEntries(
// 			Object.values(QUERY_PARAMS).map((param) => {
// 				return [param, this.pathParams.get(param)];
// 			})
// 		);
// 	};

// 	public registerNode = (node: IMLParsedNode): boolean => {
// 		const params = this.getQueryParams();

// 		if (this.key || this.line > -1 || this.occIndex > -1) {
// 			// console.log("qc skip", this.key, this.line, this.occIndex);
// 			return false;
// 		}

// 		if (!params) {
// 			return false;
// 		}

// 		const { detailtype, detailtarget } = params;
// 		if (!detailtype || !detailtarget) {
// 			return false;
// 		}

// 		if (this.key === node.key) {
// 			return false;
// 		}

// 		console.log(
// 			"registerNode",
// 			this.getKey(),
// 			this.line,
// 			"node:",
// 			node.key,
// 			node.target,
// 			this.router
// 		);

// 		if (`${detailtype}/${detailtarget}` === node.target) {
// 			this.setKey(node.key);
// 			this.line = node.line;

// 			this.occIndex = node.occurrenceIndex;
// 			return true;
// 		}

// 		return false;
// 	};

// 	public onExit = () => {
// 		// this.resetIndices();
// 		return this.router.push(this.router.asPath.split("?")[0]);
// 	};

// 	public getQueryUrl = (node: IMLParsedNode): string => {
// 		let href = "";
// 		if (typeof window !== "undefined") {
// 			href = window.location.host;
// 		}
// 		const { target, line, occurrenceIndex } = node;
// 		const [type, id] = target.split("/");
// 		const params = [
// 			`detailType=${type}`,
// 			`detailTarget=${id}`,
// 			`detailLine=${line}`,
// 			`detailOccurrence=${occurrenceIndex}`,
// 			`skipTo=${line}`,
// 		];
// 		return `${href}${this.asPath}?${params.join("&")}`;
// 	};

// 	public addRef = (
// 		ref: RefObject<Element>,
// 		key: string,
// 		line: number
// 	): void => {
// 		if (this.getRefByKey(key).length) {
// 			return;
// 		}
// 		this.nodes.push({ ref, key, line });
// 	};

// 	public getRefByKey = (key: string): RefNode[] => {
// 		return this.nodes.filter((ref) => ref.key === key);
// 	};
// }

// const ctx = createContext<IQueryContext>(new QueryContext(null));

// export const ReactQueryContext: Context<IQueryContext> = ctx;
