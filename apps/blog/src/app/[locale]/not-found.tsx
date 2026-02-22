import {
	Container,
	Heading,
	Text,
	Button,
	Stack,
} from '@mels-loop/ui/primitives';

export default function LocaleNotFound() {
	return (
		<Container>
			<Stack gap="lg" align="center" textAlign="center">
				<Heading order={1}>404</Heading>
				<Text size="lg" color="dimmed">
					Page not found
				</Text>
				<Button asChild variant="outline">
					<a href="/">Go Home</a>
				</Button>
			</Stack>
		</Container>
	);
}
