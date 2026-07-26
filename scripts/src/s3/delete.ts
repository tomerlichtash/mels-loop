import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

import { createS3Proxy, IS3Proxy, listObjects } from './client';

const USAGE = 'Usage: delete <key> [key ...] [--prefix <prefix>]';

/**
 * Parses CLI arguments for the delete command.
 * Supports individual keys and --prefix for folder-like deletion.
 */
export function parseDeleteArgs(argv: string[]): {
	keys: string[];
	prefixes: string[];
	error: string;
} {
	const fail = (error: string) => ({
		keys: [] as string[],
		prefixes: [] as string[],
		error,
	});

	const args = argv.slice(2);
	if (args.length === 0) {
		return fail('no keys or prefixes provided');
	}

	const keys: string[] = [];
	const prefixes: string[] = [];
	let i = 0;

	while (i < args.length) {
		if (args[i] === '--prefix') {
			i++;
			if (i >= args.length) {
				return fail('--prefix requires a value');
			}
			prefixes.push(args[i]);
		} else {
			keys.push(args[i]);
		}
		i++;
	}

	if (keys.length === 0 && prefixes.length === 0) {
		return fail('no keys or prefixes provided');
	}

	return { keys, prefixes, error: '' };
}

export const listByPrefix = async (proxy: IS3Proxy, prefix: string) => {
	const objects = await listObjects(proxy, prefix);
	return objects.map((o) => o.key);
};

export const deleteKeys = async (proxy: IS3Proxy, keys: string[]) => {
	if (keys.length === 0) return 0;

	// DeleteObjects supports max 1000 keys per request
	let deleted = 0;
	for (let i = 0; i < keys.length; i += 1000) {
		const batch = keys.slice(i, i + 1000);
		const response = await proxy.client.send(
			new DeleteObjectsCommand({
				Bucket: proxy.bucket,
				Delete: {
					Objects: batch.map((Key) => ({ Key })),
					Quiet: true,
				},
			}),
		);
		const errors = response.Errors ?? [];
		if (errors.length) {
			for (const err of errors) {
				console.error(`  Failed to delete ${err.Key}: ${err.Message}`);
			}
		}
		deleted += batch.length - errors.length;
	}
	return deleted;
};

const run = async (keys: string[], prefixes: string[]) => {
	const proxy = createS3Proxy();
	const allKeys = [...keys];

	for (const prefix of prefixes) {
		console.log(`Listing objects with prefix "${prefix}"...`);
		const found = await listByPrefix(proxy, prefix);
		if (found.length === 0) {
			console.log(`  No objects found for prefix "${prefix}"`);
		} else {
			console.log(`  Found ${found.length} object(s)`);
			allKeys.push(...found);
		}
	}

	if (allKeys.length === 0) {
		console.log('Nothing to delete');
		return;
	}

	console.log(`Deleting ${allKeys.length} object(s)...`);
	for (const key of allKeys) {
		console.log(`  ${key}`);
	}
	const deleted = await deleteKeys(proxy, allKeys);
	console.log(`Deleted ${deleted}/${allKeys.length} object(s)`);
};

const isMain =
	process.argv[1] &&
	import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMain) {
	const args = parseDeleteArgs(process.argv);
	if (args.error) {
		console.error(`Error: ${args.error}\n${USAGE}`);
		process.exit(1);
	}
	run(args.keys, args.prefixes)
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {
			process.exit();
		});
}
