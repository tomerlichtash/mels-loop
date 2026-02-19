import type { ProcessedContent, Locale } from "../types";
import { fileExists, loadMarkdownFile, contentPath, localeFileName } from "./base";

export async function getPage(
  slug: string,
  locale: Locale
): Promise<ProcessedContent | null> {
  const filePath = contentPath("pages", slug, localeFileName(locale));
  if (!(await fileExists(filePath))) return null;
  return loadMarkdownFile(filePath);
}
