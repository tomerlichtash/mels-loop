import type { ReactNode } from 'react';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import {
	getStoryConfig,
	getArticleMeta,
	getDocumentMeta,
} from '@mels-loop/content-pipeline/loaders';
import { Story } from './Story';
import { Asides } from './Asides';
import type { AsideSection } from './Asides';
import type { ArticleMeta } from '@mels-loop/content-pipeline/types';
import { dictGet } from '@/lib/breadcrumbs';

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ locale: string; storySlug: string }>;
}

const sectionDictKeys: Record<string, string> = {
	articles: 'nav.articles',
	documents: 'nav.documents',
	codex: 'nav.codex',
	resources: 'nav.resources',
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
		label: dictGet(
			dict as Record<string, unknown>,
			sectionDictKeys[section] ?? section,
		),
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
