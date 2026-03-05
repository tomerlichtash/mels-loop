import {
	getResources,
	getStoryConfig,
} from '@mels-loop/content-loaders/loaders';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { BackLink } from '@/components/BackLink';
import { ContentRenderer } from '@/content';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ResourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [config, content] = await Promise.all([
		getStoryConfig(storySlug),
		getResources(storySlug, typedLocale),
	]);

	if (!content) notFound();

	const storyTitle = config.title[typedLocale];

	return (
		<Container gap="lg">
			<BackLink href={`/stories/${storySlug}`}>{storyTitle}</BackLink>
			{content.metadata.title && (
				<Text variant="h1">{content.metadata.title}</Text>
			)}
			<ContentRenderer hast={content.hast} />
		</Container>
	);
}
