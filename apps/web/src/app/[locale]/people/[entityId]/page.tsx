import {
	getAllResolvedEntities,
	getEntityBio,
	getResolvedEntity,
	getResolvedSource,
	getStoriesInvolving,
	getStoryContents,
	getStoryMessages,
	resolveAssetUrl,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ImageViewer } from '@/components/content/ImageViewer/ImageViewer';
import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { PageLayout } from '@/components/layout/PageLayout/PageLayout';
import { AsideList, type AsideRow } from '@/components/stories/Asides/Asides';
import { ContentRenderer } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';
import { formatSourceDate } from '@/lib/format-date';
import { resolveMediaUrl } from '@/lib/media-url';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; entityId: string }>;
}

export async function generateStaticParams() {
	/* Persons only — other kinds exist, get cited, and earn pages when there
	 * is content for one. */
	const people = await getAllResolvedEntities('en', 'person');
	return people.flatMap((person) =>
		getLocales().map((locale) => ({ locale, entityId: person.id })),
	);
}

export default async function PersonPage({ params }: PageProps) {
	const { locale, entityId } = await params;
	const typedLocale = locale as Locale;

	const [entity, bio, dict] = await Promise.all([
		getResolvedEntity(entityId, typedLocale),
		getEntityBio(entityId, typedLocale),
		getDictionary(typedLocale),
	]);

	if (!entity || entity.kind !== 'person') notFound();

	const portraitUrl = entity.portrait
		? await resolveAssetUrl(`source:${entity.portrait}`)
		: undefined;

	/* The cited records, resolved for their titles — the entity's research,
	 * the bibliography at the back of the biography. */
	const cited = (
		await Promise.all(
			entity.sources.map((id) => getResolvedSource(id, typedLocale)),
		)
	).filter((source) => source !== null);

	/* The portrait's own record — its title captions the photo, and its
	 * catalogue metadata rides the lightbox. It is always among the cited. */
	const portraitRecord = entity.portrait
		? cited.find((source) => source.id === entity.portrait)
		: undefined;

	/*
	 * The stories this person is in — the involvement edges inverted. Each
	 * links back to the story with the person's part under it: the in-story
	 * alias when one is authored ("The Big Boss"), the localized role
	 * otherwise.
	 */
	const stories = await Promise.all(
		(await getStoriesInvolving(entityId, typedLocale)).map(async (story) => ({
			...story,
			part: story.as
				? dictGet(await getStoryMessages(story.slug, typedLocale), story.as)
				: dictGet(dict, `people.roles.${story.role}`),
		})),
	);

	/*
	 * The articles about this person, authored on the entity as
	 * "storySlug/articleSlug" refs. Rows come from the story's contents tree —
	 * the same entries the story sidebar shows — so an article reads
	 * identically wherever it is listed: title, aside copy, byline.
	 */
	const articles: AsideRow[] = (
		await Promise.all(
			(entity.articles ?? []).map(async (ref) => {
				const [storySlug, articleSlug] = ref.split('/');
				const contents = await getStoryContents(storySlug, typedLocale);
				for (const entry of contents ?? []) {
					const children = entry.type === 'part' ? entry.children : [entry];
					for (const child of children) {
						if (
							child.type === 'page' &&
							child.ref === `articles/${articleSlug}`
						) {
							const row: AsideRow = {
								href: child.href,
								title: child.title,
								...(child.subtitle ? { subtitle: child.subtitle } : {}),
								...(child.author ? { author: child.author } : {}),
							};
							return row;
						}
					}
				}
				return null;
			}),
		)
	).filter((row) => row !== null);

	const dates = entity.dates;

	/* Facts under the name, not a job title: the recorded full name and the
	 * years — "Melvin Kornitzky, 1931–2018". */
	const years = [
		dates?.start?.match(/^\d{4}/)?.[0],
		dates?.end?.match(/^\d{4}/)?.[0],
	]
		.filter(Boolean)
		.join('–');

	return (
		<>
			<BreadcrumbBar>
				<Breadcrumbs
					items={[
						homeItemFromDict(dict),
						{ label: dictGet(dict, 'nav.people'), href: '/people' },
						{ label: entity.name },
					]}
				/>
			</BreadcrumbBar>
			<Container gap="lg">
				<div className={styles.identity}>
					<Text variant="h1">{entity.name}</Text>
					{(entity.fullName || years) && (
						<p className={styles.role}>
							{entity.fullName}
							{entity.fullName && years && ', '}
							{/* A span is a birth year in RTL too — bidi flips the
							 * range's reading order without an explicit direction. */}
							{years && <span dir="ltr">{years}</span>}
						</p>
					)}
				</div>
				<PageLayout
					sidebarLead={
						<div className={styles.meta}>
							{portraitUrl && (
								<figure className={styles.portrait}>
									<Image
										src={resolveMediaUrl(portraitUrl)}
										alt={portraitRecord?.title ?? entity.name}
										width={480}
										height={480}
										className={styles.portraitImage}
										data-zoomable
										data-source-id={entity.portrait}
										{...(portraitRecord?.author
											? { 'data-source-author': portraitRecord.author }
											: {})}
									/>
									{portraitRecord && (
										<figcaption className={styles.portraitCaption}>
											{/* The record's description, not its title — the same
											 * field the articles caption this image with, so one
											 * photograph reads identically wherever it appears. */}
											{portraitRecord.description ?? portraitRecord.title}
										</figcaption>
									)}
								</figure>
							)}
							<dl className={styles.metaList}>
								{dates?.start && (
									<div className={styles.metaRow}>
										<dt className={styles.metaLabel}>
											{dictGet(dict, 'people.born')}
										</dt>
										<dd className={styles.metaValue}>
											{formatSourceDate(dates.start, typedLocale)}
										</dd>
									</div>
								)}
								{dates?.end && (
									<div className={styles.metaRow}>
										<dt className={styles.metaLabel}>
											{dictGet(dict, 'people.died')}
										</dt>
										<dd className={styles.metaValue}>
											{formatSourceDate(dates.end, typedLocale)}
										</dd>
									</div>
								)}
							</dl>
						</div>
					}
					sidebar={
						<div className={styles.meta}>
							{stories.length > 0 && (
								<div className={styles.cited}>
									<p className={styles.metaLabel}>
										{dictGet(dict, 'people.stories')}
									</p>
									<ul className={styles.citedList}>
										{stories.map((story) => (
											<li key={story.slug}>
												<a
													href={`/stories/${story.slug}`}
													className={styles.citedLink}
												>
													{story.title}
												</a>
												{story.part && (
													<p className={styles.storyPart}>{story.part}</p>
												)}
											</li>
										))}
									</ul>
								</div>
							)}
							{articles.length > 0 && (
								<AsideList
									label={dictGet(dict, 'nav.articles')}
									rows={articles}
								/>
							)}
							{cited.length > 0 && (
								<div className={styles.cited}>
									<p className={styles.metaLabel}>
										{dictGet(dict, 'people.cited')}
									</p>
									<ul className={styles.citedList}>
										{cited.map((source) => {
											const year = source.date?.match(/^\d{4}/)?.[0];
											return (
												<li key={source.id}>
													<a
														href={`/sources/${source.id}`}
														className={styles.citedLink}
													>
														{source.title}
														{year && ` (${year})`}
													</a>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</div>
					}
				>
					{entity.description && (
						<p className={styles.description}>{entity.description}</p>
					)}
					{bio && <ContentRenderer hast={bio.hast} />}
					<ImageViewer />
				</PageLayout>
			</Container>
		</>
	);
}
