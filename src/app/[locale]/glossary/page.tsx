import { Container, Title, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { getAllGlossarySlugs } from "@/lib/content/loaders";
import { GlossaryList } from "@/components/glossary/GlossaryList";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GlossaryIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const slugs = await getAllGlossarySlugs();

  const title =
    typeof dict === "object" &&
    dict !== null &&
    "nav" in dict &&
    typeof dict.nav === "object" &&
    dict.nav !== null &&
    "glossary" in dict.nav
      ? String(dict.nav.glossary)
      : "Glossary";

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>{title}</Title>
        <GlossaryList slugs={slugs} locale={locale} />
      </Stack>
    </Container>
  );
}
