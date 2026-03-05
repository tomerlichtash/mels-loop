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
} from './helpers';
import { paths } from './paths';
import { type ArticleMeta, type StoryConfig } from './types';

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
	const [config, sources] = await Promise.all([
		getStoryConfig(storySlug),
		loadResolvedSourcesById(sourceIds, locale),
	]);
	return loadMarkdownFile(filePath, {
		plugins: buildPlugins({ sources, figures: config.figures }),
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
	return readSlugsMetadata(
		storySlug,
		paths.stories.articles,
		config.articles,
		locale,
	);
}

export async function getDocumentMeta(
	storySlug: string,
	locale: string,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	return readSlugsMetadata(
		storySlug,
		paths.stories.documents,
		config.documents ?? [],
		locale,
	);
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
