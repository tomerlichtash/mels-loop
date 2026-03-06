import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { beforeEach, describe, expect, it } from 'vitest';

import type { IS3Proxy } from '../../src/s3/client';
import { deleteKeys, parseDeleteArgs } from '../../src/s3/delete';

describe('parseDeleteArgs', () => {
	const argv = (args: string[]) => ['node', 'delete.ts', ...args];

	it('parses individual keys', () => {
		const result = parseDeleteArgs(argv(['file1.jpg', 'file2.png']));
		expect(result).toEqual({
			keys: ['file1.jpg', 'file2.png'],
			prefixes: [],
			error: '',
		});
	});

	it('parses --prefix flag', () => {
		const result = parseDeleteArgs(argv(['--prefix', 'photos/']));
		expect(result).toEqual({
			keys: [],
			prefixes: ['photos/'],
			error: '',
		});
	});

	it('mixes keys and prefixes', () => {
		const result = parseDeleteArgs(
			argv(['file.jpg', '--prefix', 'folder/', 'other.png']),
		);
		expect(result).toEqual({
			keys: ['file.jpg', 'other.png'],
			prefixes: ['folder/'],
			error: '',
		});
	});

	it('supports multiple prefixes', () => {
		const result = parseDeleteArgs(argv(['--prefix', 'a/', '--prefix', 'b/']));
		expect(result).toEqual({
			keys: [],
			prefixes: ['a/', 'b/'],
			error: '',
		});
	});

	it('errors when no args provided', () => {
		const result = parseDeleteArgs(argv([]));
		expect(result.error).toBe('no keys or prefixes provided');
	});

	it('errors when --prefix has no value', () => {
		const result = parseDeleteArgs(argv(['--prefix']));
		expect(result.error).toBe('--prefix requires a value');
	});
});

describe('deleteKeys', () => {
	const s3Mock = mockClient(S3Client);
	const proxy: IS3Proxy = {
		bucket: 'test-bucket',
		region: 'us-east-1',
		getObjectUrl: (name) =>
			`https://test-bucket.s3.us-east-1.amazonaws.com/${name}`,
		client: new S3Client({ region: 'us-east-1' }),
	};

	beforeEach(() => {
		s3Mock.reset();
	});

	it('deletes objects by key', async () => {
		s3Mock.on(DeleteObjectsCommand).resolves({ Errors: [] });

		const count = await deleteKeys(proxy, ['a.jpg', 'b.jpg']);
		expect(count).toBe(2);

		const call = s3Mock.commandCalls(DeleteObjectsCommand)[0];
		expect(call.args[0].input.Delete?.Objects).toEqual([
			{ Key: 'a.jpg' },
			{ Key: 'b.jpg' },
		]);
	});

	it('returns 0 for empty keys array', async () => {
		const count = await deleteKeys(proxy, []);
		expect(count).toBe(0);
		expect(s3Mock.commandCalls(DeleteObjectsCommand)).toHaveLength(0);
	});

	it('reports partial failures', async () => {
		s3Mock.on(DeleteObjectsCommand).resolves({
			Errors: [{ Key: 'b.jpg', Message: 'AccessDenied' }],
		});

		const count = await deleteKeys(proxy, ['a.jpg', 'b.jpg']);
		expect(count).toBe(1);
	});
});
