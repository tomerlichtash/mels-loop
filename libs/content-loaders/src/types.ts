import type {
	ContentMetadata,
	FigureConfig,
} from '@mels-loop/content-pipeline/types';
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
	summary?: string;
	description?: string;
}

/** Source merged with its locale-resolved messages — ready for display. */
export interface ResolvedSource extends Source {
	title: string;
	summary?: string;
	description?: string;
}

export interface StoryConfig {
	slug: string;
	title: Record<string, string>;
	abstract: Record<string, string>;
	featured?: boolean;
	avatar?: {
		src: string;
		alt: Record<string, string>;
		initials?: Record<string, string>;
	};
	cover?: string;
	thumbnail?: string;
	articles: string[];
	featuredArticles?: string[];
	documents?: string[];
	sections: string[];
	figures?: FigureConfig;
	sources?: string[];
}

export interface ArticleMeta {
	slug: string;
	title: string;
	author?: string;
	abstract?: string;
	date?: string;
	image?: string;
	imageCaption?: string;
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
