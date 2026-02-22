import { ContactPage } from '@mels-loop/forms/ContactPage';
import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';

import { StaticPage } from '@/components/StaticPage/StaticPage';
import { getDictionary } from '@/i18n';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const dict = await getDictionary(typedLocale);
	const title = dictGet(dict, 'nav.contact');

	return (
		<StaticPage
			title={title}
			breadcrumbs={[homeItemFromDict(dict), { label: title }]}
		>
			<ContactPage
				subtitle={dictGet(dict, 'contact.pageSubtitle')}
				text={dictGet(dict, 'contact.pageText')}
			/>
		</StaticPage>
	);
}
