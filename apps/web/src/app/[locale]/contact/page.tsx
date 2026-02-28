import type { Locale } from '@mels-loop/i18n/config';
import { dictGet } from '@mels-loop/i18n/dict';
import { Text } from '@mels-loop/ui/primitives';

import { ContactForm } from '@/components/ContactForm/ContactForm';
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
	const subtitle = dictGet(dict, 'contact.pageSubtitle');
	const text = dictGet(dict, 'contact.pageText');

	return (
		<StaticPage
			title={title}
			breadcrumbs={[homeItemFromDict(dict), { label: title }]}
		>
			{subtitle && <Text color="muted">{subtitle}</Text>}
			{text && <Text variant="body2">{text}</Text>}
			<ContactForm />
		</StaticPage>
	);
}
