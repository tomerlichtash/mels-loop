import React, { Context, createContext } from 'react';
import { translate as translateFn } from './translate';
import { getDictionary, getMeta } from './helpers';
import type { ILocaleContext, LocaleContextProps, LocaleMeta } from './types';
import type { LocaleId } from 'types/locale';

export class LocaleContextClass implements ILocaleContext {
	readonly current: LocaleId;
	readonly availableLocales: LocaleId[];
	readonly meta: Record<LocaleId, LocaleMeta>;
	readonly translateFn: (s: string, lang?: LocaleId) => string;

	constructor(props: LocaleContextProps) {
		if (!props) {
			return;
		}

		const { router, langs } = props;
		const { locale, locales } = router;

		this.current = locale as LocaleId;
		this.availableLocales = locales as LocaleId[];
		this.meta = getMeta(langs);
		this.translateFn = translateFn(locale, getDictionary(langs));
	}

	get locale() {
		return this.current;
	}

	get locales() {
		return this.availableLocales;
	}

	get textDirection() {
		return this.meta[this.locale].direction;
	}

	public getLocaleLabel = (id: LocaleId) => {
		return this.translate(this.meta[id].label);
	};

	public getLocaleSymbol = (id: LocaleId) =>
		this.translate(this.meta[id].symbol);

	public translate = (key: string, lang?: LocaleId) =>
		this.translateFn(key, lang);
}

const ctx = createContext<ILocaleContext>(new LocaleContextClass(null));

export const LocaleContext: Context<ILocaleContext> = ctx;

export const LocaleProvider = ({ router, langs, children }) => (
	<LocaleContext.Provider value={new LocaleContextClass({ router, langs })}>
		{children}
	</LocaleContext.Provider>
);

export default LocaleProvider;
