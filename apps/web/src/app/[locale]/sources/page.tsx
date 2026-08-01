import {
	getAboutMap,
	getAllResolvedSources,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import { Suspense } from 'react';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { SourceFilters } from '@/components/sources/SourceFilters/SourceFilters';
import { buildSourceTableProps } from '@/components/sources/table-props';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
	return getLocales().map((locale) => ({ locale }));
}

export default async function GlobalSourcesPage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [sources, dict] = await Promise.all([
		getAllResolvedSources(typedLocale),
		getDictionary(typedLocale),
	]);

	const sourcesLabel = dictGet(dict, 'nav.sources');
	const tableProps = buildSourceTableProps(sources, dict, typedLocale);
	const aboutBySource = await getAboutMap(typedLocale);

	return (
		<>
			<BreadcrumbBar>
				<Breadcrumbs
					items={[homeItemFromDict(dict), { label: sourcesLabel }]}
				/>
			</BreadcrumbBar>
			<Container gap="lg">
				<Text variant="h1">{sourcesLabel}</Text>
				{tableProps.groups.length === 0 ? (
					<p>{dictGet(dict, 'sources.noSources')}</p>
				) : (
					/* Suspense because the filters read useSearchParams — the URL
					 * carries the filter state, and static prerender needs the
					 * boundary. */
					<Suspense>
						<SourceFilters {...tableProps} aboutBySource={aboutBySource} />
					</Suspense>
				)}
			</Container>
		</>
	);
}
