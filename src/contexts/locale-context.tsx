import React, { Context, createContext } from "react";
import {
	ILocaleContext,
	ILocaleContextProps,
	localeLabelPrefix,
	LocaleId,
	LocaleInfo,
} from "../interfaces/locale-context";
import { _translate } from "../locales/translate";
import { Languages } from "../locales";
import LocaleMetaContext, { ILocaleMetaContext } from "./locale-meta-context";
import LocalePageContext, { ILocalePageContext } from "./locale-page-context";

const getLocaleLabel = (id: string) =>
	[localeLabelPrefix, id].join("_").toUpperCase();

export class LocaleContext implements ILocaleContext {
	private _locale: string;
	private _locales: string[];
	private _translate: (s: string, lang?: LocaleId) => string;
	public meta: ILocaleMetaContext;
	public pages: ILocalePageContext;
	constructor(props: ILocaleContextProps) {
		if (!props) {
			return;
		}
		const { router } = props;
		const { locale, locales, route } = router;
		this._locale = locale;
		this._locales = locales;
		this.meta = new LocaleMetaContext();
		this.pages = new LocalePageContext(route);
		this._translate = _translate(locale, Languages);
	}

	public get locale() {
		return this._locale;
	}

	public get locales() {
		return this._locales;
	}

	public translate = (key: string, lang?: LocaleId) =>
		this._translate(key, lang);

	public getLocaleSymbol = (id: string) => this.translate(getLocaleLabel(id));

	public get localeInfo() {
		return LocaleInfo[this.locale];
	}

	public get textDirection() {
		return this.localeInfo.direction;
	}

	public get pageName() {
		return this.translate(this.pages.pageName);
	}

	public get sectionName() {
		return this.translate(this.pages.sectionName);
	}

	public get siteTitle() {
		return this.translate(this.meta.siteTitle);
	}

	public get siteSubtitle() {
		return this.translate(this.meta.siteSubtitle);
	}

	public get siteLicense() {
		return this.translate(this.meta.siteLicense);
	}
}

const ctx = createContext<ILocaleContext>(new LocaleContext(null));

export const ReactLocaleContext: Context<ILocaleContext> = ctx;

export const LocaleContextProvider = ({ children, router }) => {
	return (
		<ReactLocaleContext.Provider value={new LocaleContext({ router })}>
			{children}
		</ReactLocaleContext.Provider>
	);
};
