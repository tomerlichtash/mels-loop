import { getAllStories, getCodex } from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';

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
			{/* A publication note belongs in the body, marked :::smallprint —
			    it is part of the document, not a property of the template. The
			    Hebrew codex used to carry one in frontmatter and the English
			    the same sentence as prose, so the two rendered differently. */}
			{content && (
				<StoryPopoverProvider storySlug={storySlug} locale={typedLocale}>
					<ContentRenderer hast={content.hast} />
				</StoryPopoverProvider>
			)}
		</>
	);
}
