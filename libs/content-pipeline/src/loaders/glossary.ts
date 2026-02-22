import fs from 'fs/promises';
import path from 'path';

import type { Locale, ProcessedContent } from '../types';
import {
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from './base';

export async function getAllGlossaryTerms(
	locale: Locale,
): Promise<Record<string, ProcessedContent>> {
	const glossaryDir = contentPath('glossary');
	if (!(await fileExists(glossaryDir))) return {};

	const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
	const dirs = entries.filter((e) => e.isDirectory());

	const result: Record<string, ProcessedContent> = {};

	await Promise.all(
		dirs.map(async (dir) => {
			const filePath = path.join(glossaryDir, dir.name, localeFileName(locale));
			if (await fileExists(filePath)) {
				result[dir.name] = await loadMarkdownFile(filePath);
			}
		}),
	);

	return result;
}

export async function getGlossaryTerm(
	slug: string,
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('glossary', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath);
}

export async function getAllGlossarySlugs(): Promise<string[]> {
	const glossaryDir = contentPath('glossary');
	if (!(await fileExists(glossaryDir))) return [];
	const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}
