import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';

import { StaticPage } from '@/components/StaticPage/StaticPage';
import { StoryCard } from '@/components/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function StoriesPage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [storySlugs, dict] = await Promise.all([
		getAllStories(),
		getDictionary(typedLocale),
	]);

	const stories = await Promise.all(
		storySlugs.map((slug) => getStoryConfig(slug)),
	);

	const sorted = stories.sort((a, b) =>
		a.featured === b.featured ? 0 : a.featured ? -1 : 1,
	);

	const title = dictGet(dict, 'stories');

	return (
		<StaticPage
			title={title}
			breadcrumbs={[homeItemFromDict(dict), { label: title }]}
		>
			<div>
				{sorted.map((config) => (
					<StoryCard key={config.slug} config={config} locale={typedLocale} />
				))}
			</div>
		</StaticPage>
	);
}
