import { Context, createContext } from "react";
import { ILayoutContext, ILocaleInfo, SitePageRef } from "../interfaces/layout-context";

export class LayoutContext implements ILayoutContext {
	public readonly locale: string;
	public readonly compLocale: Record<string, string>;
	public readonly pageParent: string;
	public readonly pageId: string;
	public readonly localeInfo: ILocaleInfo;
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
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
