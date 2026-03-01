import {
	getAllStories,
	getStoryConfig,
	getStoryDocument,
	getStoryDocuments,
} from '@mels-loop/content/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

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

	const [content, config, dict] = await Promise.all([
		getStoryDocument(storySlug, docSlug, typedLocale),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	if (!content) notFound();

	const storyTitle = config.title[typedLocale];
	const documentsLabel = dictGet(dict, 'nav.documents');
	const docTitle =
		content.metadata.title ||
		docSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Container gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: documentsLabel, href: `/stories/${storySlug}/documents` },
					{ label: docTitle },
				]}
			/>
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
