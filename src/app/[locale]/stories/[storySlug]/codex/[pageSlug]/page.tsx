import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  getAllAnnotations,
  getAllGlossaryTerms,
  loadMarkdownFile,
} from "@/lib/content/loaders";
import { ArticleLayout } from "@/components/story/ArticleLayout";
import path from "path";
import fs from "fs/promises";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string; pageSlug: string }>;
}

export default async function CodexSubPage({ params }: PageProps) {
  const { locale, storySlug, pageSlug } = await params;
  const typedLocale = locale as Locale;

  const filePath = path.join(
    process.cwd(),
    "content",
    "stories",
    storySlug,
    "codex",
    pageSlug,
    `index.${locale}.md`
  );

  try {
    await fs.access(filePath);
  } catch {
    notFound();
  }

  const [content, annotations, glossary] = await Promise.all([
    loadMarkdownFile(filePath),
    getAllAnnotations(storySlug, typedLocale),
    getAllGlossaryTerms(typedLocale),
  ]);

  return (
    <ArticleLayout
      content={content}
      annotations={annotations}
      glossary={glossary}
    />
  );
}
