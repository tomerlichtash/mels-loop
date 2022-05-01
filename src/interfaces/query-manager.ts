import { RefObject } from "react";
import { NextRouter } from "next/router";
import { IMLParsedNode } from "./models";

export interface RefNode {
	ref: RefObject<Element>;
	key: string;
	line: number;
}

export interface IQueryManager {
	router: NextRouter | null;
	readonly asPath?: string;
	readonly asSplitPath?: string[];
	readonly getPathParams?: URLSearchParams;
	onExit?: () => void;
	registerNode?: (node: IMLParsedNode) => boolean;
	getQueryUrl?: (node: IMLParsedNode) => string;
	addLineRef?: (key: string, line: number) => RefNode;
	getRefByKey?: (key: string) => RefNode[];
	getRefByLine?: (line: number) => RefNode;
	getLine?: number;
}
