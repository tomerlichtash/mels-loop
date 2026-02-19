import { Container, Title, Text, Button, Stack } from "@mels-loop/ui/primitives";

export default function LocaleNotFound() {
  return (
    <Container size="sm">
      <Stack gap="lg" align="center" textAlign="center">
        <Title order={1}>404</Title>
        <Text size="lg" color="dimmed">
          Page not found
        </Text>
        <Button component="a" href="/" variant="outline">
          Go Home
        </Button>
      </Stack>
    </Container>
  );
}
