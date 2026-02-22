import { locales as localeCodes } from '@mels-loop/i18n/config';
import type {
	NavItem,
	FooterLinkColumn,
	LocaleOption,
} from '@mels-loop/ui/layout';

export const navItems: NavItem[] = [
	{ key: 'stories', href: '/stories', hasContent: true },
	{ key: 'nav.about', href: '/about' },
	{ key: 'nav.contact', href: '/contact' },
];

export const footerLinks: FooterLinkColumn[] = [
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
];

export const localeOptions: LocaleOption[] = localeCodes.map((code) => ({
	code,
	labelKey: `locale.label.${code}`,
	switchToKey: `locale.switchTo.${code}`,
}));
