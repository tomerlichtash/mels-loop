import {
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { IS3Proxy } from '../../src/s3/client';
import {
	collectFiles,
	objectExists,
	parseArgs,
	parseList,
	uploadOneFile,
} from '../../src/s3/upload';

describe('parseList', () => {
	it('returns individual args as-is', () => {
		expect(parseList(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
	});

	it('splits comma-separated values', () => {
		expect(parseList(['a,b', 'c'])).toEqual(['a', 'b', 'c']);
	});

	it('trims whitespace around values', () => {
		expect(parseList(['a , b'])).toEqual(['a', 'b']);
	});

	it('filters empty strings', () => {
		expect(parseList(['a,,b', ''])).toEqual(['a', 'b']);
	});

	it('returns empty array for empty input', () => {
		expect(parseList([])).toEqual([]);
	});
});

describe('parseArgs', () => {
	const argv = (args: string[]) => ['node', 'upload-files.ts', ...args];

	it('parses file paths without tags', () => {
		const result = parseArgs(argv(['file1.jpg', 'file2.png']));
		expect(result).toEqual({
			files: ['file1.jpg', 'file2.png'],
			tags: [],
			error: '',
		});
	});

	it('parses files with tags', () => {
		const result = parseArgs(argv(['file1.jpg', '--tags', 'hero', 'banner']));
		expect(result).toEqual({
			files: ['file1.jpg'],
			tags: ['hero', 'banner'],
			error: '',
		});
	});

	it('supports comma-separated files and tags', () => {
		const result = parseArgs(argv(['a.jpg,b.jpg', '--tags', 'x,y']));
		expect(result).toEqual({
			files: ['a.jpg', 'b.jpg'],
			tags: ['x', 'y'],
			error: '',
		});
	});

	it('errors when no args provided', () => {
		const result = parseArgs(argv([]));
		expect(result.error).toBe('no files provided');
		expect(result.files).toEqual([]);
	});

	it('errors when --tags is first arg (no files)', () => {
		const result = parseArgs(argv(['--tags', 'hero']));
		expect(result.error).toBe('no files provided');
	});

	it('errors when --tags has no values', () => {
		const result = parseArgs(argv(['file.jpg', '--tags']));
		expect(result.error).toBe('--tags should be followed by a list of tags');
	});
});

describe('collectFiles', () => {
	let tmpDir: string;

	beforeEach(async () => {
		tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'upload-test-'));
	});

	afterEach(async () => {
		await fs.promises.rm(tmpDir, { recursive: true });
	});

	it('collects a single file', async () => {
		const file = path.join(tmpDir, 'photo.jpg');
		await fs.promises.writeFile(file, 'data');

		const result = await collectFiles(file);
		expect(result).toHaveLength(1);
		expect(result[0].key).toBe('photo.jpg');
		expect(result[0].filePath).toBe(file);
	});

	it('collects files from a directory', async () => {
		await fs.promises.writeFile(path.join(tmpDir, 'a.jpg'), 'data');
		await fs.promises.writeFile(path.join(tmpDir, 'b.png'), 'data');

		const result = await collectFiles(tmpDir);
		const keys = result.map((r) => r.key).sort();
		expect(keys).toEqual(['a.jpg', 'b.png']);
	});

	it('collects files from nested subdirectories', async () => {
		const sub = path.join(tmpDir, 'sub');
		await fs.promises.mkdir(sub);
		await fs.promises.writeFile(path.join(tmpDir, 'root.jpg'), 'data');
		await fs.promises.writeFile(path.join(sub, 'nested.png'), 'data');

		const result = await collectFiles(tmpDir);
		const keys = result.map((r) => r.key).sort();
		expect(keys).toEqual(['root.jpg', 'sub/nested.png']);
	});

	it('returns empty array for empty directory', async () => {
		const result = await collectFiles(tmpDir);
		expect(result).toEqual([]);
	});
});

describe('S3 operations', () => {
	const s3Mock = mockClient(S3Client);
	const proxy: IS3Proxy = {
		bucket: 'test-bucket',
		region: 'us-east-1',
		getObjectUrl: (name) =>
			`https://test-bucket.s3.us-east-1.amazonaws.com/${name}`,
		client: new S3Client({ region: 'us-east-1' }),
	};

	let tmpDir: string;

	beforeEach(async () => {
		s3Mock.reset();
		tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 's3-test-'));
	});

	afterEach(async () => {
		await fs.promises.rm(tmpDir, { recursive: true });
	});

	describe('objectExists', () => {
		it('returns true when object exists', async () => {
			s3Mock.on(HeadObjectCommand).resolves({ $metadata: {} });
			expect(await objectExists(proxy, 'file.jpg')).toBe(true);
		});

		it('returns false when object does not exist', async () => {
			s3Mock.on(HeadObjectCommand).rejects(new Error('NotFound'));
			expect(await objectExists(proxy, 'missing.jpg')).toBe(false);
		});
	});

	describe('uploadOneFile', () => {
		it('uploads a new file', async () => {
			s3Mock.on(HeadObjectCommand).rejects(new Error('NotFound'));
			s3Mock.on(PutObjectCommand).resolves({ $metadata: {} });

			const file = path.join(tmpDir, 'test.jpg');
			await fs.promises.writeFile(file, 'image data');

			const url = await uploadOneFile(proxy, file, 'test.jpg', []);
			expect(url).toBe(
				'https://test-bucket.s3.us-east-1.amazonaws.com/test.jpg',
			);
		});

		it('uploads with tags', async () => {
			s3Mock.on(HeadObjectCommand).rejects(new Error('NotFound'));
			s3Mock.on(PutObjectCommand).resolves({ $metadata: {} });

			const file = path.join(tmpDir, 'test.jpg');
			await fs.promises.writeFile(file, 'image data');

			await uploadOneFile(proxy, file, 'test.jpg', ['hero', 'banner']);
			const putCall = s3Mock.commandCalls(PutObjectCommand)[0];
			expect(putCall.args[0].input.Tagging).toBe('hero=true&banner=true');
		});

		it('rejects when file already exists in bucket', async () => {
			s3Mock.on(HeadObjectCommand).resolves({ $metadata: {} });

			const file = path.join(tmpDir, 'test.jpg');
			await fs.promises.writeFile(file, 'data');

			await expect(uploadOneFile(proxy, file, 'test.jpg', [])).rejects.toThrow(
				'already exists',
			);
		});

		it('sets correct content type', async () => {
			s3Mock.on(HeadObjectCommand).rejects(new Error('NotFound'));
			s3Mock.on(PutObjectCommand).resolves({ $metadata: {} });

			const file = path.join(tmpDir, 'doc.pdf');
			await fs.promises.writeFile(file, 'pdf data');

			await uploadOneFile(proxy, file, 'doc.pdf', []);
			const putCall = s3Mock.commandCalls(PutObjectCommand)[0];
			expect(putCall.args[0].input.ContentType).toBe('application/pdf');
		});
	});
});
