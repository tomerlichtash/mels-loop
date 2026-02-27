import { locales as localeCodes } from '@mels-loop/i18n/config';

import type { FooterLinkColumn, LocaleOption, NavItem } from '@/layout';

export const navItems: NavItem[] = [
	{ key: 'stories', href: '/stories', hasContent: true },
	{ key: 'nav.sources', href: '/sources' },
];

export const footerLinks: FooterLinkColumn[] = [
	{
		titleKey: 'footer.pages',
		links: [
			{ label: 'nav.about', href: '/about', icon: 'info' },
			{ label: 'nav.blog', href: '/posts', icon: 'reader' },
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
];

export const localeOptions: LocaleOption[] = localeCodes.map((code) => ({
	code,
	labelKey: `locale.label.${code}`,
	switchToKey: `locale.switchTo.${code}`,
}));
