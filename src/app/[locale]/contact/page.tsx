import { Container, Title, Text, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { ContactForm } from "@/components/forms/ContactForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const getValue = (key: string): string => {
    const value = key.split(".").reduce<unknown>((obj, k) => {
      if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[k];
      return undefined;
    }, dict);
    return typeof value === "string" ? value : key;
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>{getValue("contact.pageTitle")}</Title>
        <Text c="dimmed">{getValue("contact.pageSubtitle")}</Text>
        <Text size="sm">{getValue("contact.pageText")}</Text>
        <ContactForm />
      </Stack>
    </Container>
  );
}
