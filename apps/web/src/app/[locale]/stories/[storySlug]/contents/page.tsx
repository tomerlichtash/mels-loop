import {
	getAllStories,
	getStoryContents,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Text } from '@mels-loop/ui/primitives';

import { StoryTableOfContents } from '@/components/stories/StoryTableOfContents/StoryTableOfContents';
import { getDictionary } from '@/i18n';
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

export default async function StoryContentsPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const [dict, contents] = await Promise.all([
		getDictionary(typedLocale),
		getStoryContents(storySlug, typedLocale),
	]);

	return (
		<>
			<Text variant="h2" component="h1">
				{dictGet(dict, 'nav.contents')}
			</Text>
			{contents && <StoryTableOfContents contents={contents} />}
		</>
	);
}
