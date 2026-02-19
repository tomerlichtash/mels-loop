import { notFound } from "next/navigation";
import { Title, Stack } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import { getResources, getStoryConfig } from "@mels-loop/content-pipeline/loaders";
import { ContentRenderer } from "@mels-loop/ui/content";
import { homeItem, dictGet } from "@/lib/breadcrumbs";
import { StoryShell } from "@/components/story/StoryShell";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const typedLocale = locale as Locale;

  const [content, config, dict] = await Promise.all([
    getResources(storySlug, typedLocale),
    getStoryConfig(storySlug),
    getDictionary(typedLocale),
  ]);

  if (!content) notFound();

  const storyTitle = config.title[typedLocale];
  const resourcesLabel = dictGet(dict as Record<string, unknown>, "nav.resources");

  return (
    <StoryShell
      storySlug={storySlug}
      locale={typedLocale}
      activePath="resources"
      breadcrumbs={[
        homeItem(locale, dictGet(dict as Record<string, unknown>, "nav.home")),
        { label: storyTitle, href: `/stories/${storySlug}` },
        { label: resourcesLabel },
      ]}
    >
      <Stack gap="lg">
        {content.metadata.title && (
          <Title order={1}>{content.metadata.title}</Title>
        )}
        <ContentRenderer hast={content.hast} />
      </Stack>
    </StoryShell>
  );
}
