import { fileExists } from '@mels-loop/content-pipeline/loaders';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { listSubdirs, loadSourceMessages, resolveSource } from './helpers';
import { paths } from './paths';
import { getStoryConfig } from './stories';
import type { ResolvedSource, Source, SourceMessages } from './types';

export async function getSource(id: string): Promise<Source | null> {
	const filePath = paths.sources.data(id);
	if (!(await fileExists(filePath))) return null;
	const raw = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(raw) as Source;
}

export async function getSourceMessages(
	id: string,
	locale: string,
): Promise<SourceMessages | null> {
	return loadSourceMessages(id, locale);
}

export async function getResolvedSource(
	id: string,
	locale: string,
): Promise<ResolvedSource | null> {
	const [source, messages] = await Promise.all([
		getSource(id),
		loadSourceMessages(id, locale),
	]);
	if (!source || !messages) return null;
	return resolveSource(source, messages);
}

async function getAllSources(): Promise<Source[]> {
	const dirs = await listSubdirs(paths.sources.dir());
	const sources = await Promise.all(
		dirs.map(async (name) => {
			const filePath = paths.sources.data(name);
			if (!(await fileExists(filePath))) return null;
			const raw = await fs.readFile(filePath, 'utf-8');
			return JSON.parse(raw) as Source;
		}),
	);
	return sources.filter((s): s is Source => s !== null);
}

export async function getAllSourceIds(): Promise<string[]> {
	const sources = await getAllSources();
	return sources.map((s) => s.id);
}

export async function getAllResolvedSources(
	locale: string,
): Promise<ResolvedSource[]> {
	const sources = await getAllSources();
	const resolved = await Promise.all(
		sources.map(async (s) => {
			const messages = await loadSourceMessages(s.id, locale);
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
	locale: string,
): Promise<ResolvedSource[]> {
	const config = await getStoryConfig(storySlug);
	const ids = new Set<string>();

	// 1. story.json sources
	for (const id of config.sources ?? []) {
		ids.add(id);
	}

	// 2. Scan content directories for frontmatter sources
	const contentDirs = [
		paths.stories.codex.dir(storySlug),
		...config.articles.map((a) => paths.stories.articles.item(storySlug, a)),
		...(config.documents ?? []).map((d) =>
			paths.stories.documents.item(storySlug, d),
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
	const annotationsDir = paths.stories.annotations.dir(storySlug);
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
			const messages = await loadSourceMessages(s.id, locale);
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
