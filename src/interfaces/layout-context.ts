import { IconProps } from "@radix-ui/react-icons/dist/types";

export interface SitePageRef {
	id: string;
	menuNav: boolean;
}

export type TextDirection = "rtl" | "ltr";
export type Direction = "right" | "left";
export interface ILocaleInfo {
	readonly direction: TextDirection;
	readonly right: Direction;
	readonly left: Direction;
	readonly arrowLeft: (props: Partial<IconProps>) => JSX.Element;
	readonly arrowRight: (props: Partial<IconProps>) => JSX.Element;
}

export interface ILayoutContext {
	readonly locale: string;
	readonly localeInfo: ILocaleInfo;
	readonly compLocale: Record<string, string>;
	pageId: string;
	getPageRefs: () => SitePageRef[];
	getPagePath: (id: string) => string;
	getPageName: (id: string) => string;
	isPageVisible: (id: string) => boolean;
	isCurrentPage: (id: string) => boolean;
	translate: (s: string, lang?: string) => string;
	getSiteTitle: () => string;
	getSiteSubtitle: () => string;
}
