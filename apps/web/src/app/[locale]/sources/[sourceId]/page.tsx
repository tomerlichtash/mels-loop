import {
	getAllSourceIds,
	getResolvedSource,
	getStoryDocument,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import { notFound } from 'next/navigation';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { PageLayout } from '@/components/layout/PageLayout/PageLayout';
import { ContentRenderer, StoryPopoverProvider } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

import styles from './page.module.css';
import { SourceMedia, SourceMeta } from './SourceDetailView';

/**
 * When a record's `page` points at a story document — our transcription of
 * the record — the transcription belongs in the record's own content, not
 * behind a rail link. Returns what's needed to load it, or null.
 */
function transcriptRef(page: string | undefined) {
	const match = page
		? /^\/stories\/([^/]+)\/documents\/([^/]+)$/.exec(page)
		: null;
	return match ? { storySlug: match[1], docSlug: match[2] } : null;
}

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

	const ref = transcriptRef(source.page);
	const transcript = ref
		? await getStoryDocument(ref.storySlug, ref.docSlug, typedLocale)
		: null;

	const sourcesLabel = dictGet(dict, 'nav.sources');

	return (
		<>
			<BreadcrumbBar>
				<Breadcrumbs
					items={[
						homeItemFromDict(dict),
						{ label: sourcesLabel, href: '/sources' },
						{ label: source.title },
					]}
				/>
			</BreadcrumbBar>
			<Container gap="lg">
				{/* The title spans the column and the rail both — it names the whole
				    page, not just the reading column under it. */}
				<div className={styles.identity}>
					{/* What kind of record this is, above its name — the type is a
					    qualifier on the title, not a property listed under it. */}
					<p className={styles.eyebrow}>
						{dictGet(dict, `sources.${source.type}`)}
					</p>
					<Text variant="h1">{source.title}</Text>
				</div>
				<PageLayout
					sidebar={
						<SourceMeta
							source={source}
							locale={typedLocale}
							transcriptEmbedded={Boolean(transcript)}
							labels={{
								author: dictGet(dict, 'sources.colAuthor'),
								date: dictGet(dict, 'sources.colDate'),
								/* "Source" — where the record came from; "credit" was
								 * the accounting term, not the archival one. */
								credit: dictGet(dict, 'sources.colSource'),
								license: dictGet(dict, 'sources.colLicense'),
								openSource: dictGet(dict, 'sources.openSource'),
								transcription: dictGet(dict, 'sources.transcription'),
							}}
						/>
					}
				>
					<SourceMedia
						source={source}
						openLabel={dictGet(dict, 'sources.openSource')}
					/>
					{transcript && ref && (
						/* The transcription is the record's readable form — part of
						 * the content column, under the media it transcribes. */
						<StoryPopoverProvider
							storySlug={ref.storySlug}
							locale={typedLocale}
						>
							<ContentRenderer hast={transcript.hast} />
						</StoryPopoverProvider>
					)}
				</PageLayout>
			</Container>
		</>
	);
}
