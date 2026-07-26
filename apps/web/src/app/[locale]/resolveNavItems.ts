import {
	getAllStories,
	getStoryConfig,
	getStoryMessages,
	resolveStoryField,
} from '@mels-loop/content-loaders/loaders';

import type { NavItem } from '@/components/layout';
import type { Locale } from '@/i18n-init';

import { navItems } from './config/nav';

export async function resolveNavItems(locale: Locale): Promise<NavItem[]> {
	const slugs = await getAllStories();
	const storiesWithMessages = await Promise.all(
		slugs.map(async (s) => {
			const [config, messages] = await Promise.all([
				getStoryConfig(s),
				getStoryMessages(s, locale),
			]);
			return { config, messages };
		}),
	);

	return navItems.map((item) => {
		if (!item.hasContent) return item;
		return {
			...item,
			stories: storiesWithMessages.map(({ config, messages }) => ({
				slug: config.slug,
				title: resolveStoryField(config.meta.title, locale, messages),
				abstract: resolveStoryField(config.meta.abstract, locale, messages),
			})),
		};
	});
}
