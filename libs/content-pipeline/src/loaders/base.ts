import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { processMarkdown } from '../markdown/pipeline';
import type {
	ContentMetadata,
	ProcessedContent,
	ResolvedSource,
} from '../types';

const ENV_KEY = 'CONTENT_PIPELINE_DIR';

export function setContentDir(dir: string): void {
	process.env[ENV_KEY] = dir;
}

export function getContentDir(): string {
	const dir = process.env[ENV_KEY];
	if (!dir) {
		throw new Error(
			'Content directory not set. Call setContentDir() before using loaders.',
		);
	}
	return dir;
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
	sources?: Record<string, ResolvedSource>,
): Promise<ProcessedContent> {
	const raw = await fs.readFile(filePath, 'utf-8');
	const { data, content } = matter(raw);
	const metadata = data as ContentMetadata;

	const hast = await processMarkdown(content, {
		parseMode: metadata.parse_mode,
		figures: figureOptions ?? metadata.figures,
		sources,
	});

	return { metadata, hast, raw: content };
}

export function contentPath(...segments: string[]): string {
	return path.join(getContentDir(), ...segments);
}

export function localeFileName(locale: string): string {
	return `index.${locale}.md`;
}
