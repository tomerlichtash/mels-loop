import { describe, expect, it } from 'vitest';

import { getObjectUrl } from '../../src/s3/client';

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
