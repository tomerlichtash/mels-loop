import { Container, Title, Text, Stack, Card, Group, Anchor, Divider } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import {
  getStory,
  getStoryConfig,
  getAllStories,
  getStoryArticles,
} from "@/lib/content/loaders";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { StoryNav } from "@/components/story/StoryNav";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.flatMap((storySlug) =>
    locales.map((locale) => ({ locale, storySlug }))
  );
}

export default async function StoryLandingPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const config = await getStoryConfig(storySlug);
  const content = await getStory(storySlug, locale as Locale);
  const articleSlugs = await getStoryArticles(storySlug);

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>{config.title[locale as Locale]}</Title>
        <Text size="lg" c="dimmed">
          {config.abstract[locale as Locale]}
        </Text>

        <StoryNav storySlug={storySlug} sections={config.sections} />

        <Divider />

        {content && <ContentRenderer hast={content.hast} />}

        {articleSlugs.length > 0 && (
          <Stack gap="sm" mt="xl">
            <Title order={2}>
              {locale === "he" ? "מאמרים" : "Articles"}
            </Title>
            {articleSlugs.map((slug) => (
              <Card key={slug} withBorder padding="md">
                <Group justify="space-between">
                  <Text fw={500} tt="capitalize">
                    {slug.replace(/-/g, " ")}
                  </Text>
                  <Anchor href={`/${locale}/stories/${storySlug}/articles/${slug}`}>
                    {locale === "he" ? "קריאה" : "Read"} →
                  </Anchor>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
