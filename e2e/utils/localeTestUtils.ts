// import { languages } from '../../src/locale/index';
// import {
// 	translate as translateFn,
// 	wrapStr,
// } from '../../src/context/locale/translate';
// import { getDictionary } from '../../src/context/locale/helpers';
// import { LocaleSource } from '../../src/context/locale/types';
import i18n from '../../i18n';

import { EMPTY_STRING, UNTRANSLATED_STRING } from './patterns';

export const baseDir = 'http://localhost:3000';

export const locales = i18n.locales; //languages.map((l: LocaleSource) => l.id);

// export const translate = (key: string, locale?: string) => key;
// translateFn(locale, getDictionary(languages))(key);

export const getLocalePath = (
	locale: string,
	docId?: string,
	path?: string
) => {
	let params = [baseDir];

	if (locale !== 'en') {
		params.push(locale);
	}

	if (docId) {
		params.push(docId);
	}

	if (path && path !== baseDir) {
		params.push(path);
	}

	return params.join('/');
};

export const validateStringTranslation = (str: string) =>
	!UNTRANSLATED_STRING.test(str) && str !== EMPTY_STRING; //wrapStr(EMPTY_STRING);
