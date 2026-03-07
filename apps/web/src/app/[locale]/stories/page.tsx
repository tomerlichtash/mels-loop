import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-loaders/loaders';
import { dictGet } from '@mels-loop/i18n/dict';

import { StaticPage } from '@/components/layout/StaticPage/StaticPage';
import { StoryCard } from '@/components/stories/StoryCard/StoryCard';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';
import { resolveMediaUrl } from '@/lib/media-url';

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
					<StoryCard
						key={config.slug}
						config={config}
						locale={typedLocale}
						thumbnailUrl={
							config.thumbnail
								? resolveMediaUrl(config.thumbnail)
								: config.cover
									? resolveMediaUrl(config.cover)
									: undefined
						}
					/>
				))}
			</div>
		</StaticPage>
	);
}
