import { NextRouter } from "next/router";

export interface IQueryContext {
	router: NextRouter | null;
	// state: boolean | null;
	// onExit(): Promise<boolean>;
	// getForcePopoverId(id: string): boolean | null;
}
