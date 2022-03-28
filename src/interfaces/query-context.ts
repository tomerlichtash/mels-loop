import { NextRouter, Router } from "next/router";
import { ParsedUrlQuery } from "querystring";

// export type ForcePopoverProps = { type: string; id: string } | null;

export interface IQueryContext {
	query: ParsedUrlQuery;
	router: NextRouter;
	getForcePopoverId?(id: string): true | null;
	onExit?(): void;
}
