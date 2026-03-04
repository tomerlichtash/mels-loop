import '@mels-loop/ui/styles/globals.css';
import '../../i18n-init';
import '../../content-init';

import { ClerkProvider } from '@clerk/nextjs';
import { I18nProvider } from '@mels-loop/i18n/client';
import { getDirection, isValidLocale } from '@mels-loop/i18n/config';
import { ColorSchemeScript } from '@mels-loop/ui/color-scheme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { assistant, lekton, robotoSlab } from '@/fonts';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { SearchableLayout } from '@/layout/SearchableLayout/SearchableLayout';

// import { FaviconAnimator } from '@/layout/FaviconAnimator/FaviconAnimator';
import { footerLinks, localeOptions } from './config/nav';
import { resolveNavItems } from './resolveNavItems';

export { generateMetadata } from './config/metadata';

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
	const navItems = await resolveNavItems(validLocale);

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
			</head>
			<body
				className={`${robotoSlab.variable} ${assistant.variable} ${lekton.variable}`}
			>
				{gaId && <GoogleAnalytics gaId={gaId} />}
				<I18nProvider locale={locale} messages={messages}>
					<SearchableLayout
						navItems={navItems}
						footerLinks={footerLinks}
						locales={localeOptions}
					>
						{/* <FaviconAnimator /> */}
						{children}
					</SearchableLayout>
				</I18nProvider>
			</body>
		</html>
	);

	if (!clerkEnabled) return content;
	return <ClerkProvider>{content}</ClerkProvider>;
}
