import { NextRouter } from "next/router";
import { IMLParsedNode } from "../interfaces/models";
import { IQueryManager, RefNode } from "../interfaces/query-manager";

export enum QUERY_PARAMS {
	DETAIL_TYPE = "detailtype",
	DETAIL_TARGET = "detailtarget",
	DETAIL_LINE = "detailline",
	DETAIL_OCCURRENCE = "detailoccurrence",
}

export class QueryManager implements IQueryManager {
	readonly _router: NextRouter;
	private key: string;
	private line: number;
	private occIndex: number;
	public nodes: RefNode[];

	constructor(props: IQueryManager) {
		this._router = props?.router;
		this.line = -1;
		this.occIndex = -1;
		this.key = null;
		this.nodes = [];
	}

	public get router() {
		return this._router;
	}

	get asPath() {
		return this.router.asPath;
	}

	get asSplitPath() {
		if (!this.asPath || !this.asPath.includes("?")) return;
		return this.asPath.split("?");
	}

	private get pathParams() {
		if (!this.asSplitPath) return;
		return new URLSearchParams(this.asSplitPath[1].toLowerCase());
	}

	private get getBaseUrl() {
		if (typeof window !== "undefined") return window.location.host;
		return "";
	}

	private getQueryParams = () => {
		if (!this.asSplitPath) return;
		if (this.asSplitPath.length <= 1) return;
		return Object.fromEntries(
			Object.values(QUERY_PARAMS).map((param) => [
				param,
				this.pathParams.get(param),
			])
		);
	};

	private setRef = (node: IMLParsedNode) => {
		this.key = node.key;
		this.line = node.line;
		this.occIndex = node.occurrenceIndex;
		return true;
	};

	public get getLine(): number {
		return this.line;
	}

	matchParams = (node: IMLParsedNode, params: Record<string, string>) => {
		const { detailtype, detailtarget } = params;
		if (!detailtype || !detailtarget) return false;
		const baseMatch = `${detailtype}/${detailtarget}` === node.target;
		if (!baseMatch) {
			return false;
		}

		const { detailline, detailoccurrence } = params;
		const exactLine = Number(detailline) === node.line;
		const exactOcc = Number(detailoccurrence) === node.occurrenceIndex;

		// if only base match then match first appearance
		if (!detailline && !detailoccurrence) return this.setRef(node);

		// if exact match then match exact appearance
		if (detailline && detailoccurrence && exactLine && exactOcc)
			return this.setRef(node);

		// if line param supplied match first in line
		if (!detailoccurrence && detailline && exactLine) {
			return this.setRef(node);
		}

		return false;
	};

	public registerNode = (node: IMLParsedNode): boolean => {
		if (!this.router.isReady) return false;

		if (this.key || this.line > -1 || this.occIndex > -1)
			return this.key === node.key && this.line === node.line;

		const params = this.getQueryParams();
		if (!params) return false;

		if (this.matchParams(node, params)) {
			return this.setRef(node);
		}

		return false;
	};

	public getQueryUrl = (node: IMLParsedNode): string => {
		const { target, line, occurrenceIndex } = node;
		const [type, id] = target.split("/");
		const { DETAIL_TYPE, DETAIL_TARGET, DETAIL_LINE, DETAIL_OCCURRENCE } =
			QUERY_PARAMS;
		const paramData = [
			[DETAIL_TYPE, type],
			[DETAIL_TARGET, id],
			[DETAIL_LINE, line],
			[DETAIL_OCCURRENCE, occurrenceIndex],
		];
		const params = paramData.map((entry) => entry.join("=")).join("&");
		return `${this.getBaseUrl}${this.asPath}?${params}`;
	};

	public onExit = () => this.router.push(this.router.asPath.split("?")[0]);
}
