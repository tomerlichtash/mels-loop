import { Context, createContext } from "react";
import { ILayoutContext, SitePageRef } from "../interfaces/layout-context";

export class LayoutContext implements ILayoutContext{
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
		return false;
	}
	public translate(s: string): string {
		return `%${s}%`;
	}
	public isCurrentPage(): boolean {
		return false;
	}
	public getSiteTitle: () => string;
	public getSiteSubtitle: () => string;
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
