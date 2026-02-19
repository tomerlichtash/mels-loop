import { createLocaleLayout } from '@mels-loop/ui/layout';
import {
	getAllStories,
	getStoryConfig,
} from '@mels-loop/content-pipeline/loaders';
import type { NavItem } from '@mels-loop/ui/shell';
import type { Locale } from '@mels-loop/i18n/config';
import '../../content-init';

const { Layout, generateMetadata } = createLocaleLayout({
	navItems: [
		{ key: 'stories', href: '/stories', hasContent: true },
		{ key: 'nav.about', href: '/about' },
		{ key: 'nav.contact', href: '/contact' },
	],
	async resolveNavItems(navItems: NavItem[], locale: Locale) {
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
	},
	footerLinks: [
		{
			titleKey: 'footer.pages',
			links: [
				{ label: 'nav.about', href: '/about', icon: 'info' },
				{
					label: 'nav.blog',
					href: 'https://blog.melsloop.com',
					external: true,
					icon: 'reader',
				},
				{ label: 'nav.contribute', href: '/contribute', icon: 'heart' },
			],
		},
		{
			titleKey: 'footer.links',
			links: [
				{
					label: 'menuItems.github',
					href: 'https://github.com/mels-loop',
					external: true,
					icon: 'github',
				},
				{
					label: 'menuItems.twitter',
					href: 'https://x.com/aboutmelsloop',
					external: true,
					icon: 'twitter',
				},
				{ label: 'nav.contact', href: '/contact', icon: 'envelope' },
			],
		},
	],
});

export { generateMetadata };
export default Layout;
