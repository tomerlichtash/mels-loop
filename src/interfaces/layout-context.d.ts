import { SitePage } from "./models";

export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	pageId: string;
	pageParent: string;
	pages: SitePage[];
	isCurrentPage: (
		source: string,
		id: string,
		parent,
		pages: SitePage[]
	) => boolean;
	translate: (s: string) => string;
}
