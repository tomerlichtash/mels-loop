import {
	getArticleMeta,
	getDocumentMeta,
	getStoryConfig,
} from '@mels-loop/content-loaders/loaders';
import type { ArticleMeta } from '@mels-loop/content-loaders/types';
import { dictGet } from '@mels-loop/i18n/dict';
import type { ReactNode } from 'react';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

import { Asides, type AsideSection } from './Asides';
import { Story } from './Story';

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ locale: string; storySlug: string }>;
}

const sectionDictKeys: Record<string, string> = {
	articles: 'nav.articles',
	documents: 'nav.documents',
	codex: 'nav.codex',
	resources: 'nav.resources',
	sources: 'nav.sources',
};

export default async function StorySlugLayout({
	children,
	params,
}: LayoutProps) {
	const { locale, storySlug } = await params;
	const typedLocale = locale as Locale;

	const [config, articlesMeta, documentsMeta, dict] = await Promise.all([
		getStoryConfig(storySlug),
		getArticleMeta(storySlug, typedLocale),
		getDocumentMeta(storySlug, typedLocale),
		getDictionary(typedLocale),
	]);

	const metaBySection: Record<string, ArticleMeta[]> = {
		articles: articlesMeta,
		documents: documentsMeta,
	};

	const sections: AsideSection[] = config.sections.map((section) => ({
		key: section,
		label: dictGet(dict, sectionDictKeys[section] ?? section),
		href: `/stories/${storySlug}/${section}`,
		items: (metaBySection[section] ?? []).map((item) => ({
			slug: item.slug,
			title: item.title,
			href: `/stories/${storySlug}/${section}/${item.slug}`,
			author: item.author,
		})),
	}));

	return <Story sidebar={<Asides sections={sections} />}>{children}</Story>;
}
