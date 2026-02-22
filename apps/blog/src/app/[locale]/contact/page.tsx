import { Container, Heading, Stack } from '@mels-loop/ui/primitives';
import { getDictionary } from '@/i18n';
import { ContactPage } from '@mels-loop/forms/ContactPage';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale);
	const contact = dict.contact as Record<string, string>;

	return (
		<Container>
			<Stack gap="lg">
				<Heading order={1}>{contact.pageTitle ?? 'Contact'}</Heading>
				<ContactPage subtitle={contact.pageSubtitle} text={contact.pageText} />
			</Stack>
		</Container>
	);
}
