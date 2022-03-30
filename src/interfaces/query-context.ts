import { RefObject } from "react";
import { NextRouter } from "next/router";
import { IMLParsedNode } from "./models";

export interface RefNode {
	ref: RefObject<Element>;
	key: string;
	line: number;
}

export interface IQueryContext {
	router: NextRouter | null;
	onExit?: () => void;
	registerNode?: (node: IMLParsedNode) => boolean;
	getQueryUrl?: (node: IMLParsedNode) => string;
	addRef?: (ref: RefObject<Element>, key: string, line: number) => void;
	getRefByLine?: (line: string) => RefNode[];
	getSkipTo?: () => string;
}
