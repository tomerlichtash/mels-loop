import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import { beforeEach, describe, expect, it } from 'vitest';

import { getObjectUrl, type IS3Proxy, listObjects } from '../../src/s3/client';

describe('getObjectUrl', () => {
	it('builds correct S3 URL', () => {
		const url = getObjectUrl('my-bucket', 'us-east-1', 'photo.jpg');
		expect(url).toBe('https://my-bucket.s3.us-east-1.amazonaws.com/photo.jpg');
	});

	it('preserves encoded characters in name', () => {
		const url = getObjectUrl('bucket', 'eu-west-1', 'my%20file.jpg');
		expect(url).toBe('https://bucket.s3.eu-west-1.amazonaws.com/my%20file.jpg');
	});
});

describe('listObjects', () => {
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

	it('lists objects from bucket', async () => {
		s3Mock.on(ListObjectsV2Command).resolves({
			Contents: [
				{ Key: 'a.jpg', Size: 1000 },
				{ Key: 'b.png', Size: 2000 },
			],
			IsTruncated: false,
		});

		const objects = await listObjects(proxy);
		expect(objects).toEqual([
			{ key: 'a.jpg', size: 1000 },
			{ key: 'b.png', size: 2000 },
		]);
	});

	it('filters by prefix', async () => {
		s3Mock.on(ListObjectsV2Command).resolves({
			Contents: [{ Key: 'photos/a.jpg', Size: 100 }],
			IsTruncated: false,
		});

		const objects = await listObjects(proxy, 'photos/');
		expect(objects).toEqual([{ key: 'photos/a.jpg', size: 100 }]);

		const call = s3Mock.commandCalls(ListObjectsV2Command)[0];
		expect(call.args[0].input.Prefix).toBe('photos/');
	});

	it('paginates through results', async () => {
		s3Mock
			.on(ListObjectsV2Command)
			.resolvesOnce({
				Contents: [{ Key: 'a.jpg', Size: 100 }],
				IsTruncated: true,
				NextContinuationToken: 'token1',
			})
			.resolvesOnce({
				Contents: [{ Key: 'b.jpg', Size: 200 }],
				IsTruncated: false,
			});

		const objects = await listObjects(proxy);
		expect(objects).toHaveLength(2);
		expect(objects[1].key).toBe('b.jpg');
	});

	it('returns empty array for empty bucket', async () => {
		s3Mock.on(ListObjectsV2Command).resolves({
			Contents: undefined,
			IsTruncated: false,
		});

		const objects = await listObjects(proxy);
		expect(objects).toEqual([]);
	});
});
