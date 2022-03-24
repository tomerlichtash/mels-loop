import { Context, createContext, Dispatch, SetStateAction } from "react";
import { IPosition } from "../components/peephole/peephole";
import { ILayoutContext, SitePageRef } from "../interfaces/layout-context";

export class LayoutContext implements ILayoutContext {
	public readonly locale: string;
	public readonly compLocale: Record<string, string>;
	public readonly pageParent: string;
	public readonly pageId: string;
	public getPageRefs: () => SitePageRef[];
	public getPagePath(id: string): string {
		return id;
	}
	public getPageName(id: string): string {
		return id;
	}
	public isPageVisible(id: string): boolean {
		return !!id;
	}
	public translate(s: string): string {
		return `%${s}%`;
	}
	public isCurrentPage(): boolean {
		return false;
	}
	public getSiteTitle: () => string;
	public getSiteSubtitle: () => string;
	public peepholePosition: IPosition;
	public setPeepholePosition(x: number, y: number): IPosition {
		return { x, y };
	}
	public showPeephole: boolean;
	public togglePeephole(): boolean {
		return false;
	}
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
