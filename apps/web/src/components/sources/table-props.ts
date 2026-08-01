import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { getDirection } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';

import type { Locale } from '@/i18n-init';

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

/**
 * The label plumbing behind the sources table, shared by the global browser
 * and the per-story tab — one component, two routes.
 */
export function buildSourceTableProps(
	sources: ResolvedSource[],
	dict: unknown,
	locale: Locale,
) {
	const groups = groupByType(sources);

	return {
		groups: TYPE_ORDER.filter((t) => groups.has(t)).map((type) => ({
			type,
			label: dictGet(dict, `sources.${type}`),
			sources: groups.get(type)!,
		})),
		typeLabels: Object.fromEntries(
			TYPE_ORDER.map((t) => [t, dictGet(dict, `sources.${t}`)]),
		) as Record<SourceType, string>,
		columnLabels: {
			title: dictGet(dict, 'sources.colTitle'),
			type: dictGet(dict, 'sources.colType'),
			filterByType: dictGet(dict, 'sources.filterByType'),
			standing: dictGet(dict, 'sources.colStanding'),
			date: dictGet(dict, 'sources.colDate'),
			year: dictGet(dict, 'sources.colYear'),
			source: dictGet(dict, 'sources.colSource'),
			license: dictGet(dict, 'sources.colLicense'),
			author: dictGet(dict, 'sources.colAuthor'),
			about: dictGet(dict, 'sources.about'),
			repository: dictGet(dict, 'sources.colRepository'),
			clear: dictGet(dict, 'sources.clearFilters'),
			toggle: dictGet(dict, 'sources.toggleFilters'),
			empty: dictGet(dict, 'sources.noSources'),
			searchPlaceholder: dictGet(dict, 'sources.searchPlaceholder'),
			viewRecord: dictGet(dict, 'sources.viewRecord'),
			expand: dictGet(dict, 'sources.expand'),
			collapse: dictGet(dict, 'sources.collapse'),
			resultsOne: dictGet(dict, 'sources.resultsOne'),
			resultsMany: dictGet(dict, 'sources.resultsMany'),
		},
		dir: getDirection(locale),
		locale,
	};
}
