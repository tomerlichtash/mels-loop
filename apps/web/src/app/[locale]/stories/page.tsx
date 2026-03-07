import {
	getAllStories,
	getStoryConfig,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
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

	const storiesWithMessages = await Promise.all(
		storySlugs.map(async (slug) => {
			const [config, messages] = await Promise.all([
				getStoryConfig(slug),
				getStoryMessages(slug, typedLocale),
			]);
			const thumbnailUrl = await resolveAssetUrl(
				config.assets?.thumbnail ?? config.assets?.cover ?? '',
			);
			return { config, messages, thumbnailUrl };
		}),
	);

	const sorted = [...storiesWithMessages];

	const title = dictGet(dict, 'stories');

	return (
		<StaticPage
			title={title}
			breadcrumbs={[homeItemFromDict(dict), { label: title }]}
		>
			<div>
				{sorted.map(({ config, messages, thumbnailUrl }) => (
					<StoryCard
						key={config.slug}
						slug={config.slug}
						title={resolveStoryField(config.meta.title, typedLocale, messages)}
						abstract={resolveStoryField(
							config.meta.abstract,
							typedLocale,
							messages,
						)}
						thumbnailUrl={
							thumbnailUrl ? resolveMediaUrl(thumbnailUrl) : undefined
						}
					/>
				))}
			</div>
		</StaticPage>
	);
}
