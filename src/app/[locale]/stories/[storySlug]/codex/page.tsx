import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  getCodex,
  getAllAnnotations,
  getAllGlossaryTerms,
} from "@/lib/content/loaders";
import { ArticleLayout } from "@/components/story/ArticleLayout";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string }>;
}

export default async function CodexPage({ params }: PageProps) {
  const { locale, storySlug } = await params;
  const typedLocale = locale as Locale;

  const [content, annotations, glossary] = await Promise.all([
    getCodex(storySlug, typedLocale),
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
