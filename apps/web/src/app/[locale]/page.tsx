import { Container, Title } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import { getAllStories, getStoryConfig } from "@mels-loop/content-pipeline/loaders";
import { StoryCard } from "@/components/story/StoryCard";
import { Hero } from "@/components/hero/Hero";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const storySlugs = await getAllStories();
  const stories = await Promise.all(
    storySlugs.map((slug) => getStoryConfig(slug))
  );

  const sorted = stories.sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );

  const ctaHref = "/stories";
  const dict = await getDictionary(typedLocale);

  return (
    <Container size="md">
      <Hero locale={typedLocale} ctaHref={ctaHref} />
      <section>
        <Title order={2}>{String(dict.stories)}</Title>
        <div>
          {sorted.map((config) => (
            <StoryCard
              key={config.slug}
              config={config}
              locale={typedLocale}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
