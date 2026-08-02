import {
	getAllResolvedEntities,
	getAllStories,
	getStoryArticles,
} from '@mels-loop/content-loaders/loaders';

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
	const people = (await getAllResolvedEntities('en', 'person')).map(
		(person) => person.id,
	);

	return [
		// Homepage
		entry('', 'weekly', 1),
		// Static pages
		...['about', 'contact', 'contribute'].map((p) =>
			entry(`/${p}`, 'monthly', 0.5),
		),
		/*
		 * No glossary entries. robots.txt disallows /glossary while its
		 * presentation is unfinished, and listing pages in a sitemap that
		 * crawlers are told not to fetch is a contradiction. The two come back
		 * together.
		 */
		/*
		 * Posts are omitted. Their routes still answer, so existing links
		 * keep working, but they are unlisted rather than promoted.
		 */
		// Global sources browser and the people index
		entry('/sources', 'monthly', 0.6),
		entry('/people', 'monthly', 0.6),
		...people.map((id) => entry(`/people/${id}`, 'monthly', 0.7)),
		// Story pages and their sub-pages
		...stories.flatMap((storySlug, i) => [
			entry(`/stories/${storySlug}`, 'weekly', 0.9),
			entry(`/stories/${storySlug}/codex`, 'monthly', 0.7),
			entry(`/stories/${storySlug}/sources`, 'monthly', 0.6),
			entry(`/stories/${storySlug}/people`, 'monthly', 0.6),
			...articlesByStory[i].map((a) =>
				entry(`/stories/${storySlug}/articles/${a}`, 'monthly', 0.8),
			),
		]),
	];
}
