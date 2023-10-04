import { SITE_PAGES } from "../../config/sitePages";
import type { SitePage } from "../../interfaces/models";
import { ComponentKeyMap } from "../keymap/types";

export interface ILocalePageContext {
	pageName: string;
	sectionName: string;
}

export default class LocalePageContext implements ILocalePageContext {
	private route: string;
	constructor(route: string) {
		this.route = route;
	}

	private getPathData = (id: string): SitePage =>
		Object.values(SITE_PAGES).filter((p) => p.targetPathname === id)[0];

	private get pathLocale(): Partial<
		Record<keyof ComponentKeyMap, string>
	> | null {
		const pathData = this.getPathData(this.route);
		if (!pathData?.locale) {
			return null;
		}
		return pathData.locale;
	}

	public get pageName(): string {
		return this.pathLocale?.pageName;
	}

	public get sectionName(): string {
		return this.pathLocale?.sectionName;
	}
}
