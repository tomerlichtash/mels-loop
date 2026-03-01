import {
	getAllSourceIds,
	getResolvedSource,
} from '@mels-loop/content-pipeline/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import { SourceDetailView } from './SourceDetailView';

interface PageProps {
	params: Promise<{ locale: string; sourceId: string }>;
}

export async function generateStaticParams() {
	const ids = await getAllSourceIds();
	return ids.flatMap((sourceId) =>
		getLocales().map((locale) => ({ locale, sourceId })),
	);
}

export default async function SourceDetailPage({ params }: PageProps) {
	const { locale, sourceId } = await params;
	const typedLocale = locale as Locale;

	const [source, dict] = await Promise.all([
		getResolvedSource(sourceId, typedLocale),
		getDictionary(typedLocale),
	]);

	if (!source) notFound();

	const sourcesLabel = dictGet(dict, 'nav.sources');

	return (
		<Container gap="lg">
			<Breadcrumbs
				items={[
					homeItemFromDict(dict),
					{ label: sourcesLabel, href: '/sources' },
					{ label: source.title },
				]}
			/>
			<Text variant="h1">{source.title}</Text>
			<SourceDetailView source={source} />
		</Container>
	);
}
