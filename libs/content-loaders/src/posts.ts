import {
	buildPlugins,
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';

export async function getPost(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('posts', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

export async function getAllPosts(): Promise<string[]> {
	const postsDir = contentPath('posts');
	if (!(await fileExists(postsDir))) return [];
	const entries = await fs.readdir(postsDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}
