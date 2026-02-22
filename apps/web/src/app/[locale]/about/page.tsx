import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@/i18n';
import { getPage } from '@mels-loop/content-pipeline/loaders';
import { StaticPage } from '@/components/StaticPage/StaticPage';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [content, dict] = await Promise.all([
		getPage('about', typedLocale),
		getDictionary(typedLocale),
	]);

	const title =
		content?.metadata.title ||
		dictGet(dict as Record<string, unknown>, 'nav.about');

	return (
		<StaticPage
			title={title}
			content={content}
			breadcrumbs={[
				homeItem(locale, dictGet(dict as Record<string, unknown>, 'nav.home')),
				{ label: title },
			]}
		/>
	);
}
