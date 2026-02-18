import { notFound } from "next/navigation";
import { Container, Title, Text, Stack, Anchor, Box } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getGlossaryTerm, getAllGlossarySlugs } from "@/lib/content/loaders";
import { ContentRenderer } from "@/components/content/ContentRenderer";

interface PageProps {
  params: Promise<{ locale: string; termSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllGlossarySlugs();
  return slugs.flatMap((termSlug) =>
    locales.map((locale) => ({ locale, termSlug }))
  );
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { locale, termSlug } = await params;
  const content = await getGlossaryTerm(termSlug, locale as Locale);

  if (!content) notFound();

  const displayName = content.metadata.glossary_key ||
    termSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Anchor href={`/${locale}/glossary`} size="sm">
          ← Back to Glossary
        </Anchor>
        <Title order={1}>{displayName}</Title>
        <ContentRenderer hast={content.hast} />
        {content.metadata.source_name && (
          <Box>
            <Text size="sm" c="dimmed">
              Source:{" "}
              {content.metadata.source_url ? (
                <Anchor href={content.metadata.source_url} target="_blank" size="sm">
                  {content.metadata.source_name}
                </Anchor>
              ) : (
                content.metadata.source_name
              )}
            </Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
