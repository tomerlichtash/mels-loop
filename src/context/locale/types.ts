import type { NextRouter } from 'next/router';
import type { LocaleId, TextDirection } from 'types/locale';

export type RawDict = Record<string, string>;

export type LocaleDict = Record<LocaleId, string>;

export type LocaleMeta = {
	direction: TextDirection;
	label: string;
	symbol: string;
};

export type LocaleSource = {
	id: LocaleId;
	direction: TextDirection;
	label: string;
	symbol: string;
	dict: RawDict;
};

export type LocaleContextProps = {
	readonly router: NextRouter;
	readonly langs: LocaleSource[];
};

export interface ILocaleContext {
	locale: LocaleId;
	locales: LocaleId[];
	textDirection: TextDirection;
	translate: (s: string, lang?: LocaleId) => string;
	getLocaleSymbol: (id: LocaleId) => string;
	getLocaleLabel: (id: LocaleId) => string;
}
