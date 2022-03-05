export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	pageId: string;
	translate: (s: string) => string;
}
