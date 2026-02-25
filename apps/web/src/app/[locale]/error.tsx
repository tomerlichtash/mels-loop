'use client';

import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
} from '@mels-loop/ui/primitives';

export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Container>
			<Stack gap="lg" align="center" textAlign="center">
				<Heading level={1}>Something went wrong</Heading>
				<Text size="lg" color="dimmed">
					{error.message || 'An unexpected error occurred'}
				</Text>
				<Button onClick={reset} variant="outline">
					Try again
				</Button>
			</Stack>
		</Container>
	);
}
