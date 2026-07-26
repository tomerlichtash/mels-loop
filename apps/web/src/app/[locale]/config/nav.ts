import { getLocales } from '@mels-loop/i18n/config';

import type {
	FooterLinkColumn,
	LocaleOption,
	NavItem,
} from '@/components/layout';

export const navItems: NavItem[] = [
	{ key: 'stories', href: '/stories', hasContent: true },
];

export const footerLinks: FooterLinkColumn[] = [
	{
		titleKey: 'footer.pages',
		links: [
			{ label: 'nav.about', href: '/about' },
			{ label: 'nav.blog', href: '/posts' },
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
