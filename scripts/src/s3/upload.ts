import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { lookup } from 'mime-types';
import path from 'path';

import { createS3Proxy, IS3Proxy } from './client';

const root = process.cwd();

const USAGE = 'Usage: upload <path> [path ...] [--tags tag1 [tag2...]]';

const fileExists = async (fullPath: string): Promise<boolean> => {
	try {
		const stat = await fs.promises.lstat(fullPath);
		return Boolean(stat?.isFile());
	} catch {
		return false;
	}
};

const objectExists = async (proxy: IS3Proxy, key: string) => {
	try {
		await proxy.client.send(
			new HeadObjectCommand({ Bucket: proxy.bucket, Key: key }),
		);
		return true;
	} catch {
		return false;
	}
};

const uploadOneFile = async (
	proxy: IS3Proxy,
	filePath: string,
	tags: string[],
) => {
	const basename = path.basename(filePath);
	const contentType = lookup(basename) || 'application/octet-stream';
	const key = encodeURIComponent(basename);

	const found = await objectExists(proxy, key);
	if (found) {
		throw new Error(`File ${key} already exists in bucket ${proxy.bucket}`);
	}

	const buf = await fs.promises.readFile(filePath);
	const cmd = new PutObjectCommand({
		Bucket: proxy.bucket,
		Key: key,
		Body: buf,
		ContentType: contentType,
		Tagging: tags.length
			? tags.map((t) => `${encodeURIComponent(t)}=true`).join('&')
			: undefined,
	});
	await proxy.client.send(cmd);
	return proxy.getObjectUrl(key);
};

const uploadFiles = async (paths: string[], tags: string[]) => {
	const proxy = createS3Proxy();

	// Validate all files exist before uploading
	const resolved = paths.map((p) => path.resolve(root, p));
	const missing: string[] = [];
	for (const fullPath of resolved) {
		if (!(await fileExists(fullPath))) {
			missing.push(fullPath);
		}
	}
	if (missing.length) {
		for (const m of missing) {
			console.error(`File not found: ${m}`);
		}
		return { uploaded: [] as string[], failed: missing };
	}

	// Upload in parallel
	const results = await Promise.allSettled(
		resolved.map(async (fullPath) => {
			console.log(`uploading ${fullPath}`);
			return uploadOneFile(proxy, fullPath, tags);
		}),
	);

	const uploaded: string[] = [];
	const failed: string[] = [];
	for (let i = 0; i < results.length; i++) {
		const r = results[i];
		if (r.status === 'fulfilled') {
			uploaded.push(r.value);
		} else {
			console.error(`Error uploading ${resolved[i]}:\n`, r.reason);
			failed.push(resolved[i]);
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
