import type { FigureConfig, ResolvedSource } from '../types';

export interface MarkdownProcessOptions {
	parseMode?: 'verse' | 'normal';
	figures?: FigureConfig;
	figureIndex?: number;
	/**
	 * Pre-loaded resolved sources map.
	 * Used to resolve `sources/{id}` image references (rehypeSourceImages)
	 * and `{{sources/id:field}}` template expressions (remarkSourceVars).
	 */
	sources?: Record<string, ResolvedSource>;
}
