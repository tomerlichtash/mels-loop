import { Languages } from "../../src/locales";
import { _translate } from "../../src/locales/translate";
import {
	MD_BLOCKQUOTE,
	MD_ORDERED_LIST,
	MD_UNORDERED_LIST_ASTRIEK,
	MD_UNORDERED_LIST_DASH,
	STRIP_MD,
	STRIP_MD_LINK,
} from "./validators";

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
export const getFrontMatter = (path: string, locale: string) => {
	const testMdFile = fs.readFileSync(
		`./public/content/${path}.${locale}.md`,
		"utf-8"
	);
	return matter(testMdFile);
};

export const stripMarkdown = (content: string) =>
	content
		.replace("\n", "")
		.replace(/<!---?\s.*\s-?-->/g, "")
		.replace(STRIP_MD, "$2")
		.replace(STRIP_MD_LINK, "$1")
		.replace(MD_BLOCKQUOTE, "")
		.replace(MD_ORDERED_LIST, "")
		.replace(MD_UNORDERED_LIST_DASH, "")
		.replace(MD_UNORDERED_LIST_ASTRIEK, "")
		.trim();

export const sanitizeContent = (content: string) =>
	stripMarkdown(content).split("\n").filter(Boolean).join("");
