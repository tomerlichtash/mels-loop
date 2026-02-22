import { getAllResolvedSources } from '@mels-loop/content-pipeline/loaders';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import { type Locale, locales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Heading, Stack } from '@mels-loop/ui/primitives';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import { SourceFilters } from './SourceFilters';

interface PageProps {
	params: Promise<{ locale: string }>;
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

export default async function GlobalSourcesPage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [sources, dict] = await Promise.all([
		getAllResolvedSources(typedLocale),
		getDictionary(typedLocale),
	]);

	const sourcesLabel = dictGet(dict, 'nav.sources');
	const groups = groupByType(sources);
	const orderedTypes = TYPE_ORDER.filter((t) => groups.has(t));

	const sourceGroups = orderedTypes.map((type) => ({
		type,
		label: dictGet(dict, `sources.${type}`),
		sources: groups.get(type)!,
	}));

	return (
		<Stack gap="lg">
			<Breadcrumbs items={[homeItemFromDict(dict), { label: sourcesLabel }]} />
			<Heading order={1}>{sourcesLabel}</Heading>
			{sourceGroups.length === 0 ? (
				<p>{dictGet(dict, 'sources.noSources')}</p>
			) : (
				<SourceFilters
					groups={sourceGroups}
					allLabel={dictGet(dict, 'sources.all')}
				/>
			)}
		</Stack>
	);
}
