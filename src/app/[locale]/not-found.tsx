import { Container, Title, Text, Button, Stack } from "@mantine/core";

export default function LocaleNotFound() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="lg" align="center" ta="center">
        <Title order={1}>404</Title>
        <Text size="lg" c="dimmed">
          Page not found
        </Text>
        <Button component="a" href="/" variant="outline">
          Go Home
        </Button>
      </Stack>
    </Container>
  );
}
