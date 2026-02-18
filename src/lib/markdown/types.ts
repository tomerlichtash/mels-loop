import type { FigureConfig } from "@/lib/content/types";

export interface MarkdownProcessOptions {
  parseMode?: "verse" | "normal";
  figures?: FigureConfig;
  figureIndex?: number;
}
