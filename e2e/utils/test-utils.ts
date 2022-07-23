import { Languages } from "../../src/locales";
import { _translate } from "../../src/locales/translate";
import { STRIP_MD, STRIP_MD_LINK } from "./validators";

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
	} else if (path && path !== baseDir) {
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
		.replace(STRIP_MD, "$2")
		.replace(STRIP_MD_LINK, "$1")
		.trim();
