import { getLocales } from '@mels-loop/i18n/config';

import type {
	FooterLinkColumn,
	LocaleOption,
	NavItem,
} from '@/components/layout';

/*
 * Empty while the archive holds one story, which is the site's front page —
 * a "Stories" link would lead to an index of the page you are already on.
 * The stories index still exists and comes back with the second story.
 */
export const navItems: NavItem[] = [];

export const footerLinks: FooterLinkColumn[] = [
	{
		titleKey: 'footer.pages',
		links: [
			{ label: 'nav.about', href: '/about' },
			/*
			 * No Blog link. The posts predate the rewrite and the blog wants
			 * rethinking, so they are unlinked rather than removed — their URLs
			 * are live on the current site and keep working.
			 */
			{ label: 'nav.contribute', href: '/contribute' },
		],
	},
	{
		titleKey: 'footer.links',
		links: [
			{
				label: 'menuItems.github',
				href: 'https://github.com/mels-loop',
				external: true,
			},
			{
				label: 'menuItems.twitter',
				href: 'https://x.com/aboutmelsloop',
				external: true,
			},
			{ label: 'nav.contact', href: '/contact' },
		],
	},
];

export const localeOptions: LocaleOption[] = getLocales().map((code) => ({
	code,
	labelKey: `locale.label.${code}`,
	switchToKey: `locale.switchTo.${code}`,
}));
