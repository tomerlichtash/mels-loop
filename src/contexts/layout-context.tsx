import { Context, createContext, RefObject } from "react";
import { ILayoutContext } from "../interfaces/layout-context";
import { ILocaleInfo } from "../locales/locale-info";

export class LayoutContext implements ILayoutContext {
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

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
