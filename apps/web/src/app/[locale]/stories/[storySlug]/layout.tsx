import {
	getResolvedEntity,
	getResolvedStorySources,
	getStoryConfig,
	getStoryContents,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';
import type { ResolvedContentsEntry } from '@mels-loop/content-loaders/types';
import { dictGet } from '@mels-loop/i18n/dict';
import { notFound } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

import { BreadcrumbBar } from '@/components/layout/BreadcrumbBar/BreadcrumbBar';
import { Asides, type StoryPerson } from '@/components/stories/Asides/Asides';
import { StoryBreadcrumbs } from '@/components/stories/StoryBreadcrumbs/StoryBreadcrumbs';
import { StoryHeader } from '@/components/stories/StoryHeader/StoryHeader';
import { StoryLayout } from '@/components/stories/StoryLayout/StoryLayout';
import {
	type StorySection,
	StorySections,
} from '@/components/stories/StorySections/StorySections';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { resolveMediaUrl } from '@/lib/media-url';

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ locale: string; storySlug: string }>;
}

/**
 * Build slug → title maps for breadcrumb resolution from resolved contents.
 * Walks the tree and extracts page entries with "section/slug" refs.
 */
function buildItemTitles(
	entries: ResolvedContentsEntry[],
): Record<string, Record<string, string>> {
	const result: Record<string, Record<string, string>> = {};
	for (const entry of entries) {
		if (entry.type === 'part') {
			for (const child of entry.children) {
				if (child.type === 'page' && child.ref.includes('/')) {
					const [section, slug] = child.ref.split('/');
					if (!result[section]) result[section] = {};
					result[section][slug] = child.title;
				}
			}
		} else if (entry.type === 'page' && entry.ref.includes('/')) {
			const [section, slug] = entry.ref.split('/');
			if (!result[section]) result[section] = {};
			result[section][slug] = entry.title;
		}
	}
	return result;
}

