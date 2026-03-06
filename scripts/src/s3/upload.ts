import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { lookup } from 'mime-types';
import path from 'path';

import { createS3Proxy, IS3Proxy } from './client';

const root = process.cwd();

const USAGE = 'Usage: upload <path> [path ...] [--tags tag1 [tag2...]]';

/**
 * Recursively collects all files under a directory.
 * Returns objects with absolute path and the S3 key (relative to baseDir).
 */
export async function collectFiles(
	inputPath: string,
): Promise<{ filePath: string; key: string }[]> {
	const resolved = path.resolve(root, inputPath);
	const stat = await fs.promises.lstat(resolved);

	if (stat.isFile()) {
		return [
			{ filePath: resolved, key: encodeURIComponent(path.basename(resolved)) },
		];
	}

	if (!stat.isDirectory()) {
		return [];
	}

	const results: { filePath: string; key: string }[] = [];
	const walk = async (dir: string, prefix: string) => {
		const entries = await fs.promises.readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			const keyPath = prefix
				? `${prefix}/${encodeURIComponent(entry.name)}`
				: encodeURIComponent(entry.name);
			if (entry.isFile()) {
				results.push({ filePath: fullPath, key: keyPath });
			} else if (entry.isDirectory()) {
				await walk(fullPath, keyPath);
			}
		}
	};

	await walk(resolved, '');
	return results;
}

export const objectExists = async (proxy: IS3Proxy, key: string) => {
	try {
		await proxy.client.send(
			new HeadObjectCommand({ Bucket: proxy.bucket, Key: key }),
		);
		return true;
	} catch {
		return false;
	}
};

export const uploadOneFile = async (
	proxy: IS3Proxy,
	filePath: string,
	key: string,
	tags: string[],
) => {
	const contentType =
		lookup(path.basename(filePath)) || 'application/octet-stream';

	const found = await objectExists(proxy, key);
	if (found) {
		throw new Error(`${key} already exists in bucket ${proxy.bucket}`);
	}

	const buf = await fs.promises.readFile(filePath);
	await proxy.client.send(
		new PutObjectCommand({
			Bucket: proxy.bucket,
			Key: key,
			Body: buf,
			ContentType: contentType,
			Tagging: tags.length
				? tags.map((t) => `${encodeURIComponent(t)}=true`).join('&')
				: undefined,
		}),
	);
	return proxy.getObjectUrl(key);
};

const uploadFiles = async (paths: string[], tags: string[]) => {
	const proxy = createS3Proxy();

	// Collect all files (expanding directories recursively)
	const allFiles: { filePath: string; key: string }[] = [];
	const missing: string[] = [];

	for (const p of paths) {
		const resolved = path.resolve(root, p);
		try {
			await fs.promises.lstat(resolved);
			const files = await collectFiles(p);
			allFiles.push(...files);
		} catch {
			missing.push(resolved);
		}
	}

	if (missing.length) {
		for (const m of missing) {
			console.error(`Not found: ${m}`);
		}
		return { uploaded: [] as string[], failed: missing };
	}

	if (allFiles.length === 0) {
		console.log('No files to upload');
		return { uploaded: [] as string[], failed: [] as string[] };
	}

	console.log(`Uploading ${allFiles.length} file(s)`);

	const results = await Promise.allSettled(
		allFiles.map(async ({ filePath, key }) => {
			console.log(`  ${key}`);
			return uploadOneFile(proxy, filePath, key, tags);
		}),
	);

	const uploaded: string[] = [];
	const failed: string[] = [];
	for (let i = 0; i < results.length; i++) {
		const r = results[i];
		if (r.status === 'fulfilled') {
			uploaded.push(r.value);
		} else {
			console.error(`Error uploading ${allFiles[i].key}:\n`, r.reason);
			failed.push(allFiles[i].filePath);
		}
	}
	return { uploaded, failed };
};

/**
 * Splits comma-separated args into individual items.
 */
export function parseList(args: string[]): string[] {
	return args
		.flatMap((arg) => arg.split(',').map((s) => s.trim()))
		.filter(Boolean);
}

export interface ParsedArgs {
	files: string[];
	tags: string[];
	error: string;
}

/**
 * Parses CLI arguments after the script name (argv[2+]).
 */
export function parseArgs(argv: string[]): ParsedArgs {
	const fail = (error: string): ParsedArgs => ({
		files: [],
		tags: [],
		error,
	});

	// argv[0] = node, argv[1] = script path
	const args = argv.slice(2);

	if (args.length === 0) {
		return fail('no files provided');
	}

	const tagIndex = args.indexOf('--tags');

	if (tagIndex < 0) {
		return { files: parseList(args), tags: [], error: '' };
	}

	if (tagIndex === 0) {
		return fail('no files provided');
	}

	const files = parseList(args.slice(0, tagIndex));
	const tags = parseList(args.slice(tagIndex + 1));

	if (files.length < 1) {
		return fail('no valid file name specified');
	}
	if (tags.length < 1) {
		return fail('--tags should be followed by a list of tags');
	}

	return { files, tags, error: '' };
}

const isMain =
	process.argv[1] &&
	import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMain) {
	const args = parseArgs(process.argv);
	if (args.error) {
		console.error(`Error: ${args.error}\n${USAGE}`);
		process.exit(1);
	}
	uploadFiles(args.files, args.tags)
		.then((result) => {
			if (result.uploaded.length) {
				console.log(`Uploaded:\n\t${result.uploaded.join('\n\t')}`);
			}
			if (result.failed.length) {
				console.log(`Failed:\n\t${result.failed.join('\n\t')}`);
			}
		})
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {
			process.exit();
		});
}
