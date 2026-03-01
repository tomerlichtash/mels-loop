import {
	buildPlugins,
	contentPath,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import {
	type ArticleMeta,
	type ResolvedSource,
	resolveSource,
	type Source,
	type SourceMessages,
	type StoryConfig,
} from './types';

/** Matches ![alt](sources/id) or ![alt](source/id) */
const SOURCE_IMAGE_RE = /!\[[^\]]*\]\(sources?\/([^)]+)\)/gi;
/** Matches {{sources/id:field}} or {{source/id:field}} */
const SOURCE_VAR_RE = /\{\{sources?\/([^:}]+):[^}]+\}\}/gi;

/**
 * Scans raw markdown content for all `sources/id` references (image embeds and
 * template vars) and returns the unique IDs. Used to pre-load sources before
 * processing.
 */
function extractSourceIds(raw: string): string[] {
	const ids = new Set<string>();
	let match: RegExpExecArray | null;
	SOURCE_IMAGE_RE.lastIndex = 0;
	while ((match = SOURCE_IMAGE_RE.exec(raw)) !== null) {
		ids.add(match[1]);
	}
	SOURCE_VAR_RE.lastIndex = 0;
	while ((match = SOURCE_VAR_RE.exec(raw)) !== null) {
		ids.add(match[1]);
	}
	return [...ids];
}

const FALLBACK_LOCALE = 'en';

/**
 * Loads and resolves sources by ID directly, without going through sources.ts,
 * to avoid a circular module dependency (sources.ts imports stories.ts).
 * Reads both `index.json` (archival data) and `index.{locale}.json` (messages)
 * then merges them into a ResolvedSource.
 */
async function loadResolvedSourcesById(
	ids: string[],
	locale: string,
): Promise<Record<string, ResolvedSource>> {
	if (ids.length === 0) return {};
	const entries = await Promise.all(
		ids.map(async (id) => {
			const basePath = contentPath('sources', id, 'index.json');
			if (!(await fileExists(basePath))) return null;

			const msgPath = contentPath('sources', id, `index.${locale}.json`);
			const fallbackPath = contentPath(
				'sources',
				id,
				`index.${FALLBACK_LOCALE}.json`,
			);

			const [baseRaw, msgRaw] = await Promise.all([
				fs.readFile(basePath, 'utf-8'),
				(async () => {
					if (await fileExists(msgPath)) return fs.readFile(msgPath, 'utf-8');
					if (await fileExists(fallbackPath))
						return fs.readFile(fallbackPath, 'utf-8');
					return null;
				})(),
			]);

			const source = JSON.parse(baseRaw) as Source;
			const messages: SourceMessages = msgRaw
				? (JSON.parse(msgRaw) as SourceMessages)
				: { title: id };
			return [id, resolveSource(source, messages)] as const;
		}),
	);
	return Object.fromEntries(entries.filter((e) => e !== null));
}

export async function getStoryConfig(slug: string): Promise<StoryConfig> {
	const configPath = contentPath('stories', slug, 'story.json');
	const raw = await fs.readFile(configPath, 'utf-8');
	return JSON.parse(raw) as StoryConfig;
}

export async function getStory(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('stories', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

export async function getAllStories(): Promise<string[]> {
	const storiesDir = contentPath('stories');
	const entries = await fs.readdir(storiesDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getStoryArticle(
	storySlug: string,
	articleSlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'articles',
		articleSlug,
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const rawFile = await fs.readFile(filePath, 'utf-8');
	const sourceIds = extractSourceIds(rawFile);
	const [config, sources] = await Promise.all([
		getStoryConfig(storySlug),
		loadResolvedSourcesById(sourceIds, locale),
	]);
	return loadMarkdownFile(filePath, {
		plugins: buildPlugins({ sources, figures: config.figures }),
	});
}

export async function getStoryArticles(storySlug: string): Promise<string[]> {
	const articlesDir = contentPath('stories', storySlug, 'articles');
	if (!(await fileExists(articlesDir))) return [];
	const entries = await fs.readdir(articlesDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getAnnotation(
	storySlug: string,
	key: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'annotations',
		key,
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

export async function getAllAnnotations(
	storySlug: string,
	locale: string,
): Promise<Record<string, ProcessedContent>> {
	const annotationsDir = contentPath('stories', storySlug, 'annotations');
	if (!(await fileExists(annotationsDir))) return {};

	const entries = await fs.readdir(annotationsDir, { withFileTypes: true });
	const dirs = entries.filter((e) => e.isDirectory());

	const result: Record<string, ProcessedContent> = {};
	const plugins = buildPlugins();

	await Promise.all(
		dirs.map(async (dir) => {
			const filePath = path.join(
				annotationsDir,
				dir.name,
				localeFileName(locale),
			);
			if (await fileExists(filePath)) {
				result[dir.name] = await loadMarkdownFile(filePath, { plugins });
			}
		}),
	);

	return result;
}

export async function getCodex(
	storySlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'codex',
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const rawFile = await fs.readFile(filePath, 'utf-8');
	const sourceIds = extractSourceIds(rawFile);
	const [config, sources] = await Promise.all([
		getStoryConfig(storySlug),
		loadResolvedSourcesById(sourceIds, locale),
	]);
	return loadMarkdownFile(filePath, {
		plugins: buildPlugins({ sources, figures: config.figures }),
	});
}

export async function getResources(
	storySlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'resources',
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

export async function getArticleMeta(
	storySlug: string,
	locale: string,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	return readSlugsMetadata(storySlug, 'articles', config.articles, locale);
}

export async function getDocumentMeta(
	storySlug: string,
	locale: string,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	return readSlugsMetadata(
		storySlug,
		'documents',
		config.documents ?? [],
		locale,
	);
}

export async function getStoryDocument(
	storySlug: string,
	docSlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'documents',
		docSlug,
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const rawFile = await fs.readFile(filePath, 'utf-8');
	const sourceIds = extractSourceIds(rawFile);
	const [config, sources] = await Promise.all([
		getStoryConfig(storySlug),
		loadResolvedSourcesById(sourceIds, locale),
	]);
	return loadMarkdownFile(filePath, {
		plugins: buildPlugins({ sources, figures: config.figures }),
	});
}

export async function getStoryDocuments(storySlug: string): Promise<string[]> {
	const documentsDir = contentPath('stories', storySlug, 'documents');
	if (!(await fileExists(documentsDir))) return [];
	const entries = await fs.readdir(documentsDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function readSlugsMetadata(
	storySlug: string,
	folder: string,
	slugs: string[],
	locale: string,
): Promise<ArticleMeta[]> {
	const results: ArticleMeta[] = [];
	for (const slug of slugs) {
		const filePath = contentPath(
			'stories',
			storySlug,
			folder,
			slug,
			localeFileName(locale),
		);
		if (!(await fileExists(filePath))) {
			results.push({ slug, title: slug.replace(/-/g, ' ') });
			continue;
		}
		const raw = await fs.readFile(filePath, 'utf-8');
		const { data } = matter(raw);
		results.push({
			slug,
			title: (data.title as string) || slug.replace(/-/g, ' '),
			author: data.author as string | undefined,
		});
	}
	return results;
}
