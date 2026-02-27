import {
	getAllStories,
	getResolvedStorySources,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type {
	ResolvedSource,
	SourceType,
} from '@mels-loop/content-pipeline/types';
import { type Locale, locales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { SourceCard } from '@mels-loop/ui/content';
import { Breadcrumbs } from '@mels-loop/ui/layout';
import { Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		locales.map((locale) => ({ locale, storySlug })),
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

export default async function SourcesPage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [sources, config, dict] = await Promise.all([
		getResolvedStorySources(storySlug, typedLocale),
		getStoryConfig(storySlug),
		getDictionary(typedLocale),
	]);

	if (sources.length === 0) notFound();

	const storyTitle = config.title[typedLocale];
	const sourcesLabel = dictGet(dict, 'nav.sources');

	const groups = groupByType(sources);
	const orderedTypes = TYPE_ORDER.filter((t) => groups.has(t));

	return (
		<Container gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: storyTitle, href: `/stories/${storySlug}` },
					{ label: sourcesLabel },
				]}
			/>
			<Text variant="h1">{sourcesLabel}</Text>
			{orderedTypes.map((type) => {
				const typeSources = groups.get(type)!;
				const typeLabel = dictGet(dict, `sources.${type}`);
				return (
					<section key={type} className={styles.group}>
						<Text variant="h2" className={styles.groupHeading}>
							{typeLabel}
						</Text>
						<div className={styles.cards}>
							{typeSources.map((source) => (
								<SourceCard key={source.id} source={source} />
							))}
						</div>
					</section>
				);
			})}
		</Container>
	);
}
