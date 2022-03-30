import { NextRouter } from "next/router";
import { IMLParsedNode } from "./models";

export interface IQueryContext {
	router: NextRouter | null;
	onExit?: () => void;
	registerNode?: (node: IMLParsedNode) => boolean;
	getQueryUrl?: (node: IMLParsedNode) => string;
}
