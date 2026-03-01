import type { ResolvedSource, Source, SourceMessages } from '../types';

/** Matches ![alt](sources/id) or ![alt](source/id) */
const SOURCE_IMAGE_RE = /!\[[^\]]*\]\(sources?\/([^)]+)\)/gi;
/** Matches {{sources/id:field}} or {{source/id:field}} */
const SOURCE_VAR_RE = /\{\{sources?\/([^:}]+):[^}]+\}\}/gi;

/**
 * Scans raw markdown content for all `sources/id` references (image embeds and
 * template vars) and returns the unique IDs.
 */
export function extractSourceIds(raw: string): string[] {
	const ids = new Set<string>();
	for (const match of raw.matchAll(SOURCE_IMAGE_RE)) {
		ids.add(match[1]);
	}
	for (const match of raw.matchAll(SOURCE_VAR_RE)) {
		ids.add(match[1]);
	}
	return [...ids];
}

/** Merges a source with its locale messages into a display-ready record. */
export function resolveSource(
	source: Source,
	messages: SourceMessages,
): ResolvedSource {
	return { ...source, ...messages };
}
