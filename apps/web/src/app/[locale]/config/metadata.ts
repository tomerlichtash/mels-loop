import type { Metadata } from 'next';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const siteTitle = String(dict.siteTitle ?? "Mel's Loop");
	const description = String(
		dict.siteSubtitle ?? 'A Comprehensive Guide to The Story of Mel',
	);

	return {
		title: { default: siteTitle, template: `%s | ${siteTitle}` },
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
