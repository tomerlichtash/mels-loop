import {
	getAllStories,
	getCodex,
	getStoryConfig,
} from '@mels-loop/content/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Text } from '@mels-loop/ui/primitives';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		getLocales().map((locale) => ({ locale, storySlug })),
	);
}

export default async function StoryLandingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const [config, content, dict] = await Promise.all([
		getStoryConfig(storySlug),
		getCodex(storySlug, typedLocale),
		getDictionary(typedLocale),
	]);

	const storyTitle = content?.metadata.title || config.title[typedLocale];
	const storySubtitle = content?.metadata.subtitle;

	return (
		<>
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{
						label: dictGet(dict, 'stories'),
						href: '/stories',
					},
					{ label: storyTitle },
				]}
			/>
			<div className={styles.header}>
				<Text variant="h1">{storyTitle}</Text>
				{storySubtitle && (
					<Text variant="subtitle2" color="muted">
						{storySubtitle}
					</Text>
				)}
			</div>

			{content && (
				<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
					<ContentRenderer hast={content.hast} />
				</StoryPopoverProvider>
			)}
		</>
	);
}
