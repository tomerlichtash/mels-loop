import { SitePage } from "./models";

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	pageId: string;
	pages: SitePageRef[];
	getPath: (id: string) => string;
	getPageName: (id: string) => string;
	isCurrentPage: (pageId: string) => boolean;
	translate: (s: string) => string;
}
