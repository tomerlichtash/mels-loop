"use client";

import { Container, Title, Text, Button, Stack } from "@mantine/core";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container size="sm" py="xl">
      <Stack gap="lg" align="center" ta="center">
        <Title order={1}>Something went wrong</Title>
        <Text size="lg" c="dimmed">
          {error.message || "An unexpected error occurred"}
        </Text>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </Stack>
    </Container>
  );
}
