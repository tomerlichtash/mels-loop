import React, { Context, createContext } from "react";
import { NextRouter } from "next/router";
import {
	ILocaleContext,
	ILocaleContextProps,
	localeLabelPrefix,
	LocaleId,
	LocaleInfo,
} from "../locale-context";
import { _translate } from "../translate";
import { Languages } from "..";
import LocaleMetaContext, { ILocaleMetaContext } from "./locale-meta-context";
import LocalePageContext, { ILocalePageContext } from "./locale-page-context";

export class LocaleContext implements ILocaleContext {
	private _locale: LocaleId;
	private _locales: LocaleId[];
	private _translate: (s: string, lang?: LocaleId) => string;
	private _router: NextRouter;
	public meta: ILocaleMetaContext;
	public pages: ILocalePageContext;
	constructor(props: ILocaleContextProps) {
		if (!props) {
			return;
		}
		const { router } = props;
		const { locale, locales, route } = router;
		this._router = router;
		this._locale = locale as LocaleId;
		this._locales = locales as LocaleId[];
		this.meta = new LocaleMetaContext();
		this.pages = new LocalePageContext(route);
		this._translate = _translate(locale, Languages);
	}

	private get router() {
		return this._router;
	}

	private get asPath() {
		return this.router.asPath;
	}

	public get locale() {
		return this._locale;
	}

	public get locales() {
		return this._locales;
	}

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

	public getLocaleLabel = (id: string) =>
		[localeLabelPrefix, id].join("_").toUpperCase();

	public getLocaleSymbol = (id: string) =>
		this.translate(this.getLocaleLabel(id));

	public translate = (key: string, lang?: LocaleId) =>
		this._translate(key, lang);

	public onLocaleChange = (locale: LocaleId) =>
		this.router.push(this.asPath, this.asPath, {
			locale,
			scroll: true,
		});
}

const ctx = createContext<ILocaleContext>(new LocaleContext(null));

export const LocaleProvider: Context<ILocaleContext> = ctx;

export const LocaleContextProvider = ({ children, router }) => {
	return (
		<LocaleProvider.Provider value={new LocaleContext({ router })}>
			{children}
		</LocaleProvider.Provider>
	);
};
