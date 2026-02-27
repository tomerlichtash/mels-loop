import '@mels-loop/ui/styles/globals.css';
import '../../content-init';

import { I18nProvider } from '@mels-loop/i18n/client';
import { getDirection, isValidLocale } from '@mels-loop/i18n/config';
import { ColorSchemeScript } from '@mels-loop/ui/color-scheme';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { SearchableLayout } from '@/components/SearchableLayout';
import { assistant, lekton, robotoSlab } from '@/fonts';
import { getDictionary } from '@/i18n';

// import { FaviconAnimator } from '@/components/FaviconAnimator';
import { footerLinks, localeOptions } from './config/nav';
import { resolveNavItems } from './resolveNavItems';

export { generateMetadata } from './config/metadata';

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
	const navItems = await resolveNavItems(locale);

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
			<body
				className={`${robotoSlab.variable} ${assistant.variable} ${lekton.variable}`}
			>
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
}
