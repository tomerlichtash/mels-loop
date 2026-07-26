import {
	buildPlugins,
	fileExists,
	loadMarkdownFile,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';
import matter from 'gray-matter';

import {
	extractSourceIds,
	listSubdirs,
	loadAllLocaleFiles,
	loadLocaleFile,
	loadResolvedSourcesById,
	loadSourceMessages,
} from './helpers';
import { paths } from './paths';
import {
	type ArticleMeta,
	type ContentsEntry,
	type ResolvedContentsEntry,
	type ResolvedPartEntry,
	type StoryConfig,
} from './types';

/**
 * Load a story's messages for a given locale.
 * Returns an empty object if the messages file doesn't exist.
 */
export async function getStoryMessages(
	slug: string,
	locale: string,
): Promise<Record<string, Record<string, string>>> {
	const filePath = paths.stories.messages(slug, locale);
	if (!(await fileExists(filePath))) return {};
	const raw = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(raw) as Record<string, Record<string, string>>;
}

/**
 * Resolve a story field (title or abstract) that may be a message key or inline translations.
 * - If `string`, resolve from messages via dot-notation (e.g. "story.title" → messages.story.title)
 * - If `Record<string, string>`, return the value for the given locale
 */
export function resolveStoryField(
	field: string | Record<string, string>,
	locale: string,
	messages: Record<string, Record<string, string>>,
): string {
	if (typeof field === 'string') {
		const parts = field.split('.');
		let current: unknown = messages;
		for (const part of parts) {
			if (current && typeof current === 'object') {
				current = (current as Record<string, unknown>)[part];
			} else {
				return field;
			}
		}
		return typeof current === 'string' ? current : field;
	}
	return field[locale] ?? '';
}

/**
 * Resolve a page entry's title from its markdown frontmatter.
 * `ref` is relative to the story folder (e.g. "codex", "articles/preface").
 */
async function resolvePageTitle(
	storySlug: string,
	ref: string,
	locale: string,
): Promise<string | null> {
	// Map ref to a file path. "codex" → codex/index.{locale}.md,
	// "articles/slug" → articles/slug/index.{locale}.md, etc.
	const parts = ref.split('/');
	let filePath: string;
	if (parts.length === 1) {
		// e.g. "codex"
		filePath = paths.stories.codex.file(storySlug, locale);
	} else if (parts[0] === 'articles') {
		filePath = paths.stories.articles.file(storySlug, parts[1], locale);
	} else if (parts[0] === 'documents') {
		filePath = paths.stories.documents.file(storySlug, parts[1], locale);
	} else {
		return null;
	}

	if (!(await fileExists(filePath))) return null;
	const raw = await fs.readFile(filePath, 'utf-8');
	const { data } = matter(raw);
	return (data.title as string) || null;
}

/**
 * Resolve a single contents entry to display-ready data.
 */
async function resolveEntry(
	entry: ContentsEntry,
	storySlug: string,
	locale: string,
	messages: Record<string, Record<string, string>>,
): Promise<ResolvedContentsEntry | null> {
	const basePath = `/stories/${storySlug}`;

	switch (entry.type) {
		case 'part': {
			const title = messages.parts?.[entry.ref];
			if (!title) {
				console.warn(
					`[contents] Missing message key "parts.${entry.ref}" for story "${storySlug}"`,
				);
				return null;
			}
			const children = (
				await Promise.all(
					entry.children.map((child) =>
						resolveEntry(child, storySlug, locale, messages),
					),
				)
			).filter((c): c is ResolvedContentsEntry => c !== null);
			const author = entry.author
				? resolveStoryField(entry.author, locale, messages)
				: undefined;
			const resolved: ResolvedContentsEntry = {
				type: 'part',
				ref: entry.ref,
				title,
				children,
				...(entry.collapse && { collapse: true }),
				...(entry.aside === false && { aside: false }),
				...(author && { author }),
			};
			if (entry.collapse && children.length === 1) {
				const child = children[0];
				if ('href' in child) {
					(resolved as ResolvedPartEntry).href = child.href;
				}
			}
			return resolved;
		}
		case 'page': {
			const pageTitle = await resolvePageTitle(storySlug, entry.ref, locale);
			if (!pageTitle) {
				console.warn(
					`[contents] Missing page "${entry.ref}" for story "${storySlug}" locale "${locale}"`,
				);
				return null;
			}
			const title = entry.title
				? resolveStoryField(entry.title, locale, messages)
				: pageTitle;
			const href =
				entry.ref === 'codex' ? basePath : `${basePath}/${entry.ref}`;
			const pageAuthor = entry.author
				? resolveStoryField(entry.author, locale, messages)
				: undefined;
			const subtitle = entry.subtitle
				? resolveStoryField(entry.subtitle, locale, messages)
				: undefined;
			return {
				type: 'page',
				ref: entry.ref,
				title,
				href,
				...(subtitle && { subtitle }),
				...(pageAuthor && { author: pageAuthor }),
			};
		}
		case 'source': {
			const sourceMessages = await loadSourceMessages(entry.ref, locale);
			if (!sourceMessages) {
				console.warn(
					`[contents] Missing source "${entry.ref}" for story "${storySlug}" locale "${locale}"`,
				);
				return null;
			}
			return {
				type: 'source',
				ref: entry.ref,
				title: sourceMessages.title,
				href: `${basePath}/sources/${entry.ref}`,
			};
		}
		case 'generated': {
			const title = messages.generated?.[entry.ref];
			if (!title) {
				console.warn(
					`[contents] Missing message key "generated.${entry.ref}" for story "${storySlug}"`,
				);
				return null;
			}
			return {
				type: 'generated',
				ref: entry.ref,
				title,
				href: `${basePath}/contents/${entry.ref}`,
			};
		}
	}
}

/**
 * Resolve a story's `contents` model to display-ready data for a given locale.
 * Returns null if the story has no `contents` field.
 */
export async function getStoryContents(
	storySlug: string,
	locale: string,
): Promise<ResolvedContentsEntry[] | null> {
	const [config, messages] = await Promise.all([
		getStoryConfig(storySlug),
		getStoryMessages(storySlug, locale),
	]);

	if (!config.contents) return null;

	const resolved = await Promise.all(
		config.contents.map((entry) =>
			resolveEntry(entry, storySlug, locale, messages),
		),
	);

	return resolved.filter((e): e is ResolvedContentsEntry => e !== null);
}

/**
 * Extract slugs for a given section prefix (e.g. "articles", "documents")
 * from the contents model. Falls back to filesystem discovery if no contents.
 */
function extractSectionSlugs(
	contents: ContentsEntry[] | undefined,
	section: string,
): string[] {
	if (!contents) return [];
	const slugs: string[] = [];
	for (const entry of contents) {
		if (entry.type === 'part') {
			for (const child of entry.children) {
				if (child.type === 'page' && child.ref.startsWith(`${section}/`)) {
					slugs.push(child.ref.slice(section.length + 1));
				}
			}
		} else if (entry.type === 'page' && entry.ref.startsWith(`${section}/`)) {
			slugs.push(entry.ref.slice(section.length + 1));
		}
	}
	return slugs;
}

export async function getStoryConfig(slug: string): Promise<StoryConfig> {
	const raw = await fs.readFile(paths.stories.config(slug), 'utf-8');
	return JSON.parse(raw) as StoryConfig;
}

export async function getStory(
	slug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.stories.file(slug, locale));
}

