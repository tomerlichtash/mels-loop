import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Readable } from 'stream';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { IS3Proxy } from '../../src/s3/client';
import { downloadOne, resolveOutputDir } from '../../src/s3/download';

describe('resolveOutputDir', () => {
	const defaultDir = '/default/media';

	it('returns default when no arg provided', () => {
		expect(resolveOutputDir(undefined, '/repo', defaultDir)).toBe(
			'/default/media',
		);
	});

	it('resolves absolute path as-is', () => {
		expect(resolveOutputDir('/tmp/out', '/repo', defaultDir)).toBe('/tmp/out');
	});

	it('resolves relative path against cwd', () => {
		expect(
			resolveOutputDir('./apps/web/public/media', '/repo', defaultDir),
		).toBe('/repo/apps/web/public/media');
	});

	it('resolves relative path against cwd, not script dir', () => {
		expect(resolveOutputDir('../output', '/repo/scripts', defaultDir)).toBe(
			'/repo/output',
		);
	});
});

describe('downloadOne', () => {
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
		tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 's3-dl-test-'));
	});

	afterEach(async () => {
		await fs.promises.rm(tmpDir, { recursive: true });
	});

	it('downloads a file to the output directory', async () => {
		const body = Readable.from(Buffer.from('file content'));
		s3Mock.on(GetObjectCommand).resolves({ Body: body as never });

		const dest = await downloadOne(proxy, 'photo.jpg', tmpDir);
		expect(dest).toBe(path.join(tmpDir, 'photo.jpg'));

		const content = await fs.promises.readFile(dest, 'utf-8');
		expect(content).toBe('file content');
	});

	it('decodes URL-encoded keys', async () => {
		const body = Readable.from(Buffer.from('data'));
		s3Mock.on(GetObjectCommand).resolves({ Body: body as never });

		const dest = await downloadOne(proxy, 'my%20file.jpg', tmpDir);
		expect(path.basename(dest)).toBe('my file.jpg');
	});

	it('throws on empty response body', async () => {
		s3Mock.on(GetObjectCommand).resolves({ Body: undefined });

		await expect(downloadOne(proxy, 'missing.jpg', tmpDir)).rejects.toThrow(
			'Empty response',
		);
	});
});
