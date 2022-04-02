import { RefObject } from "react";
import { NextRouter } from "next/router";
import { IMLParsedNode } from "./models";

export interface RefNode {
	ref: RefObject<Element>;
	key: string;
	line: number;
}

export interface IQueryManager {
	_router: NextRouter | null;
	readonly asPath?: string;
	readonly asSplitPath?: string[];
	readonly getPathParams?: URLSearchParams;
	onExit?: () => void;
	registerNode?: (node: IMLParsedNode) => boolean;
	getQueryUrl?: (node: IMLParsedNode) => string;
	addRef?: (ref: RefObject<Element>, key: string, line: number) => void;
	getRefByKey?: (key: string) => RefNode[];
	// getSkipTo?: () => string;
}
