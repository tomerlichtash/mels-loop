import {
  initContentDir,
  getSortedContentData,
  getAllContentIds,
  getContentData,
} from '../markdown-driver';

import { CONTENT_TYPES } from '../../consts';

const postsDirectory = initContentDir(CONTENT_TYPES.DOCS);

export function getSortedDocsData(locale: string) {
  return getSortedContentData(postsDirectory, locale);
}

export function getAllDocIds(locales: string[]) {
  return getAllContentIds(postsDirectory, locales);
}

export async function getDocData(id: string, locale: string) {
  return getContentData(postsDirectory, id, locale);
}
