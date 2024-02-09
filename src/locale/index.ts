import { default as common } from './common.json' assert { type: 'json' };
import { default as enUS } from './en.json' assert { type: 'json' };
import { default as heIL } from './he.json' assert { type: 'json' };
import type { LocaleSource, RawDict } from 'context/locale/types';

const withCommon = (lang: RawDict): RawDict => Object.assign({}, lang, common);

export const languages: LocaleSource[] = [
	{
		id: 'en',
		direction: 'ltr',
		label: 'locale.en.label',
		symbol: 'locale.en.symbol',
		dict: withCommon(enUS),
	},
	{
		id: 'he',
		direction: 'rtl',
		label: 'locale.he.label',
		symbol: 'locale.he.symbol',
		dict: withCommon(heIL),
	},
];
