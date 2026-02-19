import { Title, Stack, Card, Group, Text } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import { getStoryConfig, getStoryArticles } from "@mels-loop/content-pipeline/loaders";
import { homeItem, dictGet } from "@/lib/breadcrumbs";
import { StoryShell } from "@/components/story/StoryShell";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ArticlesListingPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const typedLocale = locale as Locale;
  const config = await getStoryConfig(storySlug);
  const dict = await getDictionary(typedLocale);

  const storyTitle = config.title[typedLocale];
  const articlesLabel = dictGet(dict as Record<string, unknown>, "nav.articles");

  return (
    <StoryShell
      storySlug={storySlug}
      locale={typedLocale}
      activePath="articles"
      breadcrumbs={[
        homeItem(locale, dictGet(dict as Record<string, unknown>, "nav.home")),
        { label: storyTitle, href: `/stories/${storySlug}` },
        { label: articlesLabel },
      ]}
    >
      <Stack gap="lg">
        <Title order={1}>{articlesLabel} &mdash; {storyTitle}</Title>
        {(await getStoryArticles(storySlug)).map((slug) => (
          <Card key={slug} withBorder padding="md">
            <Group justify="space-between">
              <Text weight={500} component="span" capitalize>
                {slug.replace(/-/g, " ")}
              </Text>
              <a href={`/stories/${storySlug}/articles/${slug}`}>
                Read
              </a>
            </Group>
          </Card>
        ))}
      </Stack>
    </StoryShell>
  );
}
