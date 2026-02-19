import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type {
	ProcessedContent,
	StoryConfig,
	ArticleMeta,
	Locale,
} from '../types';
import {
	fileExists,
	loadMarkdownFile,
	contentPath,
	localeFileName,
} from './base';

export async function getStoryConfig(slug: string): Promise<StoryConfig> {
	const configPath = contentPath('stories', slug, 'story.json');
	const raw = await fs.readFile(configPath, 'utf-8');
	return JSON.parse(raw) as StoryConfig;
}

export async function getStory(
	slug: string,
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath('stories', slug, localeFileName(locale));
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath);
}

export async function getAllStories(): Promise<string[]> {
	const storiesDir = contentPath('stories');
	const entries = await fs.readdir(storiesDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getStoryArticle(
	storySlug: string,
	articleSlug: string,
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'articles',
		articleSlug,
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const config = await getStoryConfig(storySlug);
	return loadMarkdownFile(filePath, config.figures);
}

export async function getStoryArticles(storySlug: string): Promise<string[]> {
	const articlesDir = contentPath('stories', storySlug, 'articles');
	if (!(await fileExists(articlesDir))) return [];
	const entries = await fs.readdir(articlesDir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getAllAnnotations(
	storySlug: string,
	locale: Locale,
): Promise<Record<string, ProcessedContent>> {
	const annotationsDir = contentPath('stories', storySlug, 'annotations');
	if (!(await fileExists(annotationsDir))) return {};

	const entries = await fs.readdir(annotationsDir, { withFileTypes: true });
	const dirs = entries.filter((e) => e.isDirectory());

	const result: Record<string, ProcessedContent> = {};

	await Promise.all(
		dirs.map(async (dir) => {
			const filePath = path.join(
				annotationsDir,
				dir.name,
				localeFileName(locale),
			);
			if (await fileExists(filePath)) {
				result[dir.name] = await loadMarkdownFile(filePath);
			}
		}),
	);

	return result;
}

export async function getCodex(
	storySlug: string,
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'codex',
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const config = await getStoryConfig(storySlug);
	return loadMarkdownFile(filePath, config.figures);
}

export async function getResources(
	storySlug: string,
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'resources',
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath);
}

export async function getArticleMeta(
	storySlug: string,
	locale: Locale,
): Promise<ArticleMeta[]> {
	const config = await getStoryConfig(storySlug);
	return readSlugsMetadata(storySlug, 'articles', config.articles, locale);
}

export async function getDocumentMeta(
	storySlug: string,
	locale: Locale,
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
	locale: Locale,
): Promise<ProcessedContent | null> {
	const filePath = contentPath(
		'stories',
		storySlug,
		'documents',
		docSlug,
		localeFileName(locale),
	);
	if (!(await fileExists(filePath))) return null;

	const config = await getStoryConfig(storySlug);
	return loadMarkdownFile(filePath, config.figures);
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
	locale: Locale,
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
