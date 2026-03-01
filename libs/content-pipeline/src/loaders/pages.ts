import type { ProcessedContent } from '../types';
import {
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from './base';

export async function getPage(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('pages', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath);
}
