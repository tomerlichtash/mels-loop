import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { processMarkdown } from '../markdown/pipeline';
import type { ProcessedContent, ContentMetadata, Locale } from '../types';

let _contentDir: string | null = null;

export function setContentDir(dir: string): void {
	_contentDir = dir;
}

export function getContentDir(): string {
	if (!_contentDir) {
		throw new Error(
			'Content directory not set. Call setContentDir() before using loaders.',
		);
	}
	return _contentDir;
}

export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export async function loadMarkdownFile(
	filePath: string,
	figureOptions?: { auto?: boolean; template?: string; base_index?: number },
): Promise<ProcessedContent> {
	const raw = await fs.readFile(filePath, 'utf-8');
	const { data, content } = matter(raw);
	const metadata = data as ContentMetadata;

	const hast = await processMarkdown(content, {
		parseMode: metadata.parse_mode,
		figures: figureOptions ?? metadata.figures,
	});

	return { metadata, hast, raw: content };
}

export function contentPath(...segments: string[]): string {
	return path.join(getContentDir(), ...segments);
}

export function localeFileName(locale: Locale): string {
	return `index.${locale}.md`;
}
