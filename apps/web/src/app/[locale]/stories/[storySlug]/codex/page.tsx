import { getCodex } from '@mels-loop/content-loaders/loaders';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function CodexPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const content = await getCodex(storySlug, typedLocale);

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
			<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
				<ContentRenderer hast={content.hast} />
			</StoryPopoverProvider>
		</Container>
	);
}
