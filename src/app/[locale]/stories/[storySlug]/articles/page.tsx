import { Container, Title, Stack, Card, Group, Text, Anchor } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getStoryConfig, getStoryArticles } from "@/lib/content/loaders";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ArticlesListingPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const config = await getStoryConfig(storySlug);
  const articleSlugs = await getStoryArticles(storySlug);

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>Articles — {config.title[locale as Locale]}</Title>
        {articleSlugs.map((slug) => (
          <Card key={slug} withBorder padding="md">
            <Group justify="space-between">
              <Text fw={500} tt="capitalize">
                {slug.replace(/-/g, " ")}
              </Text>
              <Anchor href={`/${locale}/stories/${storySlug}/articles/${slug}`}>
                Read →
              </Anchor>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
