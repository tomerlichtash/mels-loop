"use client";

import { Container, Title, Text, Button, Stack } from "@mels-loop/ui/primitives";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container size="sm">
      <Stack gap="lg" align="center" textAlign="center">
        <Title order={1}>Something went wrong</Title>
        <Text size="lg" color="dimmed">
          {error.message || "An unexpected error occurred"}
        </Text>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </Stack>
    </Container>
  );
}
