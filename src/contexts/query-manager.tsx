import { NextRouter } from "next/router";
import { RefObject } from "react";
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
	private line: number;
	private occIndex: number;
	private key: string;
	public nodes: RefNode[];

	constructor(props: IQueryManager) {
		this._router = props?._router;
		this.line = -1;
		this.occIndex = -1;
		this.key = null;
		this.nodes = [];
	}

	private get router() {
		return this._router;
	}

	get asPath() {
		return this.router.asPath;
	}

	get asSplitPath() {
		if (!this.asPath || !this.asPath.includes("?")) {
			return;
		}
		return this.asPath.split("?");
	}

	get pathParams() {
		if (!this.asSplitPath) {
			return;
		}
		return new URLSearchParams(this.asSplitPath[1].toLowerCase());
	}

	private setKey = (key: string) => {
		this.key = key;
	};

	private getKey = () => {
		return this.key;
	};

	private getQueryParams = () => {
		if (!this.asSplitPath) {
			return;
		}

		if (this.asSplitPath.length <= 1) {
			return;
		}

		return Object.fromEntries(
			Object.values(QUERY_PARAMS).map((param) => {
				return [param, this.pathParams.get(param)];
			})
		);
	};

	public registerNode = (node: IMLParsedNode): boolean => {
		if (!this.router.isReady) {
			return;
		}

		if (this.key || this.line > -1 || this.occIndex > -1) {
			// console.log("qc skip", this.key, this.line, this.occIndex);
			return false;
		}

		const params = this.getQueryParams();
		if (!params) {
			return false;
		}

		const { detailtype, detailtarget } = params;
		if (!detailtype || !detailtarget) {
			return false;
		}

		// if (this.key === node.key) {
		// 	return false;
		// }

		if (`${detailtype}/${detailtarget}` === node.target) {
			this.setKey(node.key);
			this.line = node.line;
			this.occIndex = node.occurrenceIndex;
			// console.log("register node", node.target, node.key, node.line);
			return true;
		}

		return false;
	};

	public addRef = (
		ref: RefObject<Element>,
		key: string,
		line: number
	): void => {
		if (!this.router.isReady) {
			return;
		}
		if (this.getRefByKey(key).length) {
			return;
		}
		// console.log("addref", key);
		this.nodes.push({ ref, key, line });
	};

	public getRefByKey = (key: string): RefNode[] => {
		return this.nodes.filter((ref) => ref.key === key);
	};

	public onExit = () => {
		// this.resetIndices();
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
			`${QUERY_PARAMS.DETAIL_TYPE}=${type}`,
			`${QUERY_PARAMS.DETAIL_TARGET}=${id}`,
			`${QUERY_PARAMS.DETAIL_LINE}=${line}`,
			`${QUERY_PARAMS.DETAIL_OCCURRENCE}=${occurrenceIndex}`,
		];
		return `${href}${this.asPath}?${params.join("&")}`;
	};
}
