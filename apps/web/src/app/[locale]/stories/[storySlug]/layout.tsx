import {
	getResolvedStorySources,
	getStoryConfig,
	getStoryContents,
	getStoryMessages,
	resolveAssetUrl,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';
import type {
	ResolvedContentsEntry,
	SourceType,
} from '@mels-loop/content-loaders/types';
import { dictGet } from '@mels-loop/i18n/dict';
import { type ReactNode, Suspense } from 'react';

import { Asides } from '@/components/stories/Asides/Asides';
import { SourcesSummary } from '@/components/stories/SourcesSummary/SourcesSummary';
import { StoryBreadcrumbs } from '@/components/stories/StoryBreadcrumbs/StoryBreadcrumbs';
import { StoryHeader } from '@/components/stories/StoryHeader/StoryHeader';
import { StoryLayout } from '@/components/stories/StoryLayout/StoryLayout';
import { StoryPanel } from '@/components/stories/StoryPanel/StoryPanel';
import {
	type SourceFilterConfig,
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
		documents: dictGet(dict, 'nav.documents'),
		codex: dictGet(dict, 'nav.codex'),
		contents: dictGet(dict, 'nav.contents'),
		sources: dictGet(dict, 'nav.sources'),
	};

	const [config, storyMessages, contents, sources] = await Promise.all([
		getStoryConfig(storySlug),
		getStoryMessages(storySlug, typedLocale),
		getStoryContents(storySlug, typedLocale),
		getResolvedStorySources(storySlug, typedLocale),
	]);

	const storyTitle = resolveStoryField(
		config.meta.title,
		typedLocale,
		storyMessages,
	);
	const storyAbstract = resolveStoryField(
		config.meta.abstract,
		typedLocale,
		storyMessages,
	);

	const [coverUrl, avatarSrcUrl] = await Promise.all([
		config.assets?.cover ? resolveAssetUrl(config.assets.cover) : undefined,
		config.assets?.avatar?.src
			? resolveAssetUrl(config.assets.avatar.src)
			: undefined,
	]);

	const homeLabel = dictGet(dict, 'nav.home');
	const storiesLabel = dictGet(dict, 'stories');

	const itemTitles = contents ? buildItemTitles(contents) : {};

	const sourceTypeOrder: SourceType[] = [
		'image',
		'pdf',
		'audio',
		'video',
		'link',
		'text',
		'archive',
		'other',
	];

	const existingTypes = new Set(sources.map((s) => s.type));

	const sourceFilters: SourceFilterConfig | undefined =
		sources.length > 0
			? {
					allLabel: dictGet(dict, 'sources.all'),
					types: sourceTypeOrder
						.filter((t) => existingTypes.has(t))
						.map((t) => ({
							value: t,
							label: dictGet(dict, `sources.${t}`),
						})),
					searchPlaceholder: dictGet(dict, 'sources.filterPlaceholder'),
					filterLabel: dictGet(dict, 'sources.toggleFilters'),
					filterByLabel: dictGet(dict, 'sources.filterBy'),
					clearLabel: dictGet(dict, 'sources.clearFilters'),
				}
			: undefined;

	const basePath = `/stories/${storySlug}`;

	// Derive dynamic section tabs from contents (articles, documents, etc.)
	const dynamicSectionCounts = new Map<string, number>();
	if (contents) {
		for (const entry of contents) {
			if (entry.type === 'part') {
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

	// Fixed tabs: codex. Dynamic tabs from contents. Sources last.
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
			<StoryPanel>
				<StoryBreadcrumbs
					homeLabel={homeLabel}
					storiesLabel={storiesLabel}
					storyTitle={storyTitle}
					storySlug={storySlug}
					sectionLabels={sectionLabels}
					itemTitles={itemTitles}
				/>
			</StoryPanel>
			<StoryHeader
				title={storyTitle}
				storySlug={storySlug}
				abstract={storyAbstract}
				cover={coverUrl ? resolveMediaUrl(coverUrl) : undefined}
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
				<StorySections sections={storySections} sourceFilters={sourceFilters} />
			</Suspense>
			<StoryLayout
				sidebar={(() => {
					const sourcesSummary =
						sources.length > 0
							? sourceTypeOrder
									.filter((t) => existingTypes.has(t))
									.map((t) => ({
										label: dictGet(dict, `sources.${t}`),
										count: sources.filter((s) => s.type === t).length,
									}))
							: [];
					const hasContents = contents && contents.length > 0;
					const hasSources = sourcesSummary.length > 0;

					if (!hasContents && !hasSources) return undefined;

					return (
						<>
							{hasContents && (
								<Asides
									contents={contents}
									title={sectionLabels.contents}
									titleHref={`${basePath}/contents`}
								/>
							)}
							{hasSources && (
								<SourcesSummary
									label={sectionLabels.sources}
									items={sourcesSummary}
									href={`${basePath}/sources`}
								/>
							)}
						</>
					);
				})()}
			>
				{children}
			</StoryLayout>
		</>
	);
}
