import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import {
  getStoryArticle,
  getStoryArticles,
  getAllStories,
  getAllAnnotations,
  getAllGlossaryTerms,
} from "@/lib/content/loaders";
import { ArticleLayout } from "@/components/story/ArticleLayout";

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

  const [content, annotations, glossary] = await Promise.all([
    getStoryArticle(storySlug, articleSlug, typedLocale),
    getAllAnnotations(storySlug, typedLocale),
    getAllGlossaryTerms(typedLocale),
  ]);

  if (!content) notFound();

  return (
    <ArticleLayout
      content={content}
      annotations={annotations}
      glossary={glossary}
    />
  );
}
