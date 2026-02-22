import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import {
	type Locale,
	type ResolvedSource,
	resolveSource,
	type Source,
	type SourceMessages,
} from '../types';
import { contentPath, fileExists } from './base';
import { getStoryConfig } from './stories';

export async function getSource(id: string): Promise<Source | null> {
	const filePath = contentPath('sources', id, 'index.json');
	if (!(await fileExists(filePath))) return null;
	const raw = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(raw) as Source;
}

export async function getSourceMessages(
	id: string,
	locale: Locale,
): Promise<SourceMessages | null> {
	const localePath = contentPath('sources', id, `index.${locale}.json`);
	if (await fileExists(localePath)) {
		const raw = await fs.readFile(localePath, 'utf-8');
		return JSON.parse(raw) as SourceMessages;
	}
	// Fall back to English
	if (locale !== 'en') {
		const enPath = contentPath('sources', id, 'index.en.json');
		if (await fileExists(enPath)) {
			const raw = await fs.readFile(enPath, 'utf-8');
			return JSON.parse(raw) as SourceMessages;
		}
	}
	return null;
}

export async function getResolvedSource(
	id: string,
	locale: Locale,
): Promise<ResolvedSource | null> {
	const [source, messages] = await Promise.all([
		getSource(id),
		getSourceMessages(id, locale),
	]);
	if (!source || !messages) return null;
	return resolveSource(source, messages);
}

async function getAllSources(): Promise<Source[]> {
	const sourcesDir = contentPath('sources');
	try {
		const entries = await fs.readdir(sourcesDir, { withFileTypes: true });
		const dirs = entries.filter((e) => e.isDirectory());
		const sources = await Promise.all(
			dirs.map(async (d) => {
				const filePath = path.join(sourcesDir, d.name, 'index.json');
				if (!(await fileExists(filePath))) return null;
				const raw = await fs.readFile(filePath, 'utf-8');
				return JSON.parse(raw) as Source;
			}),
		);
		return sources.filter((s): s is Source => s !== null);
	} catch {
		return [];
	}
}

export async function getAllSourceIds(): Promise<string[]> {
	const sources = await getAllSources();
	return sources.map((s) => s.id);
}

export async function getAllResolvedSources(
	locale: Locale,
): Promise<ResolvedSource[]> {
	const sources = await getAllSources();
	const resolved = await Promise.all(
		sources.map(async (s) => {
			const messages = await getSourceMessages(s.id, locale);
			if (!messages) return null;
			return resolveSource(s, messages);
		}),
	);
	return resolved.filter((s): s is ResolvedSource => s !== null);
}

async function getSourcesByIds(ids: string[]): Promise<Source[]> {
	const results = await Promise.all(ids.map(getSource));
	return results.filter((s): s is Source => s !== null);
}

/**
 * Aggregates sources from:
 * 1. story.json "sources" array
 * 2. codex/articles/documents/annotations frontmatter "sources" arrays
 * Returns deduplicated ResolvedSource[] sorted by type then title.
 */
export async function getResolvedStorySources(
	storySlug: string,
	locale: Locale,
): Promise<ResolvedSource[]> {
	const config = await getStoryConfig(storySlug);
	const ids = new Set<string>();

	// 1. story.json sources
	for (const id of config.sources ?? []) {
		ids.add(id);
	}

	// 2. Scan content directories for frontmatter sources
	const contentDirs = [
		contentPath('stories', storySlug, 'codex'),
		...config.articles.map((a) =>
			contentPath('stories', storySlug, 'articles', a),
		),
		...(config.documents ?? []).map((d) =>
			contentPath('stories', storySlug, 'documents', d),
		),
	];

	await Promise.all(
		contentDirs.map(async (dir) => {
			try {
				const entries = await fs.readdir(dir, { withFileTypes: true });
				const mdFiles = entries.filter(
					(e) => e.isFile() && e.name.endsWith('.md'),
				);
				await Promise.all(
					mdFiles.map(async (f) => {
						try {
							const raw = await fs.readFile(path.join(dir, f.name), 'utf-8');
							const { data } = matter(raw);
							const sources = data.sources as string[] | undefined;
							if (Array.isArray(sources)) {
								for (const id of sources) ids.add(id);
							}
						} catch {
							// ignore unreadable files
						}
					}),
				);
			} catch {
				// ignore missing directories
			}
		}),
	);

	// 3. Scan annotations
	const annotationsDir = contentPath('stories', storySlug, 'annotations');
	try {
		const annotDirs = await fs.readdir(annotationsDir, {
			withFileTypes: true,
		});
		await Promise.all(
			annotDirs
				.filter((e) => e.isDirectory())
				.map(async (d) => {
					try {
						const files = await fs.readdir(path.join(annotationsDir, d.name), {
							withFileTypes: true,
						});
						await Promise.all(
							files
								.filter((f) => f.isFile() && f.name.endsWith('.md'))
								.map(async (f) => {
									try {
										const raw = await fs.readFile(
											path.join(annotationsDir, d.name, f.name),
											'utf-8',
										);
										const { data } = matter(raw);
										const sources = data.sources as string[] | undefined;
										if (Array.isArray(sources)) {
											for (const id of sources) ids.add(id);
										}
									} catch {
										// ignore
									}
								}),
						);
					} catch {
						// ignore
					}
				}),
		);
	} catch {
		// no annotations directory
	}

	const sources = await getSourcesByIds([...ids]);
	const resolved = await Promise.all(
		sources.map(async (s) => {
			const messages = await getSourceMessages(s.id, locale);
			if (!messages) return null;
			return resolveSource(s, messages);
		}),
	);
	return resolved
		.filter((s): s is ResolvedSource => s !== null)
		.sort(
			(a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title),
		);
}
