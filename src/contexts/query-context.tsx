import { NextRouter } from "next/router";
import { Context, createContext, ReactFragment } from "react";
import { IMLParsedNode } from "../interfaces/models";
import { IQueryContext, RefNode } from "../interfaces/query-context";

export enum QUERY_PARAMS {
	DETAIL_TYPE = "detailtype",
	DETAIL_TARGET = "detailtarget",
	DETAIL_LINE = "detailline",
	DETAIL_OCCURRENCE = "detailoccurrence",
	SKIP_TO = "skipto",
}

export class QueryContext implements IQueryContext {
	readonly router: NextRouter;
	private line: number;
	private key: string;
	public nodes: RefNode[];

	constructor(props: IQueryContext) {
		this.router = props?.router;
		this.line = -1;
		this.key = null;
		this.nodes = [];
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

	private resetIndices = () => {
		this.line = -1;
		this.key = null;
	};

	private getUrlParams() {
		const { asPath } = this.getRouter;
		return new URLSearchParams(asPath.split("?")[1]?.toLowerCase());
	}

	private get queryParams() {
		const url = this.getUrlParams();
		return {
			queryType: url.get(QUERY_PARAMS.DETAIL_TYPE) || "",
			queryTarget: url.get(QUERY_PARAMS.DETAIL_TARGET) || "",
			queryLine: Number(url.get(QUERY_PARAMS.DETAIL_LINE)) || "",
			queryOccurrence: Number(url.get(QUERY_PARAMS.DETAIL_OCCURRENCE)) || "",
		};
	}

	private getParam(param: QUERY_PARAMS): string {
		const url = this.getUrlParams();
		return url.get(param) || "";
	}

	public getSkipTo = () => this.getParam(QUERY_PARAMS.SKIP_TO);

	public registerNode = (node: IMLParsedNode): boolean => {
		const { asPath } = this.getRouter;

		if (this.getKeyIndex === node.key && this.getLineIndex === node.line) {
			return true;
		}

		if (!asPath || (this.getLineIndex > -1 && this.getKeyIndex.length)) {
			return false;
		}

		const { queryType, queryTarget, queryLine, queryOccurrence } =
			this.queryParams;
		const exactMatch =
			queryType &&
			queryTarget &&
			queryLine &&
			queryOccurrence &&
			`${queryType}/${queryTarget}` === node.target &&
			queryOccurrence === node.occurrenceIndex &&
			queryLine === node.line;

		if (exactMatch) {
			return true;
		}

		return false;
	};

	public onExit = () => {
		this.resetIndices();
		return this.router.push(this.router.asPath.split("?")[0]);
	};

	public getQueryUrl = (node: IMLParsedNode): string => {
		let href = "";
		if (typeof window !== "undefined") {
			href = window.location.host;
		}
		const { target, line, occurrenceIndex } = node;
		const [type, id] = target.split("/");
		const params = [
			`detailType=${type}`,
			`detailTarget=${id}`,
			`detailLine=${line}`,
			`detailOccurrence=${occurrenceIndex}`,
			`skipTo=${line}`,
		];
		return `${href}${this.getRouter.asPath}?${params.join("&")}`;
	};

	public addRef = (ref: ReactFragment, key: string, line: number): void => {
		this.nodes.push({ ref, key, line });
	};

	public getRefByLine = (line: string): RefNode[] => {
		return this.nodes.filter((ref) => `line${ref.line}` === line);
	};
}

const ctx = createContext<IQueryContext>(new QueryContext(null));

export const ReactQueryContext: Context<IQueryContext> = ctx;
