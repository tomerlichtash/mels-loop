import {
	getArticleMeta,
	getCodex,
	getDocumentMeta,
	getStoryConfig,
} from '@mels-loop/content-loaders/loaders';
import type { ArticleMeta } from '@mels-loop/content-loaders/types';
import { dictGet } from '@mels-loop/i18n/dict';
import type { ReactNode } from 'react';

import { Asides, type AsideSection } from '@/components/stories/Asides/Asides';
import { StoryBreadcrumbs } from '@/components/stories/StoryBreadcrumbs/StoryBreadcrumbs';
import { StoryHeader } from '@/components/stories/StoryHeader/StoryHeader';
import { StoryLayout } from '@/components/stories/StoryLayout/StoryLayout';
import {
	StoryMeta,
	type StoryStat,
} from '@/components/stories/StoryMeta/StoryMeta';
import { StoryPanel } from '@/components/stories/StoryPanel/StoryPanel';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ locale: string; storySlug: string }>;
}

const sectionDictKeys: Record<string, string> = {
	articles: 'nav.articles',
	documents: 'nav.documents',
	codex: 'nav.codex',
	sources: 'nav.sources',
};

export default async function StorySlugLayout({
	children,
	params,
}: LayoutProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [config, content, articlesMeta, documentsMeta, dict] =
		await Promise.all([
			getStoryConfig(storySlug),
			getCodex(storySlug, typedLocale),
			getArticleMeta(storySlug, typedLocale),
			getDocumentMeta(storySlug, typedLocale),
			getDictionary(typedLocale),
		]);

	const storyTitle = content?.metadata.title || config.title[typedLocale];
	const storyAbstract = config.abstract[typedLocale];

	const metaBySection: Record<string, ArticleMeta[]> = {
		articles: articlesMeta,
		documents: documentsMeta,
	};

	// Replace "codex" with the story title as the link back to the main text
	const sections: AsideSection[] = config.sections.map((section) => ({
		key: section,
		label:
			section === 'codex'
				? storyTitle
				: dictGet(dict, sectionDictKeys[section] ?? section),
		href: `/stories/${storySlug}${section === 'codex' ? '' : `/${section}`}`,
		items: (metaBySection[section] ?? []).map((item) => ({
			slug: item.slug,
			title: item.title,
			href: `/stories/${storySlug}/${section}/${item.slug}`,
			author: item.author,
		})),
	}));

	const homeLabel = dictGet(dict, 'nav.home');
	const storiesLabel = dictGet(dict, 'stories');

	const sectionLabels: Record<string, string> = {};
	for (const [key, dictKey] of Object.entries(sectionDictKeys)) {
		sectionLabels[key] = dictGet(dict, dictKey);
	}

	// Build slug → title maps for breadcrumb resolution
	const itemTitles: Record<string, Record<string, string>> = {};
	for (const [section, metas] of Object.entries(metaBySection)) {
		itemTitles[section] = {};
		for (const item of metas) {
			itemTitles[section][item.slug] = item.title;
		}
	}

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
				avatarSrc={config.avatar?.src}
				avatarAlt={config.avatar?.alt[typedLocale]}
				avatarFallback={config.avatar?.initials?.[typedLocale]}
			/>
			<StoryMeta
				storySlug={storySlug}
				stats={
					[
						articlesMeta.length > 0 && {
							icon: 'articles' as const,
							label: sectionLabels.articles,
							count: articlesMeta.length,
							href: `/stories/${storySlug}/articles`,
						},
						documentsMeta.length > 0 && {
							icon: 'documents' as const,
							label: sectionLabels.documents,
							count: documentsMeta.length,
							href: `/stories/${storySlug}/documents`,
						},
						(config.sources?.length ?? 0) > 0 && {
							icon: 'sources' as const,
							label: sectionLabels.sources,
							count: config.sources!.length,
							href: `/stories/${storySlug}/sources`,
						},
					].filter(Boolean) as StoryStat[]
				}
			/>
			<StoryLayout sidebar={<Asides sections={sections} />}>
				{children}
			</StoryLayout>
		</>
	);
}
