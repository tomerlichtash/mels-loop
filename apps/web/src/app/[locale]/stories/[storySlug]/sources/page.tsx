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

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

import { SourceFilters } from '../../../sources/SourceFilters';

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

	const typeLabels = Object.fromEntries(
		TYPE_ORDER.map((t) => [t, dictGet(dict, `sources.${t}`)]),
	) as Record<SourceType, string>;

	const columnLabels = {
		name: dictGet(dict, 'sources.colName'),
		description: dictGet(dict, 'sources.colDescription'),
		type: dictGet(dict, 'sources.colType'),
		date: dictGet(dict, 'sources.colDate'),
		source: dictGet(dict, 'sources.colSource'),
		searchPlaceholder: dictGet(dict, 'sources.searchPlaceholder'),
	};

	return (
		<Container gap="lg">
			{sourceGroups.length === 0 ? (
				<p>{dictGet(dict, 'sources.noSources')}</p>
			) : (
				<SourceFilters
					groups={sourceGroups}
					allLabel={dictGet(dict, 'sources.all')}
					typeLabels={typeLabels}
					columnLabels={columnLabels}
					dir={getDirection(typedLocale)}
					maxHeight="650px"
				/>
			)}
		</Container>
	);
}
