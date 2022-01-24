import {
	initContentDir,
	getSortedContentData,
	getAllContentIds,
	getContentData,
} from "../markdown-driver";

import { CONTENT_TYPES } from "../../consts";

const postsDirectory = initContentDir(CONTENT_TYPES.GLOSSARY);

export function getSortedTermsData(locale: string) {
	return getSortedContentData(postsDirectory, locale);
}

export function getAllTermIds(locales: string[]) {
	return getAllContentIds(postsDirectory, locales);
}

export async function getTermData(id: string, locale: string) {
	return getContentData(postsDirectory, id, locale);
}
