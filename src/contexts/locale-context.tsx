import { Context, createContext, RefObject } from "react";
import { ILocaleContext } from "../interfaces/layout-context";
import { ILocaleInfo } from "../locales/locale-info";

export class LocaleContext implements ILocaleContext {
	public readonly locale: string;
	public readonly compLocale: Record<string, string>;
	public readonly pageParent: string;
	public readonly pageId: string;
	public readonly localeInfo: ILocaleInfo;
	public translate(s: string): string {
		return `%${s}%`;
	}

	public getSiteTitle: () => string;
	public getSiteSubtitle: () => string;
	public popoverRef: RefObject<HTMLDivElement>;
}

const ctx = createContext<ILocaleContext>(new LocaleContext());

export const ReactLocaleContext: Context<ILocaleContext> = ctx;
