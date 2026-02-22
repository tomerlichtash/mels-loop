import { Heading, Text } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { locales } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import {
	getCodex,
	getStoryConfig,
	getAllStories,
} from '@mels-loop/content-pipeline/loaders';
import { ContentRenderer } from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';
import { StoryPopoverProvider } from '@/components/StoryPopoverProvider';
import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		locales.map((locale) => ({ locale, storySlug })),
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
					homeItem(
						locale,
						dictGet(dict as Record<string, unknown>, 'nav.home'),
					),
					{
						label: dictGet(dict as Record<string, unknown>, 'stories'),
						href: '/stories',
					},
					{ label: storyTitle },
				]}
			/>
			<div className={styles.header}>
				<Heading order={1}>{storyTitle}</Heading>
				{storySubtitle && (
					<Text size="lg" color="dimmed">
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
