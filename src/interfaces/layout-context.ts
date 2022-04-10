import { ILocaleInfo } from "../locales/locale-info";

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export interface ILayoutContext {
	readonly locale: string;
	readonly localeInfo: ILocaleInfo;
	readonly compLocale: Record<string, string>;
	translate: (s: string, lang?: string) => string;
	getSiteTitle: () => string;
	getSiteSubtitle: () => string;
}
