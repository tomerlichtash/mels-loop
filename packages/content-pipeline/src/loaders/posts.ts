import fs from "fs/promises";
import type { ProcessedContent, Locale } from "../types";
import { fileExists, loadMarkdownFile, contentPath, localeFileName } from "./base";

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
