import { Container, Title, Text, Stack } from "@mantine/core";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { getAllStories, getStoryConfig } from "@/lib/content/loaders";
import { StoryCard } from "@/components/story/StoryCard";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const typedLocale = locale as Locale;

  const t = (key: string): string => {
    const value = key.split(".").reduce<unknown>((obj, k) => {
      if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[k];
      return undefined;
    }, dict);
    return typeof value === "string" ? value : key;
  };

  // Load all stories
  const storySlugs = await getAllStories();
  const stories = await Promise.all(
    storySlugs.map((slug) => getStoryConfig(slug))
  );

  // Sort featured first
  const sorted = stories.sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="lg" align="center" ta="center">
          <Title order={1}>{t("siteTitle")}</Title>
          <Text size="lg" c="dimmed">
            {t("siteSubtitle")}
          </Text>
        </Stack>

        <Stack gap="md">
          {sorted.map((config) => (
            <StoryCard
              key={config.slug}
              config={config}
              locale={typedLocale}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
