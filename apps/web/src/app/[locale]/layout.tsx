import '@mels-loop/ui/styles/globals.css';
import '../../styles/layout.css';
import '../../styles/ml-palette.css';
import '../../styles/ml-light.css';
import '../../styles/ml-dark.css';
import '../../styles/utilities.css';
import '../../i18n-init';
import '../../content-init';

import {
	getAllStories,
	getStoryContents,
} from '@mels-loop/content-loaders/loaders';
import { I18nProvider } from '@mels-loop/i18n/client';
import {
	getDirection,
	getLocales,
	isValidLocale,
} from '@mels-loop/i18n/config';
import { ColorSchemeScript } from '@mels-loop/ui/color-scheme';
import { DirectionProvider } from '@mels-loop/ui/direction';
import { GoogleAnalytics } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { ImageViewer } from '@/components/content/ImageViewer/ImageViewer';
import { PageScrollbar } from '@/components/layout/PageScrollbar/PageScrollbar';
import { ScrollbarWidthScript } from '@/components/layout/ScrollbarWidthScript/ScrollbarWidthScript';
import { SiteLayout } from '@/components/layout/SiteLayout/SiteLayout';
import { hebrew, lekton, robotoSlab } from '@/fonts';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

import { buildNavItems, footerLinks, localeOptions } from './config/nav';

export { generateMetadata } from './config/metadata';

/**
 * Enumerating the locales here lets every child route prerender without
 * declaring its own params. Without it the whole tree is rendered per
 * request, re-reading markdown off disk on every hit.
 */
export function generateStaticParams() {
	return getLocales().map((locale) => ({ locale }));
}

const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export default async function Layout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!isValidLocale(locale)) notFound();

	const validLocale = locale as Locale;
	const dir = getDirection(validLocale);
	const messages = await getDictionary(validLocale);

	/*
	 * The drawer lists the story's articles by name, so its items are content
	 * rather than configuration and have to be resolved here — the titles are
	 * already localised and have no dictionary key.
	 *
	 * getAllStories()[0] rather than a hardcoded slug: the archive holds one
	 * story, and this asks which one instead of asserting it.
	 */
	const [storySlug] = await getAllStories();
	const contents = await getStoryContents(storySlug, validLocale);
	const articles = (contents ?? []).flatMap((entry) =>
		entry.type === 'part'
			? entry.children.flatMap((child) =>
					child.type === 'page' && child.ref.startsWith('articles/')
						? [
								{
									slug: child.ref.split('/')[1],
									title: child.title,
									author: child.author,
								},
							]
						: [],
				)
			: [],
	);
	const navItems = buildNavItems(storySlug, articles);

	const content = (
		/*
		 * The font variables belong on <html>, not <body>: the design tokens
		 * that read them are declared at :root, and custom properties inherit
		 * downwards only. Set on <body> they were invisible to :root, so every
		 * token fell through to its literal-name fallback and lost next/font's
		 * metric-matched fallback face with it.
		 */
		<html
			lang={locale}
			dir={dir}
			className={`${robotoSlab.variable} ${hebrew.variable} ${lekton.variable}`}
			suppressHydrationWarning
		>
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
				<ScrollbarWidthScript />
			</head>
			<body>
				{gaId && <GoogleAnalytics gaId={gaId} />}
				<PageScrollbar />
				{/* Radix reads the direction from context, not from the document,
				    and defaults to ltr — including for content it portals out of
				    the tree. Without this a popover or menu on a Hebrew page laid
				    itself out left-to-right. */}
				<DirectionProvider dir={dir}>
					<I18nProvider locale={locale} messages={messages}>
						{/* One per page: it builds a gallery from every zoomable image
						    on the page at the moment one is clicked. */}
						<ImageViewer />
						<SiteLayout
							navItems={navItems}
							footerLinks={footerLinks}
							locales={localeOptions}
						>
							{children}
						</SiteLayout>
					</I18nProvider>
				</DirectionProvider>
			</body>
		</html>
	);

	return content;
}
