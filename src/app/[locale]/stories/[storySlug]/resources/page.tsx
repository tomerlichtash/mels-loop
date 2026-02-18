import { notFound } from "next/navigation";
import { Container, Title, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getResources } from "@/lib/content/loaders";
import { ContentRenderer } from "@/components/content/ContentRenderer";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const content = await getResources(storySlug, locale as Locale);

  if (!content) notFound();

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        {content.metadata.title && (
          <Title order={1}>{content.metadata.title}</Title>
        )}
        <ContentRenderer hast={content.hast} />
      </Stack>
    </Container>
  );
}
