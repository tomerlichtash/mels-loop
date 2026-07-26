import type { ProcessedContent } from '@mels-loop/content-pipeline/types';

import { loadLocaleFile } from './helpers';
import { paths } from './paths';

export async function getPage(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.pages.file(slug, locale));
}
