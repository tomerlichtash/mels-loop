import {
	getAllStories,
	getArticleMeta,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container } from '@mels-loop/ui/primitives';

import { EntryList } from '@/components/stories/EntryList/EntryList';
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

export default async function ArticlesListingPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;
	const articles = await getArticleMeta(storySlug, typedLocale);

	return (
		<Container gap="lg">
			<EntryList items={articles} hrefBase={`/stories/${storySlug}/articles`} />
		</Container>
	);
}
