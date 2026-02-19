import type { MetadataRoute } from 'next';
import {
	getAllStories,
	getStoryArticles,
	getAllGlossarySlugs,
} from '@mels-loop/content-pipeline/loaders';
import '../content-init';

const BASE_URL = process.env.SITE_URL || 'https://melsloop.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: MetadataRoute.Sitemap = [];

	entries.push({
		url: BASE_URL,
		lastModified: new Date(),
		changeFrequency: 'weekly',
		priority: 1,
	});

	const staticPages = ['about', 'contact', 'contribute'];
	for (const page of staticPages) {
		entries.push({
			url: `${BASE_URL}/${page}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		});
	}

	const stories = await getAllStories();
	for (const storySlug of stories) {
		entries.push({
			url: `${BASE_URL}/stories/${storySlug}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		});

		entries.push({
			url: `${BASE_URL}/stories/${storySlug}/codex`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		});

		entries.push({
			url: `${BASE_URL}/stories/${storySlug}/resources`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		});

		const articles = await getStoryArticles(storySlug);
		for (const articleSlug of articles) {
			entries.push({
				url: `${BASE_URL}/stories/${storySlug}/articles/${articleSlug}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.8,
			});
		}
	}

	const glossarySlugs = await getAllGlossarySlugs();
	entries.push({
		url: `${BASE_URL}/glossary`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.6,
	});
	for (const termSlug of glossarySlugs) {
		entries.push({
			url: `${BASE_URL}/glossary/${termSlug}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		});
	}

	return entries;
}
