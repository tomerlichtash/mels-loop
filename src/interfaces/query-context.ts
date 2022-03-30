import React from "react";
import { NextRouter } from "next/router";
import { IMLParsedNode } from "./models";

export interface RefNode {
	ref: React.ComponentRef<null>;
	key: string;
	line: number;
}

export interface IQueryContext {
	router: NextRouter | null;
	onExit?: () => void;
	registerNode?: (node: IMLParsedNode) => boolean;
	getQueryUrl?: (node: IMLParsedNode) => string;
	addRef?: (ref: React.ReactFragment, key: string, line: number) => void;
	getRefByLine?: (line: string) => RefNode[];
	getSkipTo?: () => string;
}
