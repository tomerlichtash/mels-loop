import {
	buildPlugins,
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';

export async function getPage(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('pages', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}
