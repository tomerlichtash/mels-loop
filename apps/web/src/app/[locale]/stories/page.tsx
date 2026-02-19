import type { Locale } from "@mels-loop/i18n/config";
import { getAllStories, getStoryConfig } from "@mels-loop/content-pipeline/loaders";
import { StaticPage } from "@/components/StaticPage";
import { StoryCard } from "@/components/story/StoryCard";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function StoriesPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const storySlugs = await getAllStories();
  const stories = await Promise.all(
    storySlugs.map((slug) => getStoryConfig(slug))
  );

  const sorted = stories.sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );

  return (
    <StaticPage locale={locale} navKey="stories">
      <div>
        {sorted.map((config) => (
          <StoryCard key={config.slug} config={config} locale={typedLocale} />
        ))}
      </div>
    </StaticPage>
  );
}
