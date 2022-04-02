import { RefObject } from "react";

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	translate: (s: string, lang?: string) => string;
	getSiteTitle: () => string;
	getSiteSubtitle: () => string;
	popoverRef: RefObject<HTMLDivElement>;
}
