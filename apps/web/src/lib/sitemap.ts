import {
	getAllStories,
	getStoryArticles,
} from '@mels-loop/content-pipeline/loaders';

// Valid values per the sitemap protocol spec
export type SitemapFreq =
	| 'always'
	| 'hourly'
	| 'daily'
	| 'weekly'
	| 'monthly'
	| 'yearly'
	| 'never';

export interface SitemapEntry {
	url: string;
	lastModified: Date;
	changeFrequency: SitemapFreq;
	priority: number; // 0.0–1.0
}

/** Builds the full list of sitemap entries from content pipeline data. */
export async function buildSitemapEntries(
	baseUrl: string,
): Promise<SitemapEntry[]> {
	const now = new Date();
	const entry = (
		path: string,
		changeFrequency: SitemapFreq,
		priority: number,
	): SitemapEntry => ({
		url: `${baseUrl}${path}`,
		lastModified: now,
		changeFrequency,
		priority,
	});

	const stories = await getAllStories();
	// Fetch all story articles in parallel
	const articlesByStory = await Promise.all(stories.map(getStoryArticles));

	return [
		// Homepage
		entry('', 'weekly', 1),
		// Static pages
		...['about', 'contact', 'contribute'].map((p) =>
			entry(`/${p}`, 'monthly', 0.5),
		),
		// Global sources browser
		entry('/sources', 'monthly', 0.6),
		// Story pages and their sub-pages
		...stories.flatMap((storySlug, i) => [
			entry(`/stories/${storySlug}`, 'weekly', 0.9),
			entry(`/stories/${storySlug}/codex`, 'monthly', 0.7),
			entry(`/stories/${storySlug}/resources`, 'monthly', 0.6),
			entry(`/stories/${storySlug}/sources`, 'monthly', 0.6),
			...articlesByStory[i].map((a) =>
				entry(`/stories/${storySlug}/articles/${a}`, 'monthly', 0.8),
			),
		]),
	];
}

/** Serializes entries to a valid sitemap XML document. */
export function toSitemapXml(entries: SitemapEntry[]): string {
	const urls = entries
		.map(
			({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>
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
