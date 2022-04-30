import { NextRouter } from "next/router";
import type { ILocaleMetaContext } from "../contexts/locale-meta-context";
import type { ILocalePageContext } from "../contexts/locale-page-context";

export type LocaleId = "en" | "he";

export interface ILocaleContext {
	readonly locale: string;
	readonly locales: string[];
	readonly localeInfo: ILocaleInfo;
	readonly meta: ILocaleMetaContext;
	readonly pages: ILocalePageContext;
	translate: (s: string, lang?: string) => string;
	getLocaleSymbol: (id: string) => string;
	onLocaleChange: (id: LocaleId) => Promise<boolean>;
	textDirection: TextDirection;
	siteTitle: string;
	siteSubtitle: string;
	siteLicense: string;
	pageName: string;
	sectionName: string;
}

export interface ILocaleContextProps {
	readonly router: NextRouter;
}

export type TextDirection = "rtl" | "ltr";

export type Direction = "right" | "left";

export interface ILocaleInfo {
	readonly direction: TextDirection;
}

export const LocaleInfo: Record<LocaleId, ILocaleInfo> = {
	en: { direction: "ltr" },
	he: { direction: "rtl" },
};

export const localeLabelPrefix = "LOCALE_LABEL";
