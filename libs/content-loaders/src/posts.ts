import type { ProcessedContent } from '@mels-loop/content-pipeline/types';

import { listSubdirs, loadLocaleFile } from './helpers';
import { paths } from './paths';

export async function getPost(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.posts.file(slug, locale));
}

export async function getAllPosts(): Promise<string[]> {
	return listSubdirs(paths.posts.dir());
}
