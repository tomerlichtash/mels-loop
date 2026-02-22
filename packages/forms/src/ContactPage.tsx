import { Text } from '@mels-loop/ui/primitives';
import { ContactForm } from './ContactForm';

interface ContactPageProps {
	subtitle?: string;
	text?: string;
}

export function ContactPage({ subtitle, text }: ContactPageProps) {
	return (
		<>
			{subtitle && <Text color="dimmed">{subtitle}</Text>}
			{text && <Text size="sm">{text}</Text>}
			<ContactForm />
		</>
	);
}
