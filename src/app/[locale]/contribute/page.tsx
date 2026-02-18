import { Container, Title, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getPage } from "@/lib/content/loaders";
import { getDictionary } from "@/i18n/server";
import { ContentRenderer } from "@/components/content/ContentRenderer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContributePage({ params }: PageProps) {
  const { locale } = await params;
  const content = await getPage("contribute", locale as Locale);
  const dict = await getDictionary(locale as Locale);

  const title =
    typeof dict === "object" &&
    dict !== null &&
    "nav" in dict &&
    typeof dict.nav === "object" &&
    dict.nav !== null &&
    "contribute" in dict.nav
      ? String(dict.nav.contribute)
      : "Contribute";

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>{content?.metadata.title || title}</Title>
        {content && <ContentRenderer hast={content.hast} />}
      </Stack>
    </Container>
  );
}
