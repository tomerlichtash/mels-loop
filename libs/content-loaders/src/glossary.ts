import {
	buildPlugins,
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';
import path from 'path';

export async function getAllGlossaryTerms(
	locale: string,
): Promise<Record<string, ProcessedContent>> {
	const glossaryDir = contentPath('glossary');
	if (!(await fileExists(glossaryDir))) return {};

	const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
	const dirs = entries.filter((e) => e.isDirectory());

	const result: Record<string, ProcessedContent> = {};
	const plugins = buildPlugins();

	await Promise.all(
		dirs.map(async (dir) => {
			const filePath = path.join(glossaryDir, dir.name, localeFileName(locale));
			if (await fileExists(filePath)) {
				result[dir.name] = await loadMarkdownFile(filePath, { plugins });
			}
		}),
	);

	return result;
}

export async function getGlossaryTerm(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('glossary', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

export async function getAllGlossarySlugs(): Promise<string[]> {
	const glossaryDir = contentPath('glossary');
	if (!(await fileExists(glossaryDir))) return [];
	const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}
