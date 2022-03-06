import { SitePage } from "./models";

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	pageId: string;
	getPageRefs: () => SitePageRef[];
	getPagePath: (id: string) => string;
	getPageName: (id: string) => string;
	isPageVisible: (id: string) => boolean;
	isCurrentPage: (id: string) => boolean;
	translate: (s: string) => string;
	getSiteTitle: () => string;
	getSiteSubtitle: () => string;
}
