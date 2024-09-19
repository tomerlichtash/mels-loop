import type { MLNODE_TYPES, NODE_DISPLAY_TYPES } from './nodes';
import type { ParseModes } from './modes';
import { DynamicContentTypes } from 'context/types';

export type StringMap = { [key: string]: string };

export interface IFigureConfiguration {
	auto: boolean;
	base: number;
	template: string;
}

export interface ILocaleMap {
	readonly params: StringMap;
	locale: string;
}

export interface IPageMeta {
	readonly date: Date;
	readonly title: string;
	readonly abstract: string;
	readonly moto: string;
	readonly credits: string;
	readonly author: string;
	readonly glossary_key: string;
	readonly source_url: string;
	readonly source_name: string;
	readonly source_author: string;

	/**
	 * Guaranteed not null. Each metadata object is created with at least the default
	 * figures configuration, which may be overridden by the document metadata
	 */
	readonly figures: IFigureConfiguration;
	readonly parse_mode?: ParseModes;
}

/** A markdown node parsed and processed by ML */
export interface IParsedNode {
	readonly type: MLNODE_TYPES;
	/** Unique key across the tree in which the node resides */
	readonly key: string;
	/** Line number associated with this node */
	readonly line: number;
	/**
	 * Returns the actual array of children, NOT a copy, so you can manipulate
	 * the node's children in place.
	 */
	readonly children?: IParsedNode[];
	/** Occurrence index in parent line */
	readonly occurrenceIndex?: number;
	/** Node text, if it is a leaf */
	readonly text?: string;
	/** Un/Ordered list */
	readonly ordered?: boolean;
	/** Link target */
	readonly target?: string;
	/** Heading level */
	readonly level?: number | string;
	/** How should this node be displayed? */
	readonly displayType?: NODE_DISPLAY_TYPES;
	/** Number in a series (e.g. annotation number) */
	readonly sequence?: number;
	/** The type of link */
	readonly linkType?: DynamicContentTypes;
	readonly attributes?: { [name: string]: string };
	/** If present, other nodes may refer to this node through the ID */
	readonly elementId?: string;
}

/** Full results of a parsed page */
export interface IParsedPage {
	/** Usually the file name */
	readonly id: string;
	/** The relative path of this page */
	readonly path: string;
	/** The page's metadata properties, from the front matter block */
	metaData: IPageMeta;
	/**  The parsed MD */
	readonly parsed: IParsedNode[];
	/** If not empty, ignore the data */
	readonly error?: string;
}
