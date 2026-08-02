import { getLocales } from '@mels-loop/i18n/config';

import type {
	FooterLinkColumn,
	LocaleOption,
	NavItem,
} from '@/components/layout';

/**
 * The whole site is one story, so the drawer navigates *within* it.
 *
 * It lists the articles by name rather than offering an "Articles" link. The
 * tab strip already does that, and a drawer that repeats the tabs is a second
 * copy of the same three choices — on a phone, where the drawer is the only
 * navigation, the useful thing is the destination itself.
 *
 * No "Stories" entry: it would lead to an index of the page you are already
 * on. It returns with the second story, along with the homepage.
 *
 * The slug is a parameter rather than a constant so this survives the archive
 * growing — but the shape will not. With two stories, per-article entries stop
 * making sense here and this goes back to being a list of stories.
 */
export function buildNavItems(
	storySlug: string,
	articles: { slug: string; title: string; author?: string }[],
): NavItem[] {
	const story = `/stories/${storySlug}`;
	return [
		...articles.map((article) => ({
			key: `article:${article.slug}`,
			href: `${story}/articles/${article.slug}`,
			label: article.title,
			author: article.author,
		})),
		{ key: 'nav.sources', href: `${story}/sources` },
		{ key: 'nav.people', href: '/people' },
		{ key: 'nav.about', href: '/about' },
		{ key: 'nav.contact', href: '/contact' },
	];
}

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
