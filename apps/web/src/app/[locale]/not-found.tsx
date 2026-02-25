import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
} from '@mels-loop/ui/primitives';
import Link from 'next/link';

export default function LocaleNotFound() {
	return (
		<Container>
			<Stack gap="lg" align="center" textAlign="center">
				<Heading level={1}>404</Heading>
				<Text size="lg" color="dimmed">
					Page not found
				</Text>
				<Button asChild variant="outline">
					<Link href="/">Go Home</Link>
				</Button>
			</Stack>
		</Container>
	);
}
