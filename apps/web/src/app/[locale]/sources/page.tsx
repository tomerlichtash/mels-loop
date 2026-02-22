import { getAllResolvedSources } from '@mels-loop/content-pipeline/loaders';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import { type Locale, locales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { SourceCard } from '@mels-loop/ui/content';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Heading, Stack } from '@mels-loop/ui/primitives';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import styles from './page.module.css';

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

	return (
		<Stack gap="lg">
			<Breadcrumbs items={[homeItemFromDict(dict), { label: sourcesLabel }]} />
			<Heading order={1}>{sourcesLabel}</Heading>
			{orderedTypes.length === 0 ? (
				<p>{dictGet(dict, 'sources.noSources')}</p>
			) : (
				orderedTypes.map((type) => {
					const typeSources = groups.get(type)!;
					const typeLabel = dictGet(dict, `sources.${type}`);
					return (
						<section key={type} className={styles.group}>
							<Heading order={2} className={styles.groupHeading}>
								{typeLabel}
							</Heading>
							<div className={styles.cards}>
								{typeSources.map((source) => (
									<SourceCard key={source.id} source={source} />
								))}
							</div>
						</section>
					);
				})
			)}
		</Stack>
	);
}
