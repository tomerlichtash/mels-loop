import { Languages } from "../../src/locales";
import { _translate, wrapStr } from "../../src/locales/translate";
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
	SINGLE_WHITE_SPACE,
	EMPTY_STRING,
	ASTRIEK_MOCK,
	MD_SINGLE_ASTRIEK,
	MD_CODEBLOCK,
	MD_CODEBLOCK_INLINE,
	UNTRANSLATED_STRING,
} from "./patterns";

const fs = require("fs");
const matter = require("gray-matter");

export const baseDir = "http://localhost:3000";

/**
 * Locale
 */
export const locales = Object.keys(Languages);

export const translate = (locale: string, key: string) =>
	_translate(locale, Languages)(key);

export const getLocalePath = (locale: string, path?: string) => {
	let params = [baseDir];
	if (locale !== "en") {
		params.push(locale);
	}
	if (path && path !== baseDir) {
		params.push(path);
	}
	return params.join("/");
};

/**
 * MarkDown
 */
export const getFrontMatter = (
	document: string,
	path: string,
	locale: string
) => {
	const testMdFile = fs.readFileSync(
		`./public/content/docs/${document}/${path}.${locale}.md`,
		"utf-8"
	);
	return matter(testMdFile);
};

export const stripMarkdown = (content: string) =>
	content
		.replace("\n", EMPTY_STRING)
		.replace(
			MD_MID_ASTRIEK,
			[EMPTY_STRING, ASTRIEK_MOCK, EMPTY_STRING].join(SINGLE_WHITE_SPACE)
		)
		.replace(STRIP_MD, "$2")
		.replace(MD_COMMENT, EMPTY_STRING)
		.replace(MD_BLOCKQUOTE, EMPTY_STRING)
		.replace(MD_ORDERED_LIST, EMPTY_STRING)
		.replace(MD_UNORDERED_LIST_DASH, EMPTY_STRING)
		.replace(MD_UNORDERED_LIST_ASTRIEK, EMPTY_STRING)
		.replace(MD_DOUBLE_ASTRIEK, "$1")
		.replace(MD_SINGLE_ASTRIEK, ASTRIEK_MOCK)
		.replace(MD_LINK, "$1")
		.replace(MD_CODEBLOCK, "$1")
		.replace(MD_CODEBLOCK_INLINE, "$2")
		.trim()
		.split("\n")
		.filter(Boolean)
		.join(EMPTY_STRING);

export const validateStringTranslation = (str: string) =>
	!UNTRANSLATED_STRING.test(str) && str !== wrapStr(EMPTY_STRING);
