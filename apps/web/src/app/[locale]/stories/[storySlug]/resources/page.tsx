import {
	getAllStories,
	getResources,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { ContentRenderer } from '@/content';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		getLocales().map((locale) => ({ locale, storySlug })),
	);
}

export default async function ResourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const content = await getResources(storySlug, typedLocale);

	if (!content) notFound();

	return (
		<Container gap="lg">
			{content.metadata.title && (
				<Text variant="h1">{content.metadata.title}</Text>
			)}
			<ContentRenderer hast={content.hast} />
		</Container>
	);
}
