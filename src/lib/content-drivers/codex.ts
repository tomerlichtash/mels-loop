import {
	initContentDir,
	getSortedContentData,
	getAllContentIds,
	getContentData,
} from "../markdown-driver";

import { CONTENT_TYPES } from "../../consts";

const codexDirectory = initContentDir(CONTENT_TYPES.CODEX);

export function getSortedCodexData(locale: string) {
	return getSortedContentData(codexDirectory, locale);
}

export function getAllPostIds(locales: string[]) {
	return getAllContentIds(codexDirectory, locales);
}

export async function getPostData(id: string, locale: string) {
	return getContentData(codexDirectory, id, locale);
}
