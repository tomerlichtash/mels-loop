import { NextRouter } from "next/router";
export type LocaleId = "en" | "he";

export interface ILocaleContext {
	readonly locale: string;
	readonly locales: string[];
	readonly localeInfo: ILocaleInfo;
	readonly compLocale: Record<string, string>;
	translate: (s: string, lang?: string) => string;
	getLocaleSymbol: (id: string) => string;
	siteTitle: string;
	siteSubtitle: string;
	pageName: string;
}

export interface ILocaleContextProps {
	readonly router: NextRouter;
}

export type TextDirection = "rtl" | "ltr";

export type Direction = "right" | "left";

export interface ILocaleInfo {
	readonly direction: TextDirection;
	readonly popoverDirection: Direction;
}

export const LocaleInfo: Record<LocaleId, ILocaleInfo> = {
	en: { direction: "rtl", popoverDirection: "left" },
	he: { direction: "ltr", popoverDirection: "right" },
};

export const localeLabelPrefix = "LOCALE_LABEL";
