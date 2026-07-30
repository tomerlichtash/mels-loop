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
import { formatArticleDate } from '@/lib/format-date';

import styles from './article.module.css';

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
			<header className={styles.header}>
				{content.metadata.title && (
					<Text variant="h1" className={styles.title}>
						{content.metadata.title}
					</Text>
				)}
				{content.metadata.abstract && (
					<p className={styles.standfirst}>{content.metadata.abstract}</p>
				)}
				{content.metadata.moto && (
					<p className={styles.moto}>{content.metadata.moto}</p>
				)}
				{(content.metadata.author ||
					content.metadata.date ||
					content.metadata.credits) && (
					<p className={styles.meta}>
						{content.metadata.author && (
							<span>{content.metadata.author as string}</span>
						)}
						{content.metadata.date && (
							<time
								dateTime={new Date(
									content.metadata.date as string,
								).toISOString()}
							>
								{formatArticleDate(
									content.metadata.date as string,
									typedLocale,
								)}
							</time>
						)}
						{content.metadata.credits && (
							<span className={styles.credits}>{content.metadata.credits}</span>
						)}
					</p>
				)}
			</header>
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Container>
	);
}
