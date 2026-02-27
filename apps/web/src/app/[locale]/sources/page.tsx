import { getAllResolvedSources } from '@mels-loop/content-pipeline/loaders';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import { getDirection, type Locale, locales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import { SourceFilters } from './SourceFilters';

interface PageProps {
	params: Promise<{ locale: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
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

const MOCK_TYPES: SourceType[] = [
	'image',
	'pdf',
	'link',
	'text',
	'audio',
	'video',
];

function generateMockSources(count: number): ResolvedSource[] {
	return Array.from({ length: count }, (_, i) => {
		const type = MOCK_TYPES[i % MOCK_TYPES.length];
		return {
			id: `mock-source-${i}`,
			type,
			url: `https://example.com/source-${i}`,
			title: `Mock ${type} source #${i + 1}`,
			description: `This is a mock ${type} source generated for testing with large datasets.`,
			author: `Author ${(i % 20) + 1}`,
			date: `${2000 + (i % 25)}`,
			credit: i % 3 === 0 ? `Organization ${(i % 10) + 1}` : undefined,
			license: i % 2 === 0 ? 'public-domain' : 'cc-by',
			tags: [type, 'mock'],
		} satisfies ResolvedSource;
	});
}

export default async function GlobalSourcesPage({
	params,
	searchParams,
}: PageProps) {
	const { locale } = await params;
	const sp = await searchParams;
	const typedLocale = locale as Locale;

	const mockCount =
		sp.mock === 'true' ? Math.min(Number(sp.count) || 100, 100000) : 0;

	const [realSources, dict] = await Promise.all([
		getAllResolvedSources(typedLocale),
		getDictionary(typedLocale),
	]);

	const sources = mockCount
		? [...realSources, ...generateMockSources(mockCount)]
		: realSources;

	const sourcesLabel = dictGet(dict, 'nav.sources');
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
			<Breadcrumbs items={[homeItemFromDict(dict), { label: sourcesLabel }]} />
			<Text variant="h1">{sourcesLabel}</Text>
			{sourceGroups.length === 0 ? (
				<p>{dictGet(dict, 'sources.noSources')}</p>
			) : (
				<SourceFilters
					groups={sourceGroups}
					allLabel={dictGet(dict, 'sources.all')}
					typeLabels={typeLabels}
					columnLabels={columnLabels}
					dir={getDirection(typedLocale)}
				/>
			)}
		</Container>
	);
}
