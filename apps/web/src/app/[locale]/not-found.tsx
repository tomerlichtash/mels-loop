import { Button, Container, Text } from '@mels-loop/ui/primitives';
import Link from 'next/link';

export default function LocaleNotFound() {
	return (
		<Container gap="lg" align="center" style={{ textAlign: 'center' }}>
			<Text variant="h1">404</Text>
			<Text variant="subtitle2" color="muted">
				Page not found
			</Text>
			<Button asChild variant="outlined">
				<Link href="/">Go Home</Link>
			</Button>
		</Container>
	);
}
