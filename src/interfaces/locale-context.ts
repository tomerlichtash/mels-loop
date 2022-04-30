import { NextRouter } from "next/router";
import { LocaleId, TextDirection } from "../locales/languages/types/common";
import type { ILocaleMetaContext } from "../contexts/locale-meta-context";
import type { ILocalePageContext } from "../contexts/locale-page-context";

export interface ILocaleContext {
	readonly locale: string;
	readonly locales: string[];
	readonly localeInfo: Map<LocaleId, ILocaleInfo>;
	readonly meta: ILocaleMetaContext;
	readonly pages: ILocalePageContext;
	translate: (s: string, lang?: string) => string;
	getLocaleSymbol: (id: string) => string;
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

export interface ILocaleInfo {
	readonly direction: TextDirection;
}

export const localeLabelPrefix = "LOCALE_LABEL";
