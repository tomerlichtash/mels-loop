import { SITE_META } from "../locales/keymap/common";

export interface ILocaleMetaContext {
	siteTitle: string;
	siteSubtitle: string;
}

export default class LocaleMetaContext {
	public get siteTitle(): string {
		return SITE_META.siteTitle;
	}

	public get siteSubtitle(): string {
		return SITE_META.siteSubtitle;
	}
}
