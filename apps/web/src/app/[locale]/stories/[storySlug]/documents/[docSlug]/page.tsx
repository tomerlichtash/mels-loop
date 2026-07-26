import {
	getAllStories,
	getStoryDocument,
	getStoryDocuments,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; docSlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	const params = [];

	for (const storySlug of stories) {
		const documents = await getStoryDocuments(storySlug);
		for (const docSlug of documents) {
			for (const locale of getLocales()) {
				params.push({ locale, storySlug, docSlug });
			}
		}
	}

	return params;
}

export default async function DocumentPage({ params }: PageProps) {
	const { locale, storySlug, docSlug } = await params;
	const typedLocale = locale as Locale;

	const content = await getStoryDocument(storySlug, docSlug, typedLocale);

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
			{content.metadata.author && (
				<Text variant="body2" color="muted" uppercase>
					{content.metadata.author}
				</Text>
			)}
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Container>
	);
}
