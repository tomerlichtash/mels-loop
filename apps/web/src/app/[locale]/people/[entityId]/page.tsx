import {
	getAllResolvedEntities,
	getEntityBio,
	getResolvedEntity,
	getResolvedSource,
	resolveAssetUrl,
} from '@mels-loop/content-loaders/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Breadcrumbs, Container, Text } from '@mels-loop/ui/primitives';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { PageLayout } from '@/components/layout/PageLayout/PageLayout';
import { ContentRenderer } from '@/content';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';
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

	const related = (
		await Promise.all(
			(entity.related ?? []).map(async (edge) => ({
				edge,
				entity: await getResolvedEntity(edge.ref, typedLocale),
			})),
		)
	).filter(({ entity: e }) => e !== null);

	const dates = entity.dates;

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
					{entity.role && <p className={styles.role}>{entity.role}</p>}
				</div>
				<PageLayout
					sidebar={
						<div className={styles.meta}>
							<dl className={styles.metaList}>
								{dates?.start && (
									<div className={styles.metaRow}>
										<dt className={styles.metaLabel}>
											{dictGet(dict, 'people.born')}
										</dt>
										<dd className={styles.metaValue}>{dates.start}</dd>
									</div>
								)}
								{dates?.end && (
									<div className={styles.metaRow}>
										<dt className={styles.metaLabel}>
											{dictGet(dict, 'people.died')}
										</dt>
										<dd className={styles.metaValue}>{dates.end}</dd>
									</div>
								)}
								{related.length > 0 && (
									<div className={styles.metaRow}>
										<dt className={styles.metaLabel}>
											{dictGet(dict, 'people.related')}
										</dt>
										<dd className={styles.metaValue}>
											{related.map(({ entity: e }) => e!.name).join(' · ')}
										</dd>
									</div>
								)}
							</dl>
							{cited.length > 0 && (
								<div className={styles.cited}>
									<p className={styles.metaLabel}>
										{dictGet(dict, 'people.cited')}
									</p>
									<ul className={styles.citedList}>
										{cited.map((source) => (
											<li key={source.id}>
												<a
													href={`/sources/${source.id}`}
													className={styles.citedLink}
												>
													{source.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					}
				>
					{portraitUrl && (
						<figure className={styles.portrait}>
							<Image
								src={resolveMediaUrl(portraitUrl)}
								alt={entity.name}
								width={480}
								height={480}
								className={styles.portraitImage}
							/>
						</figure>
					)}
					{entity.summary && <p className={styles.summary}>{entity.summary}</p>}
					{entity.description && (
						<p className={styles.description}>{entity.description}</p>
					)}
					{bio && <ContentRenderer hast={bio.hast} />}
				</PageLayout>
			</Container>
		</>
	);
}
