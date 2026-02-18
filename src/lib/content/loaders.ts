import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { processMarkdown } from "@/lib/markdown/pipeline";
import type {
  ProcessedContent,
  ContentMetadata,
  StoryConfig,
  Locale,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ---- Low-level helpers ----

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function loadMarkdownFile(
  filePath: string,
  figureOptions?: { auto?: boolean; template?: string; base_index?: number }
): Promise<ProcessedContent> {
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  const metadata = data as ContentMetadata;

  const hast = await processMarkdown(content, {
    parseMode: metadata.parse_mode,
    figures: figureOptions ?? metadata.figures,
  });

  return { metadata, hast, raw: content };
}

function contentPath(...segments: string[]): string {
  return path.join(CONTENT_DIR, ...segments);
}

function localeFileName(locale: Locale): string {
  return `index.${locale}.md`;
}

// ---- Story ----

export async function getStoryConfig(slug: string): Promise<StoryConfig> {
  const configPath = contentPath("stories", slug, "story.json");
  const raw = await fs.readFile(configPath, "utf-8");
  return JSON.parse(raw) as StoryConfig;
}

export async function getStory(
  slug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath("stories", slug, localeFileName(locale));
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}

export async function getAllStories(): Promise<string[]> {
  const storiesDir = contentPath("stories");
  const entries = await fs.readdir(storiesDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

// ---- Articles ----

export async function getStoryArticle(
  storySlug: string,
  articleSlug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath(
    "stories",
    storySlug,
    "articles",
    articleSlug,
    localeFileName(locale)
  );
  if (!(await fileExists(filePath))) return null;

  // Load story config for figure settings
  const config = await getStoryConfig(storySlug);
  return loadMarkdownFile(filePath, config.figures);
}

export async function getStoryArticles(
  storySlug: string
): Promise<string[]> {
  const articlesDir = contentPath("stories", storySlug, "articles");
  if (!(await fileExists(articlesDir))) return [];
  const entries = await fs.readdir(articlesDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

// ---- Annotations ----

export async function getAllAnnotations(
  storySlug: string,
  locale: Locale
): Promise<Record<string, ProcessedContent>> {
  const annotationsDir = contentPath("stories", storySlug, "annotations");
  if (!(await fileExists(annotationsDir))) return {};

  const entries = await fs.readdir(annotationsDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const result: Record<string, ProcessedContent> = {};

  await Promise.all(
    dirs.map(async (dir) => {
      const filePath = path.join(annotationsDir, dir.name, localeFileName(locale));
      if (await fileExists(filePath)) {
        result[dir.name] = await loadMarkdownFile(filePath);
      }
    })
  );

  return result;
}

// ---- Glossary ----

export async function getAllGlossaryTerms(
  locale: Locale
): Promise<Record<string, ProcessedContent>> {
  const glossaryDir = contentPath("glossary");
  if (!(await fileExists(glossaryDir))) return {};

  const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const result: Record<string, ProcessedContent> = {};

  await Promise.all(
    dirs.map(async (dir) => {
      const filePath = path.join(glossaryDir, dir.name, localeFileName(locale));
      if (await fileExists(filePath)) {
        result[dir.name] = await loadMarkdownFile(filePath);
      }
    })
  );

  return result;
}

export async function getGlossaryTerm(
  slug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath("glossary", slug, localeFileName(locale));
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}

export async function getAllGlossarySlugs(): Promise<string[]> {
  const glossaryDir = contentPath("glossary");
  if (!(await fileExists(glossaryDir))) return [];
  const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

// ---- Posts ----

export async function getPost(
  slug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath("posts", slug, localeFileName(locale));
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}

export async function getAllPosts(): Promise<string[]> {
  const postsDir = contentPath("posts");
  if (!(await fileExists(postsDir))) return [];
  const entries = await fs.readdir(postsDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

// ---- Static Pages ----

export async function getPage(
  slug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath("pages", slug, localeFileName(locale));
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}

// ---- Codex ----

export async function getCodex(
  storySlug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath(
    "stories",
    storySlug,
    "codex",
    localeFileName(locale)
  );
  if (!(await fileExists(filePath))) return null;

  const config = await getStoryConfig(storySlug);
  return loadMarkdownFile(filePath, config.figures);
}

// ---- Resources ----

export async function getResources(
  storySlug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath(
    "stories",
    storySlug,
    "articles",
    "resources",
    localeFileName(locale)
  );
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}
