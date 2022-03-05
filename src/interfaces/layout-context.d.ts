import { SitePage } from "./models";

export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	pages: SitePage[];
	pageId: string;
	getPageName: (id: string) => string;
	isCurrentPage: (pageId: string) => boolean;
	translate: (s: string) => string;
}
