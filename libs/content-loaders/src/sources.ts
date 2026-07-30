import path from 'path';

import {
	collectSourceIdsFromDir,
	listSubdirs,
	loadJsonFile,
	loadSourceMessages,
	resolveSource,
} from './helpers';
import { paths } from './paths';
import { getStoryConfig } from './stories';
import type { ResolvedSource, Source, SourceMessages } from './types';

const SOURCE_REF_PREFIX = 'source:';

/**
 * Resolve an asset URL that may be a `source:` ref or a direct URL.
 * - `"source:mel-kaye-photo-1952"` → loads the source and returns its `url`
 * - `"/media/images/foo.jpg"` → returns as-is
 */
export async function resolveAssetUrl(
	value: string,
): Promise<string | undefined> {
	if (!value.startsWith(SOURCE_REF_PREFIX)) return value;
	const sourceId = value.slice(SOURCE_REF_PREFIX.length);
	const source = await getSource(sourceId);
	return source?.url;
}

export async function getSource(id: string): Promise<Source | null> {
	return loadJsonFile<Source>(paths.sources.data(id));
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
		dirs.map((name) => loadJsonFile<Source>(paths.sources.data(name))),
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
	const ids = new Set<string>(config.sources ?? []);

	// Scan content directories for frontmatter sources
	const [articleSlugs, documentSlugs] = await Promise.all([
		listSubdirs(paths.stories.articles.dir(storySlug)),
		listSubdirs(paths.stories.documents.dir(storySlug)),
	]);
	const contentDirs = [
		paths.stories.codex.dir(storySlug),
		...articleSlugs.map((a) => paths.stories.articles.item(storySlug, a)),
		...documentSlugs.map((d) => paths.stories.documents.item(storySlug, d)),
	];

	// Scan annotations (one level deeper — subdirs contain .md files)
	const annotationsDir = paths.stories.annotations.dir(storySlug);
	const annotSubdirs = await listSubdirs(annotationsDir);
	const allDirs = [
		...contentDirs,
		...annotSubdirs.map((d) => path.join(annotationsDir, d)),
	];

	const batches = await Promise.all(allDirs.map(collectSourceIdsFromDir));
	for (const batch of batches) {
		for (const id of batch) ids.add(id);
	}

	// Resolve sources
	const sources = await Promise.all(
		[...ids].map(async (id) => {
			const [source, messages] = await Promise.all([
				loadJsonFile<Source>(paths.sources.data(id)),
				loadSourceMessages(id, locale),
			]);
			if (!source || !messages) return null;
			return resolveSource(source, messages);
		}),
	);
	return sources
		.filter((s): s is ResolvedSource => s !== null)
		.sort(
			(a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title),
		);
}
