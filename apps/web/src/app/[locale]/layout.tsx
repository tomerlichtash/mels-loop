import '@mels-loop/ui/styles/globals.css';
import '../../styles/layout.css';
import '../../styles/ml-palette.css';
import '../../styles/ml-light.css';
import '../../styles/ml-dark.css';
import '../../styles/utilities.css';
import '../../i18n-init';
import '../../content-init';

import { ClerkProvider } from '@clerk/nextjs';
import { I18nProvider } from '@mels-loop/i18n/client';
import {
	getDirection,
	getLocales,
	isValidLocale,
} from '@mels-loop/i18n/config';
import { ColorSchemeScript } from '@mels-loop/ui/color-scheme';
import { DirectionProvider } from '@mels-loop/ui/direction';
import { GoogleAnalytics } from '@next/third-parties/google';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { ImageViewer } from '@/components/content/ImageViewer/ImageViewer';
import { PageScrollbar } from '@/components/layout/PageScrollbar/PageScrollbar';
import { ScrollbarWidthScript } from '@/components/layout/ScrollbarWidthScript/ScrollbarWidthScript';
import { SearchableLayout } from '@/components/layout/SearchableLayout/SearchableLayout';
import { hebrew, lekton, robotoSlab } from '@/fonts';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

// import { FaviconAnimator } from '@/components/layout/FaviconAnimator/FaviconAnimator';
import { footerLinks, localeOptions, navItems } from './config/nav';

export { generateMetadata } from './config/metadata';

/**
 * Enumerating the locales here lets every child route prerender without
 * declaring its own params. Without it the whole tree is rendered per
 * request, re-reading markdown off disk on every hit.
 */
export function generateStaticParams() {
	return getLocales().map((locale) => ({ locale }));
}

/*
 * Dev-only, and absent from the production build entirely.
 *
 * The import() has to sit inside the dead branch, not merely be guarded at the
 * call site. A static import ships the module even when the element is
 * eliminated; next/dynamic alone still emits the chunk and links it from the
 * prerendered HTML, so production downloaded 27KB of a panel it would never
 * show. NODE_ENV is inlined at build time, so here the whole expression folds
 * away and the chunk is never emitted.
 */
const TypographyLab =
	process.env.NODE_ENV === 'development'
		? dynamic(() =>
				import('@/components/dev/TypographyLab/TypographyLab').then(
					(m) => m.TypographyLab,
				),
			)
		: () => null;

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
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

	const content = (
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
				<ScrollbarWidthScript />
			</head>
			<body
				className={`${robotoSlab.variable} ${hebrew.variable} ${lekton.variable}`}
			>
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
						{/* Dev only: drives the typography tokens live, so a setting
						    can be judged on the real pages in either locale. The
						    constant condition takes it out of the production bundle. */}
						{process.env.NODE_ENV === 'development' && <TypographyLab />}
						<SearchableLayout
							navItems={navItems}
							footerLinks={footerLinks}
							locales={localeOptions}
						>
							{/* <FaviconAnimator /> */}
							{children}
						</SearchableLayout>
					</I18nProvider>
				</DirectionProvider>
			</body>
		</html>
	);

	if (!clerkEnabled) return content;
	return <ClerkProvider>{content}</ClerkProvider>;
}
