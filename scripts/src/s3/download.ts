import { GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

import { createS3Proxy, IS3Proxy, listObjects } from './client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_OUTPUT = path.resolve(
	__dirname,
	'../../../apps/web/public/media',
);

/**
 * Resolves the output directory from a CLI argument.
 * Relative paths resolve against cwd, not the script location.
 */
export function resolveOutputDir(
	arg: string | undefined,
	cwd: string,
	defaultDir: string,
): string {
	if (!arg) return defaultDir;
	const expanded = arg.startsWith('~/')
		? path.join(process.env.HOME || '', arg.slice(1))
		: arg;
	return path.resolve(cwd, expanded);
}

export const downloadOne = async (
	proxy: IS3Proxy,
	key: string,
	outDir: string,
) => {
	const response = await proxy.client.send(
		new GetObjectCommand({ Bucket: proxy.bucket, Key: key }),
	);
	if (!response.Body) {
		throw new Error(`Empty response for ${key}`);
	}
	const filename = decodeURIComponent(key);
	const dest = path.join(outDir, filename);
	await fs.promises.mkdir(path.dirname(dest), { recursive: true });
	await pipeline(response.Body as Readable, fs.createWriteStream(dest));
	return dest;
};

export const downloadAll = async (outDir: string) => {
	const proxy = createS3Proxy();
	await fs.promises.mkdir(outDir, { recursive: true });

	const objects = await listObjects(proxy);
	if (objects.length === 0) {
		console.log('Bucket is empty');
		return;
	}

	console.log(`Found ${objects.length} objects, downloading to ${outDir}`);

	const results = await Promise.allSettled(
		objects.map(async ({ key, size }) => {
			const dest = await downloadOne(proxy, key, outDir);
			console.log(
				`  ${decodeURIComponent(key)} (${(size / 1000).toFixed(1)}KB)`,
			);
			return dest;
		}),
	);

	const succeeded = results.filter((r) => r.status === 'fulfilled').length;
	const failed = results.filter((r) => r.status === 'rejected');

	console.log(`\nDownloaded ${succeeded}/${objects.length} files`);
	for (const f of failed) {
		console.error('  Failed:', (f as PromiseRejectedResult).reason);
	}
};

export const downloadFile = async (key: string, outDir: string) => {
	const proxy = createS3Proxy();
	await fs.promises.mkdir(outDir, { recursive: true });

	console.log(`Downloading ${key} to ${outDir}`);
	const dest = await downloadOne(proxy, key, outDir);
	console.log(`  saved to ${dest}`);
};
