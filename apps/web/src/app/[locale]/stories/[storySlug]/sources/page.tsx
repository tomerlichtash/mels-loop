import {
	getAllStories,
	getResolvedStorySources,
} from '@mels-loop/content-loaders/loaders';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { getDirection, getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Container } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { SourceCards } from '@/components/sources/SourceCards/SourceCards';
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

const TYPE_ORDER: SourceType[] = [
	'document',
	'image',
	'pdf',
	'audio',
	'video',
	'link',
	'text',
	'archive',
	'other',
];

function groupByType(
	sources: ResolvedSource[],
): Map<SourceType, ResolvedSource[]> {
	const groups = new Map<SourceType, ResolvedSource[]>();
	for (const source of sources) {
		const group = groups.get(source.type) ?? [];
		group.push(source);
		groups.set(source.type, group);
	}
	return groups;
}

export default async function StorySourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [sources, dict] = await Promise.all([
		getResolvedStorySources(storySlug, typedLocale),
		getDictionary(typedLocale),
	]);

	if (sources.length === 0) notFound();

	const groups = groupByType(sources);
	const orderedTypes = TYPE_ORDER.filter((t) => groups.has(t));

	const sourceGroups = orderedTypes.map((type) => ({
		type,
		label: dictGet(dict, `sources.${type}`),
		sources: groups.get(type)!,
	}));

	return sourceGroups.length === 0 ? (
		<Container gap="lg">
			<p>{dictGet(dict, 'sources.noSources')}</p>
		</Container>
	) : (
		<Suspense>
			<SourceCards
				groups={sourceGroups}
				locale={locale}
				dir={getDirection(typedLocale)}
			/>
		</Suspense>
	);
}
