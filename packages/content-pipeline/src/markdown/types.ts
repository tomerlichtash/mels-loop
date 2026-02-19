import type { FigureConfig } from "../types";

export interface MarkdownProcessOptions {
  parseMode?: "verse" | "normal";
  figures?: FigureConfig;
  figureIndex?: number;
}
