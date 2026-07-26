const MEDIA_PREFIX = '/media/';

function getMediaBaseUrl(): string {
	const bucket = process.env.AWS_BUCKET;
	const region = process.env.AWS_REGION;
	if (!bucket || !region) return '';
	return `https://${bucket}.s3.${region}.amazonaws.com/`;
}

/**
 * Resolves a `/media/...` path to a full S3 URL when AWS env vars are set.
 * Returns the path unchanged otherwise (for local dev).
 */
export function resolveMediaUrl(path: string): string {
	const baseUrl = getMediaBaseUrl();
	if (!baseUrl || !path.startsWith(MEDIA_PREFIX)) return path;
	return baseUrl + path.slice(MEDIA_PREFIX.length);
}
