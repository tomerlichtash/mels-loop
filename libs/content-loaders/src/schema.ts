import { z } from 'zod';

import type { Source } from './types';

const sourceType = z.enum([
	'image',
	'pdf',
	'document',
	'audio',
	'video',
	'link',
	'text',
	'archive',
	'other',
]);

const standing = z.enum(['primary', 'secondary']);

const license = z.enum([
	'public-domain',
	'cc-by',
	'cc-by-sa',
	'cc-by-nc-sa',
	'fair-use',
	'all-rights-reserved',
	'unknown',
]);

/**
 * Shape validation for a source record. The `satisfies` clause keeps the
 * schema and the `Source` interface from drifting apart silently.
 */
export const sourceSchema = z.strictObject({
	id: z.string().min(1),
	type: sourceType,
	standing,
	url: z.string().min(1),
	image: z.string().optional(),
	author: z.string().optional(),
	date: z.string().optional(),
	source: z.string().optional(),
	repository: z.string().optional(),
	license: license.optional(),
	tags: z.array(z.string()).optional(),
	page: z.string().optional(),
	repositoryUrl: z.string().optional(),
}) satisfies z.ZodType<Source>;

/** Parses a source record, failing the build with the file path on error. */
export function parseSource(data: unknown, filePath: string): Source {
	const result = sourceSchema.safeParse(data);
	if (!result.success) {
		throw new Error(
			`Invalid source record at ${filePath}:\n${z.prettifyError(result.error)}`,
		);
	}
	return result.data;
}
