import { notFound } from "next/navigation";
import { Title, Text, Stack } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { locales } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import {
  getStoryArticle,
  getStoryArticles,
  getStoryConfig,
  getAllStories,
  getAllAnnotations,
  getAllGlossaryTerms,
} from "@mels-loop/content-pipeline/loaders";
import {
  ContentRenderer,
  AnnotationProvider,
  AnnotationAwareLink,
} from "@mels-loop/ui/content";
import { homeItem, dictGet } from "@/lib/breadcrumbs";
import { StoryShell } from "@/components/story/StoryShell";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string; articleSlug: string }>;
}

export async function generateStaticParams() {
  const stories = await getAllStories();
  const params = [];

  for (const storySlug of stories) {
    const articles = await getStoryArticles(storySlug);
    for (const articleSlug of articles) {
      for (const locale of locales) {
        params.push({ locale, storySlug, articleSlug });
      }
    }
  }

  return params;
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, storySlug, articleSlug } = await params;
  const typedLocale = locale as Locale;

  const [content, annotations, glossary, config, dict] = await Promise.all([
    getStoryArticle(storySlug, articleSlug, typedLocale),
    getAllAnnotations(storySlug, typedLocale),
    getAllGlossaryTerms(typedLocale),
    getStoryConfig(storySlug),
    getDictionary(typedLocale),
  ]);

  if (!content) notFound();

  const storyTitle = config.title[typedLocale];
  const articlesLabel = dictGet(dict as Record<string, unknown>, "nav.articles");
  const articleTitle = content.metadata.title ||
    articleSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <StoryShell
      storySlug={storySlug}
      locale={typedLocale}
      activePath={`articles/${articleSlug}`}
      breadcrumbs={[
        homeItem(locale, dictGet(dict as Record<string, unknown>, "nav.home")),
        { label: storyTitle, href: `/stories/${storySlug}` },
        { label: articlesLabel, href: `/stories/${storySlug}/articles` },
        { label: articleTitle },
      ]}
    >
      <Stack gap="lg">
        {content.metadata.title && <Title order={1}>{content.metadata.title}</Title>}
        {content.metadata.abstract && (
          <Text size="lg" color="dimmed" italic>{content.metadata.abstract}</Text>
        )}
        {content.metadata.moto && (
          <Text size="sm" color="dimmed" italic>{content.metadata.moto}</Text>
        )}
        {content.metadata.credits && (
          <Text size="xs" color="dimmed">{content.metadata.credits}</Text>
        )}
        {content.metadata.author && (
          <Text size="sm" color="dimmed" uppercase>{content.metadata.author}</Text>
        )}
        <AnnotationProvider annotations={annotations} glossary={glossary}>
          <ContentRenderer
            hast={content.hast}
            components={{ a: AnnotationAwareLink }}
          />
        </AnnotationProvider>
      </Stack>
    </StoryShell>
  );
}
