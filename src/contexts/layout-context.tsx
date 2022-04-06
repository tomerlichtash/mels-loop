import { Context, createContext, RefObject } from "react";
import { ILayoutContext, ILocaleInfo } from "../interfaces/layout-context";

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
	getPopoverBackLabel: () => string;
}

const ctx = createContext<ILayoutContext>(new LayoutContext());

export const ReactLayoutContext: Context<ILayoutContext> = ctx;
