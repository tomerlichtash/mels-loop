import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import { StaticPage } from '@/components/StaticPage/StaticPage';
import { ContactPage } from '@mels-loop/forms/ContactPage';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	const typedLocale = locale as Locale;

	const dict = await getDictionary(typedLocale);
	const title = dictGet(dict as Record<string, unknown>, 'nav.contact');

	return (
		<StaticPage
			title={title}
			breadcrumbs={[
				homeItem(locale, dictGet(dict as Record<string, unknown>, 'nav.home')),
				{ label: title },
			]}
		>
			<ContactPage locale={locale} />
		</StaticPage>
	);
}
