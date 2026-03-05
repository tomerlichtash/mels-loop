import { getAllStories, getCodex } from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Text } from '@mels-loop/ui/primitives';

import { ContentRenderer, StoryPopoverProvider } from '@/content';
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

export default async function StoryLandingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const content = await getCodex(storySlug, typedLocale);

	return (
		<>
			{content?.metadata.subtitle && (
				<Text variant="body2" color="muted" italic>
					{content.metadata.subtitle}
				</Text>
			)}
			{content && (
				<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
					<ContentRenderer hast={content.hast} />
				</StoryPopoverProvider>
			)}
		</>
	);
}
