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
	return {
		...source,
		...messages,
		url: resolveMediaPath(source.url),
		...(source.image ? { image: resolveMediaPath(source.image) } : {}),
	};
}

export const MEDIA_PREFIX = '/media/';

/**
 * The external base URL that `/media/` paths resolve to, derived from the S3
 * env vars. Returns '' when either is unset, which callers treat as "leave
 * media paths relative".
 *
 * Single source of truth: `rehypeMediaBaseUrl` is configured from this too.
 */
export function mediaBaseUrl(): string {
	const bucket = process.env.AWS_BUCKET;
	const region = process.env.AWS_REGION;
	if (!bucket || !region) return '';
	return `https://${bucket}.s3.${region}.amazonaws.com/`;
}

/** Rewrites a single `/media/...` path to its external URL, if configured. */
export function resolveMediaPath(url: string): string {
	if (!url.startsWith(MEDIA_PREFIX)) return url;
	const baseUrl = mediaBaseUrl();
	if (!baseUrl) return url;
	return baseUrl + url.slice(MEDIA_PREFIX.length);
}
