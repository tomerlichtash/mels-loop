import type { ProcessedContent } from '@mels-loop/content-pipeline/types';

import { listSubdirs, loadAllLocaleFiles, loadLocaleFile } from './helpers';
import { paths } from './paths';

export async function getAllGlossaryTerms(
	locale: string,
): Promise<Record<string, ProcessedContent>> {
	return loadAllLocaleFiles(paths.glossary.dir(), locale);
}

export async function getGlossaryTerm(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.glossary.file(slug, locale));
}

export async function getAllGlossarySlugs(): Promise<string[]> {
	return listSubdirs(paths.glossary.dir());
}
