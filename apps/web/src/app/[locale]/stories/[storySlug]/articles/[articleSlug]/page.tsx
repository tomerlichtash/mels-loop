import {
	getAllStories,
	getStoryArticle,
	getStoryArticles,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import { type Locale, locales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { ContentRenderer } from '@mels-loop/ui/content';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Heading, Stack, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { StoryPopoverProvider } from '@/components/StoryPopoverProvider';
import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; articleSlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	const params = [];

	for (const storySlug of stories) {
		const articles = await getStoryArticles(storySlug);
		for (const articleSlug of articles) {
			for (const locale of locales) {
				params.push({ locale, storySlug, articleSlug });
			}
		}
	}

	return params;
}

export default async function ArticlePage({ params }: PageProps) {
	const { locale, storySlug, articleSlug } = await params;
	const typedLocale = locale as Locale;

	const [content, config, dict] = await Promise.all([
		getStoryArticle(storySlug, articleSlug, typedLocale),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	if (!content) notFound();

	const storyTitle = config.title[typedLocale];
	const articlesLabel = dictGet(dict, 'nav.articles');
	const articleTitle =
		content.metadata.title ||
		articleSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: articlesLabel, href: `/stories/${storySlug}/articles` },
					{ label: articleTitle },
				]}
			/>
			{content.metadata.title && (
				<Heading order={1}>{content.metadata.title}</Heading>
			)}
			{content.metadata.abstract && (
				<Text size="lg" color="dimmed" italic>
					{content.metadata.abstract}
				</Text>
			)}
			{content.metadata.moto && (
				<Text size="sm" color="dimmed" italic>
					{content.metadata.moto}
				</Text>
			)}
			{content.metadata.credits && (
				<Text size="xs" color="dimmed">
					{content.metadata.credits}
				</Text>
			)}
			{content.metadata.author && (
				<Text size="sm" color="dimmed" uppercase>
					{content.metadata.author}
				</Text>
			)}
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Stack>
	);
}
