import { Context, createContext } from "react";
import {
	ILocaleContext,
	ILocaleContextProps,
	localeLabelPrefix,
	LocaleId,
	LocaleInfo,
} from "../interfaces/locale-context";
import { SITE_PAGES } from "../config/pages-data";
import { SITE_META } from "../locales/keymap/common";
import { _translate } from "../locales/translate";
import { LANGS } from "../locales";

export class LocaleContext implements ILocaleContext {
	private _locale: string;
	private _locales: string[];
	private _route: string;
	private _translate: (s: string, lang?: LocaleId) => string;
	constructor(props: ILocaleContextProps) {
		if (!props) {
			return;
		}
		const { router } = props;
		const { locale, locales, route } = router;
		this._locale = locale;
		this._locales = locales;
		this._route = route;
		this._translate = _translate(this.locale, LANGS);
	}

	private getPathData = (id: string) =>
		Object.values(SITE_PAGES).filter((p) => p.targetPathname === id)[0];

	public get locale() {
		return this._locale;
	}

	public get locales() {
		return this._locales;
	}

	public get compLocale() {
		const pathData = this.getPathData(this._route);
		if (!pathData.locale) {
			return;
		}
		return pathData?.locale;
	}

	public get pageName() {
		return this.translate(this.compLocale.pageName);
	}

	public get localeInfo() {
		return LocaleInfo[this.locale];
	}

	public get siteTitle() {
		return this.translate(SITE_META.siteTitle);
	}

	public get siteSubtitle() {
		return this.translate(SITE_META.siteSubtitle);
	}

	public translate = (key: string, lang?: LocaleId) =>
		this._translate(key, lang);

	public getLocaleSymbol = (id: string) =>
		this.translate(`${localeLabelPrefix}_${id}`.toUpperCase());
}

const ctx = createContext<ILocaleContext>(new LocaleContext(null));

export const ReactLocaleContext: Context<ILocaleContext> = ctx;
