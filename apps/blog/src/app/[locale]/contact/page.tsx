import { Container, Heading, Stack } from '@mels-loop/ui/primitives';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import { ContactPage } from '@mels-loop/forms/ContactPage';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);

	const title =
		typeof dict === 'object' &&
		dict !== null &&
		'contact' in dict &&
		typeof dict.contact === 'object' &&
		dict.contact !== null &&
		'pageTitle' in dict.contact
			? String(dict.contact.pageTitle)
			: 'Contact';

	return (
		<Container>
			<Stack gap="lg">
				<Heading order={1}>{title}</Heading>
				<ContactPage locale={locale} />
			</Stack>
		</Container>
	);
}
