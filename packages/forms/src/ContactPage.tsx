import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import { Text } from '@mels-loop/ui/primitives';
import { ContactForm } from './ContactForm';

interface ContactPageProps {
	locale: string;
}

export async function ContactPage({ locale }: ContactPageProps) {
	const dict = await getDictionary(locale as Locale);

	const getValue = (key: string): string => {
		const value = key.split('.').reduce<unknown>((obj, k) => {
			if (obj && typeof obj === 'object')
				return (obj as Record<string, unknown>)[k];
			return undefined;
		}, dict);
		return typeof value === 'string' ? value : key;
	};

	return (
		<>
			<Text color="dimmed">{getValue('contact.pageSubtitle')}</Text>
			<Text size="sm">{getValue('contact.pageText')}</Text>
			<ContactForm />
		</>
	);
}
