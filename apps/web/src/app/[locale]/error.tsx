'use client';

import { Button, Container, Text } from '@mels-loop/ui/primitives';

export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Container gap="lg" align="center" style={{ textAlign: 'center' }}>
			<Text variant="h1">Something went wrong</Text>
			<Text variant="subtitle2" color="muted">
				{error.message || 'An unexpected error occurred'}
			</Text>
			<Button onClick={reset} variant="outlined">
				Try again
			</Button>
		</Container>
	);
}
