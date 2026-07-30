import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptsRoot = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(scriptsRoot, '.env') });

export interface IS3Proxy {
	/**
	 * caller's responsibility to urlencode
	 */
	getObjectUrl(name: string): string;
	readonly client: S3Client;
	readonly bucket: string;
	readonly region: string;
}

// AWS_BUCKET and AWS_REGION must be in .env.
// Credentials (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) can come from .env
// or from the default AWS credential chain (~/.aws/credentials, env vars, etc.)
const REQUIRED_ENV_KEYS = ['AWS_BUCKET', 'AWS_REGION'] as const;

export function getObjectUrl(
	bucket: string,
	region: string,
	name: string,
): string {
	return `https://${bucket}.s3.${region}.amazonaws.com/${name}`;
}

class S3Proxy implements IS3Proxy {
	private _client: S3Client | null = null;

	constructor() {
		for (const key of REQUIRED_ENV_KEYS) {
			if (!process.env[key]) {
				throw new Error(
					`Missing environment variable ${key}. Required: ${REQUIRED_ENV_KEYS.join(', ')}`,
				);
			}
		}
	}

	public getObjectUrl(name: string): string {
		return getObjectUrl(this.bucket, this.region, name);
	}

	public get bucket() {
		return process.env.AWS_BUCKET || '';
	}

	public get region() {
		return process.env.AWS_REGION || '';
	}

	public get client(): S3Client {
		if (!this._client) {
			this._client = new S3Client({ region: this.region });
		}
		return this._client;
	}
}

export interface ListObjectsResult {
	key: string;
	size: number;
}

/**
 * Lists objects in a bucket with optional prefix. Handles pagination.
 */
export const listObjects = async (
	proxy: IS3Proxy,
	prefix?: string,
): Promise<ListObjectsResult[]> => {
	const objects: ListObjectsResult[] = [];
	let continuationToken: string | undefined;

	do {
		const response = await proxy.client.send(
			new ListObjectsV2Command({
				Bucket: proxy.bucket,
				Prefix: prefix,
				ContinuationToken: continuationToken,
			}),
		);
		for (const obj of response.Contents ?? []) {
			if (obj.Key) {
				objects.push({ key: obj.Key, size: obj.Size ?? 0 });
			}
		}
		continuationToken = response.IsTruncated
			? response.NextContinuationToken
			: undefined;
	} while (continuationToken);

	return objects;
};

export const createS3Proxy = (): IS3Proxy => {
	return new S3Proxy();
};
