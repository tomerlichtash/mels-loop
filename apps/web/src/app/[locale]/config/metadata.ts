import type { Metadata } from 'next';
import { type Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';

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
