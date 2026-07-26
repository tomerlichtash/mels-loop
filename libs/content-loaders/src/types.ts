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

export type License =
	| 'public-domain'
	| 'cc-by'
	| 'cc-by-sa'
	| 'fair-use'
	| 'all-rights-reserved'
	| 'unknown';

/** @deprecated Use `License` instead. */
export type SourceLicense = License;

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

// --- Contents model ---

export interface PartEntry {
	type: 'part';
	ref: string;
	children: ContentsEntry[];
	/** When true, render the part title as a direct link (no nested children). */
	collapse?: boolean;
	/** Message key for part author (e.g. "authors.preface"), resolved from story messages. */
	author?: string;
}

export interface PageEntry {
	type: 'page';
	ref: string;
	figure?: boolean;
	/** Override display title (message key, e.g. "titles.preface"). When set, used instead of the page's frontmatter title. */
	title?: string;
	/** Message key for page author, resolved from story messages. */
	author?: string;
}

export interface SourceEntry {
	type: 'source';
	ref: string;
	figure?: boolean;
}

export interface GeneratedEntry {
	type: 'generated';
	ref: string;
}

export type ContentsEntry =
	| PartEntry
	| PageEntry
	| SourceEntry
	| GeneratedEntry;

// --- Resolved contents (display-ready) ---

export interface ResolvedPartEntry {
	type: 'part';
	ref: string;
	title: string;
	children: ResolvedContentsEntry[];
	collapse?: boolean;
	author?: string;
	/** When collapsed, the href of the single child. */
	href?: string;
}

export interface ResolvedPageEntry {
	type: 'page';
	ref: string;
	title: string;
	href: string;
	author?: string;
}

export interface ResolvedSourceEntry {
	type: 'source';
	ref: string;
	title: string;
	href: string;
}

export interface ResolvedGeneratedEntry {
	type: 'generated';
	ref: string;
	title: string;
	href: string;
}

export type ResolvedContentsEntry =
	| ResolvedPartEntry
	| ResolvedPageEntry
	| ResolvedSourceEntry
	| ResolvedGeneratedEntry;

// --- Story config ---

export type AuthorRole =
	| 'author'
	| 'editor'
	| 'translator'
	| 'contributor'
	| 'illustrator';

export interface StoryAuthor {
	/** Key into the story messages `authors` map (e.g. "ednather"). */
	ref: string;
	role: AuthorRole;
}

export interface StoryConfig {
	slug: string;
	meta: {
		/** Message key (e.g. "story.title") or inline translations. */
		title: string | Record<string, string>;
		/** Message key (e.g. "story.abstract") or inline translations. */
		abstract: string | Record<string, string>;
		/** Publication date of the original work (ISO 8601, e.g. "1983-05-21"). */
		date?: string;
		/** License for the story content. */
		license?: License;
		/** Freeform tags for categorization/search. */
		tags?: string[];
	};
	/** Story-level authors with roles. Names resolved from messages. */
	authors?: StoryAuthor[];
	assets?: {
		cover?: string;
		thumbnail?: string;
		avatar?: {
			src: string;
			/** Message key (e.g. "avatar.alt") or inline translations. */
			alt: string | Record<string, string>;
			/** Message key (e.g. "avatar.initials") or inline translations. */
			initials?: string | Record<string, string>;
		};
	};
	/** Whether this story should be featured prominently on the homepage. */
	featured?: boolean;
	figures?: FigureConfig;
	sources?: string[];
	contents?: ContentsEntry[];
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
