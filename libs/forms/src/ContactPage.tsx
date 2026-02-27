import { Text } from '@mels-loop/ui/primitives';

import { ContactForm } from './ContactForm';

interface ContactPageProps {
	subtitle?: string;
	text?: string;
}

export function ContactPage({ subtitle, text }: ContactPageProps) {
	return (
		<>
			{subtitle && <Text color="muted">{subtitle}</Text>}
			{text && <Text variant="body2">{text}</Text>}
			<ContactForm />
		</>
	);
}
