import type { Root as HastRoot } from "hast";
import type { Locale } from "@mels-loop/i18n/config";

export type { Locale };

export interface ContentMetadata {
  title?: string;
  subtitle?: string;
  abstract?: string;
  author?: string;
  date?: string;
  glossary_key?: string;
  source_url?: string;
  source_name?: string;
  source_author?: string;
  moto?: string;
  credits?: string;
  parse_mode?: "verse" | "normal";
  figures?: FigureConfig;
  [key: string]: unknown;
}

export interface FigureConfig {
  auto?: boolean;
  template?: string;
  base_index?: number;
}

export interface ProcessedContent {
  metadata: ContentMetadata;
  hast: HastRoot;
  raw: string;
}

export interface StoryConfig {
  slug: string;
  title: Record<Locale, string>;
  abstract: Record<Locale, string>;
  featured?: boolean;
  articles: string[];
  documents?: string[];
  sections: string[];
  figures?: FigureConfig;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  author?: string;
}

export interface GlossaryEntry {
  slug: string;
  metadata: ContentMetadata;
  hast: HastRoot;
}

export interface PostEntry {
  slug: string;
  metadata: ContentMetadata;
  hast: HastRoot;
}
