import {
	getAllStories,
	getResolvedSource,
	getResolvedStorySources,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Badge, Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string; sourceId: string }>;
}

export default async function SourceDetailPage({ params }: PageProps) {
	const { locale, sourceId } = await params;
	const typedLocale = locale as Locale;

	const [source, dict] = await Promise.all([
		getResolvedSource(sourceId, typedLocale),
		getDictionary(typedLocale),
	]);

	if (!source) notFound();

	const typeLabel = dictGet(dict, `sources.${source.type}`);

	return (
		<Container gap="md">
			<div>
				<Text variant="h2" component="h1">
					{source.title}
				</Text>
				<Badge variant="outlined">{typeLabel}</Badge>
			</div>
			{source.summary && (
				<Text variant="body2" color="muted" component="p">
					{source.summary}
				</Text>
			)}
			{source.description && <Text component="p">{source.description}</Text>}
			{source.author && (
				<Text variant="body2" color="muted" component="p">
					{source.author}
				</Text>
			)}
			{source.date && (
				<Text variant="body2" color="muted" component="p">
					{source.date}
				</Text>
			)}
			{source.url && (
				<Text component="p">
					<a href={source.url} target="_blank" rel="noopener noreferrer">
						{dictGet(dict, 'sources.openSource')}
					</a>
				</Text>
			)}
		</Container>
	);
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	const params = [];

	for (const storySlug of stories) {
		for (const locale of getLocales()) {
			const sources = await getResolvedStorySources(storySlug, locale);
			for (const source of sources) {
				params.push({ locale, storySlug, sourceId: source.id });
			}
		}
	}

	return params;
}
