#!/usr/bin/env tsx
/**
 * Generates apps/web/public/sitemap.xml from content pipeline data.
 * Run: pnpm sitemap (from apps/web) or pnpm --filter @mels-loop/web sitemap (from root)
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
	setContentDir,
	getAllStories,
	getStoryArticles,
} from '@mels-loop/content-pipeline/loaders';

// ESM equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.SITE_URL ?? 'https://melsloop.com';
const OUTPUT_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const CONTENT_DIR = path.resolve(__dirname, '../../../content');

// Must be called before any content loaders are used
setContentDir(CONTENT_DIR);

// Valid values per the sitemap protocol spec
type Freq =
	| 'always'
	| 'hourly'
	| 'daily'
	| 'weekly'
	| 'monthly'
	| 'yearly'
	| 'never';

interface SitemapEntry {
	url: string;
	lastModified: string; // YYYY-MM-DD
	changeFrequency: Freq;
	priority: number; // 0.0–1.0
}

// Serializes entries to a valid sitemap XML document
function toXml(entries: SitemapEntry[]): string {
	const urls = entries
		.map(
			({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function generate() {
	const lastModified = new Date().toISOString().split('T')[0];

	// Helpers to reduce boilerplate in the entries array below
	const url = (path: string) => `${BASE_URL}${path}`;
	const entry = (
		path: string,
		changeFrequency: Freq,
		priority: number,
	): SitemapEntry => ({
		url: url(path),
		lastModified,
		changeFrequency,
		priority,
	});

	const stories = await getAllStories();
	// Fetch all story articles in parallel
	const articlesByStory = await Promise.all(stories.map(getStoryArticles));

	const entries: SitemapEntry[] = [
		// Homepage
		entry('', 'weekly', 1),
		// Static pages
		...['about', 'contact', 'contribute'].map((p) =>
			entry(`/${p}`, 'monthly', 0.5),
		),
		// Story pages and their sub-pages
		...stories.flatMap((storySlug, i) => [
			entry(`/stories/${storySlug}`, 'weekly', 0.9),
			entry(`/stories/${storySlug}/codex`, 'monthly', 0.7),
			entry(`/stories/${storySlug}/resources`, 'monthly', 0.6),
			...articlesByStory[i].map((a) =>
				entry(`/stories/${storySlug}/articles/${a}`, 'monthly', 0.8),
			),
		]),
	];

	await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
	await fs.writeFile(OUTPUT_PATH, toXml(entries), 'utf-8');
	console.log(`Wrote ${entries.length} URLs to ${OUTPUT_PATH}`);
}

generate().catch((err) => {
	console.error(err);
	process.exit(1);
});
