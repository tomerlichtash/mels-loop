import '@mels-loop/ui/styles/globals.css';
import '../../content-init';

import { I18nProvider } from '@mels-loop/i18n/client';
import {
	getDirection,
	isValidLocale,
	type Locale,
	locales as localeCodes,
} from '@mels-loop/i18n/config';
import { ColorSchemeScript } from '@mels-loop/ui/color-scheme';
import { assistant, robotoSlab } from '@mels-loop/ui/fonts';
import {
	type FooterLinkColumn,
	type LocaleOption,
	type NavItem,
	SiteLayout,
} from '@mels-loop/ui/layout';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { getDictionary } from '@/i18n';

const navItems: NavItem[] = [
	{ key: 'nav.home', href: '' },
	{ key: 'nav.blog', href: '/posts' },
	{ key: 'nav.glossary', href: 'https://melsloop.com/glossary' },
	{ key: 'nav.about', href: 'https://melsloop.com/about' },
	{ key: 'nav.contact', href: '/contact' },
];

const footerLinks: FooterLinkColumn[] = [
	{
		titleKey: 'footer.pages',
		links: [
			{
				label: 'nav.about',
				href: 'https://melsloop.com/about',
				external: true,
				icon: 'info',
			},
			{ label: 'nav.blog', href: '/posts', icon: 'reader' },
			{
				label: 'nav.contribute',
				href: 'https://melsloop.com/contribute',
				external: true,
				icon: 'heart',
			},
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

const localeOptions: LocaleOption[] = localeCodes.map((code) => ({
	code,
	labelKey: `locale.label.${code}`,
	switchToKey: `locale.switchTo.${code}`,
}));

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const siteTitle = String(
		(dict as Record<string, unknown>).siteTitle ?? "Mel's Loop",
	);
	const description = String(
		(dict as Record<string, unknown>).siteSubtitle ??
			'A Comprehensive Guide to The Story of Mel',
	);
	const blogTitle = `Blog | ${siteTitle}`;

	return {
		title: { default: blogTitle, template: `%s | Blog | ${siteTitle}` },
		description,
		openGraph: {
			title: siteTitle,
			description,
			siteName: siteTitle,
			locale: locale === 'he' ? 'he_IL' : 'en_US',
			type: 'website',
		},
	};
}

export default async function Layout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!isValidLocale(locale)) notFound();

	const dir = getDirection(locale);
	const messages = await getDictionary(locale);

	return (
		<html lang={locale} dir={dir} suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					href="/favicon-light.png"
					media="(prefers-color-scheme: light)"
				/>
				<link
					rel="icon"
					href="/favicon-dark.png"
					media="(prefers-color-scheme: dark)"
				/>
				<ColorSchemeScript />
			</head>
			<body className={`${robotoSlab.variable} ${assistant.variable}`}>
				<I18nProvider locale={locale} messages={messages}>
					<SiteLayout
						navItems={navItems}
						footerLinks={footerLinks}
						locales={localeOptions}
					>
						{children}
					</SiteLayout>
				</I18nProvider>
			</body>
		</html>
	);
}
