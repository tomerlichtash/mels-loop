import { notFound } from "next/navigation";
import { Title, Text, Stack } from "@mels-loop/ui/primitives";
import type { Locale } from "@mels-loop/i18n/config";
import { getDictionary } from "@mels-loop/i18n/server";
import {
  getAllAnnotations,
  getAllGlossaryTerms,
  getStoryConfig,
  loadMarkdownFile,
  getContentDir,
} from "@mels-loop/content-pipeline/loaders";
import {
  ContentRenderer,
  AnnotationProvider,
  AnnotationAwareLink,
} from "@mels-loop/ui/content";
import { homeItem, dictGet } from "@/lib/breadcrumbs";
import { StoryShell } from "@/components/story/StoryShell";
import path from "path";
import fs from "fs/promises";

interface PageProps {
  params: Promise<{ locale: string; storySlug: string; pageSlug: string }>;
}

export default async function CodexSubPage({ params }: PageProps) {
  const { locale, storySlug, pageSlug } = await params;
  const typedLocale = locale as Locale;

  const filePath = path.join(
    getContentDir(),
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

  const [content, annotations, glossary, config, dict] = await Promise.all([
    loadMarkdownFile(filePath),
    getAllAnnotations(storySlug, typedLocale),
    getAllGlossaryTerms(typedLocale),
    getStoryConfig(storySlug),
    getDictionary(typedLocale),
  ]);

  const storyTitle = config.title[typedLocale];
  const codexLabel = dictGet(dict as Record<string, unknown>, "nav.codex");
  const pageTitle = content.metadata.title ||
    pageSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <StoryShell
      storySlug={storySlug}
      locale={typedLocale}
      activePath={`codex/${pageSlug}`}
      breadcrumbs={[
        homeItem(locale, dictGet(dict as Record<string, unknown>, "nav.home")),
        { label: storyTitle, href: `/stories/${storySlug}` },
        { label: codexLabel, href: `/stories/${storySlug}/codex` },
        { label: pageTitle },
      ]}
    >
      <Stack gap="lg">
        {content.metadata.title && <Title order={1}>{content.metadata.title}</Title>}
        {content.metadata.abstract && (
          <Text size="lg" color="dimmed" italic>{content.metadata.abstract}</Text>
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