export default async function StorySlugLayout({
	children,
	params,
}: LayoutProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const dict = await getDictionary(typedLocale);

	const sectionLabels: Record<string, string> = {
		articles: dictGet(dict, 'nav.articles'),
		people: dictGet(dict, 'nav.people'),
		documents: dictGet(dict, 'nav.documents'),
		codex: dictGet(dict, 'nav.codex'),
		contents: dictGet(dict, 'nav.contents'),
		sources: dictGet(dict, 'nav.sources'),
	};

	/*
	 * An unknown slug is a missing page, not a broken server.
	 *
	 * The loaders read from disk and throw ENOENT, which surfaced as a 500 —
	 * for a typo, a stale link, or a story that has been parked. Crawlers read
	 * a 500 as "come back later" and keep the URL; 404 is the honest answer.
	 */
	const [config, storyMessages, contents, sources] = await Promise.all([
		getStoryConfig(storySlug),
		getStoryMessages(storySlug, typedLocale),
		getStoryContents(storySlug, typedLocale),
		getResolvedStorySources(storySlug, typedLocale),
	]).catch(notFound);

	const storyTitle = resolveStoryField(
		config.meta.title,
		typedLocale,
		storyMessages,
	);
	/* The story page wants a short standfirst; the homepage card keeps the
	 * fuller `abstract`. Falls back to abstract when no subtitle is set. */
	const storyAbstract = resolveStoryField(
		config.meta.subtitle ?? config.meta.abstract,
		typedLocale,
		storyMessages,
	);

	/*
	 * assets.cover is deliberately not read here. It stays in story.json for
	 * the homepage featured card, which shows it at full fidelity. Behind the
	 * story header it was a full-bleed background under a 90% scrim — a
	 * primary source (the 1907 SS Estonia manifest listing Mel's father and
	 * grandmother) reduced to unattributed, illegible texture. It is already
	 * presented properly, with title, author, date and credit, in the sources
	 * browser.
	 */
	/*
	 * Explicit avatar first — SOM keeps a dedicated crop framed for the
	 * circle. Absent that, the first person-kind `subject`'s portrait: the
	 * avatar is the protagonist's face, and the model now says whose.
	 */
	let avatarSrcUrl = config.assets?.avatar?.src
		? await resolveAssetUrl(config.assets.avatar.src)
		: undefined;
	if (!avatarSrcUrl) {
		for (const edge of config.entities ?? []) {
			if (edge.role !== 'subject') continue;
			const entity = await getResolvedEntity(edge.ref, typedLocale);
			if (entity?.kind === 'person' && entity.portrait) {
				avatarSrcUrl = await resolveAssetUrl(`source:${entity.portrait}`);
				break;
			}
		}
	}

	const homeLabel = dictGet(dict, 'nav.home');

	/*
	 * Sources are not in the contents tree, so the breadcrumb for one had
	 * nothing to look up and fell back to prettifying its slug — a Hebrew page
	 * showed "Story Of Mel Original Usenet" above the record's real title.
	 * Their titles are already resolved for this locale here.
	 */
	const itemTitles = {
		...(contents ? buildItemTitles(contents) : {}),
		sources: Object.fromEntries(sources.map((s) => [s.id, s.title])),
	};

	const basePath = `/stories/${storySlug}`;

	/*
	 * The story's people: person-kind involvement edges, resolved to names
	 * and portraits. The alias wins over the role — this text's name for
	 * someone ("The Big Boss") says more here than "Subject" does.
	 */
	const involved = (
		await Promise.all(
			(config.entities ?? []).map(async (edge) => {
				const entity = await getResolvedEntity(edge.ref, typedLocale);
				if (!entity || entity.kind !== 'person') return null;
				const avatarUrl = entity.portrait
					? await resolveAssetUrl(`source:${entity.portrait}`)
					: undefined;
				const person: StoryPerson = {
					href: `/people/${entity.id}`,
					name: entity.name,
					subtitle: edge.as
						? dictGet(storyMessages ?? {}, edge.as)
						: dictGet(dict, `people.roles.${edge.role}`),
					...(avatarUrl ? { avatarUrl: resolveMediaUrl(avatarUrl) } : {}),
				};
				return person;
			}),
		)
	).filter((person) => person !== null);

	// Derive dynamic section tabs from contents (articles, documents, etc.)
	const dynamicSectionCounts = new Map<string, number>();
	if (contents) {
		for (const entry of contents) {
			if (entry.type === 'part') {
				/* A part can hold content and still not warrant a tab — see
				 * PartEntry.tab. The appendix holds one document, which is a
				 * source we happen to have transcribed. */
				if (entry.tab === false) continue;
				for (const child of entry.children) {
					if (child.type === 'page' && child.ref.includes('/')) {
						const key = child.ref.split('/')[0];
						dynamicSectionCounts.set(
							key,
							(dynamicSectionCounts.get(key) ?? 0) + 1,
						);
					}
				}
			} else if (entry.type === 'page' && entry.ref.includes('/')) {
				const key = entry.ref.split('/')[0];
				dynamicSectionCounts.set(key, (dynamicSectionCounts.get(key) ?? 0) + 1);
			}
		}
	}

	// Fixed tabs: codex. Dynamic tabs from contents.
	const storySections: StorySection[] = [
		{
			key: 'codex',
			label: sectionLabels.codex,
			href: basePath,
		},
		...[...dynamicSectionCounts].map(([key, count]) => ({
			key,
			label: sectionLabels[key] ?? key,
			count,
			href: `${basePath}/${key}`,
		})),
		...(involved.length > 0 || (config.entities?.length ?? 0) > 0
			? [
					{
						/* The tab is the whole cast — organisations and machines
						 * included — while the sidebar's People group is persons
						 * only. Same word on both confused the counts apart. */
						key: 'people',
						label: dictGet(dict, 'nav.cast'),
						count: config.entities?.length ?? 0,
						href: `${basePath}/people`,
					},
				]
			: []),
		...(sources.length > 0
			? [
					{
						key: 'sources',
						label: sectionLabels.sources,
						count: sources.length,
						href: `${basePath}/sources`,
					},
				]
			: []),
	];

	return (
		<>
			<BreadcrumbBar>
				<StoryBreadcrumbs
					homeLabel={homeLabel}
					storyTitle={storyTitle}
					storySlug={storySlug}
					sectionLabels={sectionLabels}
					itemTitles={itemTitles}
				/>
			</BreadcrumbBar>
			<StoryHeader
				title={storyTitle}
				storySlug={storySlug}
				abstract={storyAbstract}
				avatarSrc={avatarSrcUrl ? resolveMediaUrl(avatarSrcUrl) : undefined}
				avatarAlt={
					config.assets?.avatar?.alt
						? resolveStoryField(
								config.assets.avatar.alt,
								typedLocale,
								storyMessages,
							)
						: undefined
				}
				avatarFallback={
					config.assets?.avatar?.initials
						? resolveStoryField(
								config.assets.avatar.initials,
								typedLocale,
								storyMessages,
							)
						: undefined
				}
			/>
			<Suspense>
				<StorySections sections={storySections} />
			</Suspense>
			<StoryLayout
				sidebar={
					contents && contents.length > 0 ? (
						<Asides
							contents={contents}
							people={{ label: dictGet(dict, 'nav.people'), people: involved }}
						/>
					) : undefined
				}
			>
				{children}
			</StoryLayout>
		</>
	);
}
