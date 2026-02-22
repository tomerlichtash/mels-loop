import { getPage } from '@mels-loop/content-pipeline/loaders';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';

import { StaticPage } from '@/components/StaticPage/StaticPage';
import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function ContributePage({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const [content, dict] = await Promise.all([
		getPage('contribute', typedLocale),
		getDictionary(typedLocale),
	]);

	const title = content?.metadata.title || dictGet(dict, 'nav.contribute');

	return (
		<StaticPage
			title={title}
			content={content}
			breadcrumbs={[homeItemFromDict(dict), { label: title }]}
		/>
	);
}
