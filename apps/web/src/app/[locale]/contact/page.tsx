import { dictGet } from '@mels-loop/i18n/dict';
import { Text } from '@mels-loop/ui/primitives';

import { ContactForm } from '@/components/forms/ContactForm/ContactForm';
import { StaticPage } from '@/components/layout/StaticPage/StaticPage';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n-init';
import { homeItemFromDict } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const dict = await getDictionary(typedLocale);
	const navTitle = dictGet(dict, 'nav.contact');
	const subtitle = dictGet(dict, 'contact.pageSubtitle');
	const text = dictGet(dict, 'contact.pageText');

	return (
		<StaticPage
			title={subtitle}
			breadcrumbs={[homeItemFromDict(dict), { label: navTitle }]}
		>
			{text && <Text variant="body2">{text}</Text>}
			<ContactForm />
		</StaticPage>
	);
}
