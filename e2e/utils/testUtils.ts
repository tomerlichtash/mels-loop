import matter from 'gray-matter';
import { languages } from '../../src/locale/index';
import {
	translate as translateFn,
	wrapStr,
} from '../../src/context/locale/translate';
import {
	MD_LINK,
	MD_BLOCKQUOTE,
	MD_COMMENT,
	MD_ORDERED_LIST,
	MD_UNORDERED_LIST_ASTRIEK,
	MD_UNORDERED_LIST_DASH,
	STRIP_MD,
	MD_DOUBLE_ASTRIEK,
	MD_MID_ASTRIEK,
	WHITE_SPACE,
	EMPTY_STRING,
	ASTRIEK_MOCK,
	MD_SINGLE_ASTRIEK,
	MD_CODEBLOCK,
	MD_CODEBLOCK_INLINE,
	UNTRANSLATED_STRING,
} from './patterns';

import fs from 'fs';
import { getDictionary } from 'context/locale/helpers';
import { LocaleSource } from 'context/locale/types';
// const matter = require("gray-matter");

export const baseDir = 'http://localhost:3000';

/**
 * Locale
 */
export const locales = languages.map((l: LocaleSource) => l.id);

export const translate = (locale: string, key: string) =>
	translateFn(locale, getDictionary(languages))(key);

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

/**
 * MarkDown
 */
export const getFrontMatter = (docId: string, path: string, locale: string) => {
	const testMdFile = fs.readFileSync(
		`./public/content/${docId}/${path}.${locale}.md`,
		'utf-8'
	);
	return matter(testMdFile);
};

export const stripMarkdown = (content: string) =>
	content
		.replace('\n', EMPTY_STRING)
		.replace(
			MD_MID_ASTRIEK,
			[EMPTY_STRING, ASTRIEK_MOCK, EMPTY_STRING].join(WHITE_SPACE)
		)
		.replace(STRIP_MD, '$2')
		.replace(MD_COMMENT, EMPTY_STRING)
		.replace(MD_BLOCKQUOTE, EMPTY_STRING)
		.replace(MD_ORDERED_LIST, EMPTY_STRING)
		.replace(MD_UNORDERED_LIST_DASH, EMPTY_STRING)
		.replace(MD_UNORDERED_LIST_ASTRIEK, EMPTY_STRING)
		.replace(MD_DOUBLE_ASTRIEK, '$1')
		.replace(MD_SINGLE_ASTRIEK, ASTRIEK_MOCK)
		.replace(MD_LINK, '$1')
		.replace(MD_CODEBLOCK, '$1')
		.replace(MD_CODEBLOCK_INLINE, '$2')
		.trim()
		.split('\n')
		.filter(Boolean)
		.join(EMPTY_STRING);

export const validateStringTranslation = (str: string) =>
	!UNTRANSLATED_STRING.test(str) && str !== wrapStr(EMPTY_STRING);
