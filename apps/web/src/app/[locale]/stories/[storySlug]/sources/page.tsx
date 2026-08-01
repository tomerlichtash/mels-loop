import {
	getAboutMap,
	getAllStories,
	getResolvedStorySources,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { Container } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { SourceFilters } from '@/components/sources/SourceFilters/SourceFilters';
import { buildSourceTableProps } from '@/components/sources/table-props';
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

/* The same table as the global browser, pre-scoped to this story's records —
 * one component, two routes. */
export default async function StorySourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [sources, dict] = await Promise.all([
		getResolvedStorySources(storySlug, typedLocale),
		getDictionary(typedLocale),
	]);

	if (sources.length === 0) notFound();

	const tableProps = buildSourceTableProps(sources, dict, typedLocale);
	const aboutBySource = await getAboutMap(typedLocale);

	return (
		<Container gap="lg">
			{/* Suspense because the filters read useSearchParams — the URL
			 * carries the filter state, and static prerender needs the
			 * boundary. */}
			<Suspense>
				<SourceFilters {...tableProps} aboutBySource={aboutBySource} />
			</Suspense>
		</Container>
	);
}
