import { getAllStories, getStoryConfig } from '@mels-loop/content/loaders';

import type { Locale } from '@/i18n-init';
import type { NavItem } from '@/layout';

import { navItems } from './config/nav';

export async function resolveNavItems(locale: Locale): Promise<NavItem[]> {
	const slugs = await getAllStories();
	const configs = await Promise.all(slugs.map((s) => getStoryConfig(s)));

	return navItems.map((item) => {
		if (!item.hasContent) return item;
		return {
			...item,
			stories: configs.map((c) => ({
				slug: c.slug,
				title: c.title[locale],
				abstract: c.abstract[locale],
				featured: c.featured,
				...(c.featured ? { image: '/assets/featured-story-of-mel.svg' } : {}),
			})),
		};
	});
}
