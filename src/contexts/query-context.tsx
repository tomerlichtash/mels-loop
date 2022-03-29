import { NextRouter } from "next/router";
import { Context, createContext } from "react";
import { IMLParsedNode } from "../interfaces/models";
import { IQueryContext } from "../interfaces/query-context";

export enum QUERY_PARAMS {
	DETAIL_TYPE = "detailtype",
	DETAIL_TARGET = "detailtarget",
	DETAIL_LINE = "detailline",
	DETAIL_OCCURANCE = "detailoccurance",
}

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

	private get queryParams() {
		const { asPath } = this.getRouter;
		const getParam = (p: string) => {
			const base = asPath.toLowerCase().split(`${p.toLowerCase()}=`)[1];
			if (!base) {
				return false;
			}
			return base.split("&")[0];
		};
		return {
			queryType: getParam(QUERY_PARAMS.DETAIL_TYPE) || "",
			queryTarget: getParam(QUERY_PARAMS.DETAIL_TARGET) || "",
			queryLine: Number(getParam(QUERY_PARAMS.DETAIL_LINE)) || "",
			queryOccurance: Number(getParam(QUERY_PARAMS.DETAIL_OCCURANCE)) || "",
		};
	}

	public registerNode = (node: IMLParsedNode): boolean => {
		const { asPath } = this.getRouter;

		if (this.getKeyIndex === node.key && this.getLineIndex === node.line) {
			return true;
		}

		if (!asPath || (this.getLineIndex > -1 && this.getKeyIndex.length)) {
			return false;
		}

		const { queryType, queryTarget, queryLine, queryOccurance } =
			this.queryParams;
		const exactMatch =
			queryType &&
			queryTarget &&
			queryLine &&
			queryOccurance &&
			`${queryType}/${queryTarget}` === node.target &&
			queryOccurance === node.occuranceIndex &&
			queryLine === node.line;

		if (exactMatch) {
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
