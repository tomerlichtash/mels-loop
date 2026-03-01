import type { Root as HastRoot } from 'hast';

export type SourceType =
	| 'image'
	| 'pdf'
	| 'audio'
	| 'video'
	| 'link'
	| 'text'
	| 'archive'
	| 'other';

export type SourceLicense =
	| 'public-domain'
	| 'cc-by'
	| 'cc-by-sa'
	| 'fair-use'
	| 'all-rights-reserved'
	| 'unknown';

/** Pure archival metadata — no locale-specific content. */
export interface Source {
	id: string;
	type: SourceType;
	url: string;
	author?: string;
	date?: string;
	credit?: string;
	license?: SourceLicense;
	tags?: string[];
}

/** Locale-specific display strings for a source, stored in `index.{locale}.json`. */
export interface SourceMessages {
	title: string;
	description?: string;
}

/** Source merged with its locale-resolved messages — ready for display. */
export interface ResolvedSource extends Source {
	title: string;
	description?: string;
}

/** Merges a source with its locale messages into a display-ready record. */
export function resolveSource(
	source: Source,
	messages: SourceMessages,
): ResolvedSource {
	return { ...source, ...messages };
}

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
	parse_mode?: 'verse' | 'normal';
	figures?: FigureConfig;
	sources?: string[];
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
	title: Record<string, string>;
	abstract: Record<string, string>;
	featured?: boolean;
	articles: string[];
	documents?: string[];
	sections: string[];
	figures?: FigureConfig;
	sources?: string[];
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
