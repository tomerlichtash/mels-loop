import {
	getAllStories,
	getResolvedEntity,
	getStoryConfig,
	getStoryMessages,
	resolveAssetUrl,
} from '@mels-loop/content-loaders/loaders';
import type {
	EntityKind,
	ResolvedEntity,
	StoryEntityRef,
} from '@mels-loop/content-loaders/types';
import { getLocales } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Avatar, Container } from '@mels-loop/ui/primitives';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { resolveMediaUrl } from '@/lib/media-url';

import styles from './page.module.css';

interface PageProps {
	params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
	const stories = await getAllStories();
	return stories.flatMap((storySlug) =>
		getLocales().map((locale) => ({ locale, storySlug })),
	);
}

const KIND_ORDER: EntityKind[] = [
	'person',
	'organisation',
	'machine',
	'object',
	'place',
];

interface InvolvedRow {
	edge: StoryEntityRef;
	entity: ResolvedEntity;
	avatarUrl?: string;
}

/**
 * The story's full involved list — every involvement edge, grouped by kind.
 * The sidebar strip shows the people compactly; this tab is the whole cast:
 * organisations and machines included, each with its role in this story.
 */
export default async function StoryPeoplePage({ params }: PageProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [config, storyMessages, dict] = await Promise.all([
		getStoryConfig(storySlug),
		getStoryMessages(storySlug, typedLocale),
		getDictionary(typedLocale),
	]).catch(notFound);

	const edges = config.entities ?? [];
	if (edges.length === 0) notFound();

	const rows = (
		await Promise.all(
			edges.map(async (edge) => {
				const entity = await getResolvedEntity(edge.ref, typedLocale);
				if (!entity) return null;
				const avatarUrl = entity.portrait
					? await resolveAssetUrl(`source:${entity.portrait}`)
					: undefined;
				const row: InvolvedRow = {
					edge,
					entity,
					...(avatarUrl ? { avatarUrl: resolveMediaUrl(avatarUrl) } : {}),
				};
				return row;
			}),
		)
	).filter((row) => row !== null);

	const groups = KIND_ORDER.map((kind) => ({
		kind,
		label: dictGet(dict, `people.kinds.${kind}`),
		rows: rows.filter((row) => row.entity.kind === kind),
	})).filter((group) => group.rows.length > 0);

	return (
		<Container gap="lg">
			{groups.map((group) => (
				<section key={group.kind} className={styles.group}>
					<h2 className={styles.groupLabel}>{group.label}</h2>
					<ul className={styles.list}>
						{group.rows.map(({ edge, entity, avatarUrl }) => {
							const subtitle = edge.as
								? dictGet(storyMessages ?? {}, edge.as)
								: dictGet(dict, `people.roles.${edge.role}`);
							const body = (
								<>
									<Avatar
										size="md"
										alt=""
										fallback={entity.name
											.split(' ')
											.map((part) => part[0])
											.slice(0, 2)
											.join('')}
										image={
											avatarUrl ? (
												<Image
													src={avatarUrl}
													alt=""
													width={96}
													height={96}
													className={styles.avatarImage}
												/>
											) : undefined
										}
									/>
									<span className={styles.text}>
										<span className={styles.name}>{entity.name}</span>
										<span className={styles.subtitle}>{subtitle}</span>
										{entity.summary && (
											<span className={styles.summary}>{entity.summary}</span>
										)}
									</span>
								</>
							);
							return (
								<li key={entity.id}>
									{entity.kind === 'person' ? (
										<a href={`/people/${entity.id}`} className={styles.row}>
											{body}
										</a>
									) : (
										<div className={styles.row}>{body}</div>
									)}
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</Container>
	);
}
