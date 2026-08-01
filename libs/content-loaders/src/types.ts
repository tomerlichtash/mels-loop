import type {
	ContentMetadata,
	FigureConfig,
} from '@mels-loop/content-pipeline/types';
import type { Root as HastRoot } from 'hast';

export type SourceType =
	| 'image'
	| 'pdf'
	/* A written record we hold a transcription of, not merely a link to. */
	| 'document'
	| 'audio'
	| 'video'
	| 'link'
	| 'text'
	| 'archive'
	| 'other';

/**
 * Evidentiary standing: an artifact of the events, or commentary after.
 * A reproduction inherits the standing of what it reproduces — a scan of
 * the naturalization papers is primary because the papers are; a photo of
 * a gravestone is primary because the stone is; prose about events is
 * secondary regardless of age.
 */
export type Standing = 'primary' | 'secondary';

export type License =
	| 'public-domain'
	| 'cc-by'
	| 'cc-by-sa'
	| 'cc-by-nc-sa'
	| 'fair-use'
	| 'all-rights-reserved'
	| 'unknown';

/** @deprecated Use `License` instead. */
export type SourceLicense = License;

/** Pure archival metadata — no locale-specific content. */
export interface Source {
	id: string;
	type: SourceType;
	standing: Standing;
	url: string;
	/**
	 * A depiction for presentation — a photograph of (part of) the artifact,
	 * used in article figures and previews. The record's actual copy stays in
	 * `url`; the same move as `Entity.portrait`: the picture of the thing is
	 * not the thing.
	 */
	image?: string;
	author?: string;
	date?: string;
	/** Bibliographic container — the publication or collection the artifact
	 *  appeared in: Librazette, a yearbook, a Usenet group. */
	source?: string;
	/** Where we found the copy — provider or holder; may die tomorrow. */
	repository?: string;
	license?: SourceLicense;
	tags?: string[];
	/**
	 * A page on this site that reproduces the record — a transcription of a
	 * scanned document, say. `url` still points at the archival original; this
	 * is where a reader can actually read the thing.
	 */
	page?: string;
	/**
	 * The copy's locator at its repository: the Commons file page, the forum
	 * thread, the archive listing.
	 *
	 * `url` cannot carry this for an image, because there it holds the copy we
	 * host — so "open source" on a photograph led to a bare file on S3, and the
	 * real provenance had nowhere to go but the end of the description, where
	 * two sources had already put a raw link.
	 */
	repositoryUrl?: string;
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
	/**
	 * Whether this part belongs in the story's aside. Defaults to true.
	 *
	 * The aside exists to show the main text and the writing that surrounds it.
	 * Parts that are reference material rather than reading — an appendix, a
	 * document dump — are reached from the sources instead, and listing them
	 * here says nothing about how they relate to the story.
	 */
	aside?: boolean;
	/**
	 * Whether this part gets a tab of its own. Defaults to true.
	 *
	 * A part can hold real content and still not deserve a place in the story's
	 * top-level navigation. Mel's Blackjack writeup is a source we happen to
	 * hold a transcription of; it belongs among the sources, not in a tab of
	 * one beside The Story and Articles.
	 */
	tab?: boolean;
	/** Message key for part author (e.g. "authors.preface"), resolved from story messages. */
	author?: string;
}

export interface PageEntry {
	type: 'page';
	ref: string;
	figure?: boolean;
	/** Override display title (message key, e.g. "titles.preface"). When set, used instead of the page's frontmatter title. */
	title?: string;
	/**
	 * A line for the aside, as a message key (e.g. "subtitles.preface").
	 *
	 * Lives here rather than in the page's frontmatter so navigation copy stays
	 * out of the article: the page's own abstract is a standfirst written for a
	 * full-width column, and what orients a reader in a narrow list of links is
	 * a different sentence. Optional — a row without one simply has one line
	 * fewer.
	 */
	subtitle?: string;
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
	/** Whether this part belongs in the story's aside. Defaults to true. */
	aside?: boolean;
	/** Whether this part gets a tab of its own. Defaults to true. */
	tab?: boolean;
	author?: string;
	/** When collapsed, the href of the single child. */
	href?: string;
}

export interface ResolvedPageEntry {
	type: 'page';
	ref: string;
	title: string;
	href: string;
	/** Resolved aside line. See PageEntry.subtitle. */
	subtitle?: string;
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

// --- Entity model ---

export type EntityKind =
	| 'person'
	| 'object'
	| 'machine'
	| 'organisation'
	| 'place';

/**
 * A thing the archive is about — one type with a kind discriminator, split
 * into separate types only when a second kind needs different behaviour.
 * Entities assert knowledge (dates, relationships) backed by their research
 * as a whole; records evidence. See ARCHIVE-MODEL.md.
 */
export interface Entity {
	id: string;
	kind: EntityKind;
	/** Source ids this entity cites. Cites, never owns — a source can be
	 *  cited by many entities. */
	sources: string[];
	/** Source id of the depiction used wherever this entity needs a face —
	 *  avatar, card, cover. */
	portrait?: string;
	/** Kind gives the labels: born/died, introduced/retired,
	 *  founded/dissolved. Fuzzy strings OK ("1952"). */
	dates?: { start?: string; end?: string };
	/** Entity↔entity edges: mel-kaye→librascope "worked at". Structure and
	 *  derivation only — edges render no labels in v1. */
	related?: { ref: string; relation: string }[];
	tags?: string[];
}

/** Locale display strings for an entity, stored in `index.{locale}.json`. */
export interface EntityMessages {
	name: string;
	/** One-line role/occupation: "Programmer, Librascope". */
	role?: string;
	summary?: string;
	description?: string;
}

/** Entity merged with its locale-resolved messages — ready for display. */
export interface ResolvedEntity extends Entity {
	name: string;
	role?: string;
	summary?: string;
	description?: string;
}

// --- Story config ---

export type EntityRole =
	| 'subject'
	| 'author'
	| 'custodian'
	| 'editor'
	| 'translator'
	| 'contributor'
	| 'illustrator';

/**
 * An involvement edge: this entity belongs to this story's life. Editorial —
 * membership comes from roles, not from the text; referenced-ness (the text
 * mentions the entity) is derived from annotation `mentions:` instead.
 */
export interface StoryEntityRef {
	/** Entity id. */
	ref: string;
	role: EntityRole;
	/** Story-scoped alias, as a message key into story messages — how this
	 *  entity is called *in this text* ("The Big Boss"), when that differs
	 *  from the entity's real name. */
	as?: string;
}

export interface StoryConfig {
	slug: string;
	meta: {
		/** Message key (e.g. "story.title") or inline translations. */
		title: string | Record<string, string>;
		/** Message key (e.g. "story.abstract") or inline translations. */
		abstract: string | Record<string, string>;
		/**
		 * Shown under the title on the story page. Falls back to `abstract`.
		 * Separate because the story page wants a short standfirst while the
		 * homepage card wants a fuller description.
		 */
		subtitle?: string | Record<string, string>;
		/** Publication date of the original work (ISO 8601, e.g. "1983-05-21"). */
		date?: string;
		/** License for the story content. */
		license?: License;
		/** Freeform tags for categorization/search. */
		tags?: string[];
	};
	/** Involvement edges — who and what belongs to this story's life, with
	 *  roles. Names resolve from each entity's own messages. */
	entities?: StoryEntityRef[];
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
	/**
	 * A handful of source IDs worth putting in front of a reader, shown in the
	 * story's aside. The full set runs to dozens; this is the editor's pick.
	 */
	featuredSources?: string[];
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