export async function getAllStories(): Promise<string[]> {
	return listSubdirs(paths.stories.dir());
}

async function loadWithSourceContext(
	filePath: string,
	storySlug: string,
	locale: string,
): Promise<ProcessedContent> {
	const rawFile = await fs.readFile(filePath, 'utf-8');
	const sourceIds = extractSourceIds(rawFile);
	const [config, messages, sources] = await Promise.all([
		getStoryConfig(storySlug),
		getStoryMessages(storySlug, locale),
		loadResolvedSourcesById(sourceIds, locale),
	]);
	const figures = config.figures
		? {
				...config.figures,
				template: config.figures.template
					? resolveStoryField(config.figures.template, locale, messages)
					: config.figures.template,
			}
		: config.figures;
	return loadMarkdownFile(filePath, {
		plugins: buildPlugins({ sources, figures }),
	});
}

export async function getStoryArticle(
	storySlug: string,
	articleSlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = paths.stories.articles.file(storySlug, articleSlug, locale);
	if (!(await fileExists(filePath))) return null;
	return loadWithSourceContext(filePath, storySlug, locale);
}

export async function getStoryArticles(storySlug: string): Promise<string[]> {
	return listSubdirs(paths.stories.articles.dir(storySlug));
}

export async function getAnnotation(
	storySlug: string,
	key: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.stories.annotations.file(storySlug, key, locale));
}

export async function getAllAnnotations(
	storySlug: string,
	locale: string,
): Promise<Record<string, ProcessedContent>> {
	return loadAllLocaleFiles(paths.stories.annotations.dir(storySlug), locale);
}

export async function getCodex(
	storySlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = paths.stories.codex.file(storySlug, locale);
	if (!(await fileExists(filePath))) return null;
	return loadWithSourceContext(filePath, storySlug, locale);
}

export async function getResources(
	storySlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	return loadLocaleFile(paths.stories.resources.file(storySlug, locale));
}

export async function getArticleMeta(
	storySlug: string,
	locale: string,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	const slugs = extractSectionSlugs(config.contents, 'articles');
	if (slugs.length === 0) {
		// Fallback: discover from filesystem
		const fsSlugs = await listSubdirs(paths.stories.articles.dir(storySlug));
		return readSlugsMetadata(
			storySlug,
			paths.stories.articles,
			fsSlugs,
			locale,
		);
	}
	return readSlugsMetadata(storySlug, paths.stories.articles, slugs, locale);
}

export async function getDocumentMeta(
	storySlug: string,
	locale: string,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	const slugs = extractSectionSlugs(config.contents, 'documents');
	if (slugs.length === 0) {
		// Fallback: discover from filesystem
		const fsSlugs = await listSubdirs(paths.stories.documents.dir(storySlug));
		return readSlugsMetadata(
			storySlug,
			paths.stories.documents,
			fsSlugs,
			locale,
		);
	}
	return readSlugsMetadata(storySlug, paths.stories.documents, slugs, locale);
}

export async function getStoryDocument(
	storySlug: string,
	docSlug: string,
	locale: string,
): Promise<ProcessedContent | null> {
	const filePath = paths.stories.documents.file(storySlug, docSlug, locale);
	if (!(await fileExists(filePath))) return null;
	return loadWithSourceContext(filePath, storySlug, locale);
}

export async function getStoryDocuments(storySlug: string): Promise<string[]> {
	return listSubdirs(paths.stories.documents.dir(storySlug));
}

interface SectionPaths {
	file: (story: string, slug: string, locale: string) => string;
}

async function readSlugsMetadata(
	storySlug: string,
	section: SectionPaths,
	slugs: string[],
	locale: string,
): Promise<ArticleMeta[]> {
	const results: ArticleMeta[] = [];
	for (const slug of slugs) {
		const filePath = section.file(storySlug, slug, locale);
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
			abstract: data.abstract as string | undefined,
			date: data.date as string | undefined,
			image: data.image as string | undefined,
			imageCaption: data.imageCaption as string | undefined,
		});
	}
	return results;
}
