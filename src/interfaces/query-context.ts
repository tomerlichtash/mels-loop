import { RefObject } from "react";
import { IQueryManager } from "./query-manager";

export interface RefNode {
	ref: RefObject<Element>;
	key: string;
	line: number;
}

export interface IQueryContext {
	query: IQueryManager;
}
