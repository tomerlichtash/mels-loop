import {
  initContentDir,
  getSortedContentData,
  getAllContentIds,
  getContentData,
} from '../markdown-driver';

import { CONTENT_TYPES } from '../../consts';

const postsDirectory = initContentDir(CONTENT_TYPES.POSTS);

export function getSortedPostsData(locale: string) {
  return getSortedContentData(postsDirectory, locale);
}

export function getAllPostIds(locales: string[]) {
  return getAllContentIds(postsDirectory, locales);
}

export async function getPostData(id: string, locale: string) {
  return getContentData(postsDirectory, id, locale);
}
