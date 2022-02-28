export interface ILayoutContext {
	readonly locale: string;
	readonly compLocale: Record<string, string>;
	translate: (s: string) => string;
}
