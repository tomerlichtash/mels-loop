import {
	getAllStories,
	getStoryArticle,
	getStoryArticles,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; articleSlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	const params = [];

	for (const storySlug of stories) {
		const articles = await getStoryArticles(storySlug);
		for (const articleSlug of articles) {
			for (const locale of getLocales()) {
				params.push({ locale, storySlug, articleSlug });
			}
		}
	}

	return params;
}

export default async function ArticlePage({ params }: PageProps) {
	const { locale, storySlug, articleSlug } = await params;
	const typedLocale = locale as Locale;

	const content = await getStoryArticle(storySlug, articleSlug, typedLocale);

	if (!content) notFound();

	return (
		<Container gap="lg">
			{content.metadata.title && (
				<Text variant="h1">{content.metadata.title}</Text>
			)}
			{content.metadata.abstract && (
				<Text variant="subtitle2" color="muted" italic>
					{content.metadata.abstract}
				</Text>
			)}
			{content.metadata.moto && (
				<Text variant="body2" color="muted" italic>
					{content.metadata.moto}
				</Text>
			)}
			{content.metadata.credits && (
				<Text variant="caption" color="muted">
					{content.metadata.credits}
				</Text>
			)}
			{(content.metadata.author || content.metadata.date) && (
				<Text variant="body2" color="muted" uppercase>
					{content.metadata.author as string}
					{content.metadata.author && content.metadata.date && ' · '}
					{content.metadata.date && (
						<time
							dateTime={new Date(content.metadata.date as string).toISOString()}
						>
							{new Date(content.metadata.date as string).getFullYear()}
						</time>
					)}
				</Text>
			)}
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Container>
	);
}
