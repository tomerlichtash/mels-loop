import { notFound } from 'next/navigation';
import { Heading, Text, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import type { Locale } from '@mels-loop/i18n/config';
import { locales } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import {
	getStoryDocument,
	getStoryDocuments,
	getStoryConfig,
	getAllStories,
} from '@mels-loop/content-pipeline/loaders';
import { ContentRenderer } from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';
import { StoryPopoverProvider } from '@/components/StoryPopoverProvider';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; docSlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	const params = [];

	for (const storySlug of stories) {
		const documents = await getStoryDocuments(storySlug);
		for (const docSlug of documents) {
			for (const locale of locales) {
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
	const documentsLabel = dictGet(
		dict as Record<string, unknown>,
		'nav.documents',
	);
	const docTitle =
		content.metadata.title ||
		docSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

	return (
		<Stack gap="lg">
			<Breadcrumbs
				items={[
					homeItem(
						locale,
						dictGet(dict as Record<string, unknown>, 'nav.home'),
					),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: documentsLabel, href: `/stories/${storySlug}/documents` },
					{ label: docTitle },
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
