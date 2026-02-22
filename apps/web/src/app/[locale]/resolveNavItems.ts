import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import { type Locale } from '@mels-loop/i18n/config';
import type { NavItem } from '@mels-loop/ui/layout';

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
