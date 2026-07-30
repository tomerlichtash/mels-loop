import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
	extractSourceIds,
	mediaBaseUrl,
	resolveMediaPath,
	resolveSource,
} from '../src/helpers/parse';

describe('mediaBaseUrl', () => {
	const original = { ...process.env };

	beforeEach(() => {
		delete process.env.AWS_BUCKET;
		delete process.env.AWS_REGION;
	});

	afterEach(() => {
		process.env = { ...original };
	});

	it('builds the S3 base URL when both env vars are set', () => {
		process.env.AWS_BUCKET = 'mels-loop-media';
		process.env.AWS_REGION = 'eu-north-1';
		expect(mediaBaseUrl()).toBe(
			'https://mels-loop-media.s3.eu-north-1.amazonaws.com/',
		);
	});

	it('returns empty string when the bucket is missing', () => {
		process.env.AWS_REGION = 'eu-north-1';
		expect(mediaBaseUrl()).toBe('');
	});

	it('returns empty string when the region is missing', () => {
		process.env.AWS_BUCKET = 'mels-loop-media';
		expect(mediaBaseUrl()).toBe('');
	});

	it('returns empty string when both are missing', () => {
		expect(mediaBaseUrl()).toBe('');
	});
});

describe('resolveMediaPath', () => {
	const original = { ...process.env };

	beforeEach(() => {
		process.env.AWS_BUCKET = 'mels-loop-media';
		process.env.AWS_REGION = 'eu-north-1';
	});

	afterEach(() => {
		process.env = { ...original };
	});

	it('rewrites a /media/ path to the external URL', () => {
		expect(resolveMediaPath('/media/images/mel.jpg')).toBe(
			'https://mels-loop-media.s3.eu-north-1.amazonaws.com/images/mel.jpg',
		);
	});

	it('leaves non-/media/ URLs untouched', () => {
		expect(resolveMediaPath('https://example.com/photo.jpg')).toBe(
			'https://example.com/photo.jpg',
		);
		expect(resolveMediaPath('/assets/logo.svg')).toBe('/assets/logo.svg');
	});

	it('leaves /media/ paths relative when the env vars are unset', () => {
		delete process.env.AWS_BUCKET;
		delete process.env.AWS_REGION;
		expect(resolveMediaPath('/media/images/mel.jpg')).toBe(
			'/media/images/mel.jpg',
		);
	});
});

describe('extractSourceIds', () => {
	it('returns empty array for markdown with no source references', () => {
		expect(extractSourceIds('# Hello world')).toEqual([]);
	});

	it('extracts IDs from image embeds with sources/', () => {
		const md = '![photo](sources/mel-kaye-photo)';
		expect(extractSourceIds(md)).toEqual(['mel-kaye-photo']);
	});

	it('extracts IDs from image embeds with source/ (singular)', () => {
		const md = '![photo](source/mel-kaye-photo)';
		expect(extractSourceIds(md)).toEqual(['mel-kaye-photo']);
	});

	it('extracts IDs from template vars', () => {
		const md = 'By {{sources/mel-kaye-photo:author}}';
		expect(extractSourceIds(md)).toEqual(['mel-kaye-photo']);
	});

	it('extracts IDs from singular template vars', () => {
		const md = 'By {{source/mel-kaye-photo:author}}';
		expect(extractSourceIds(md)).toEqual(['mel-kaye-photo']);
	});

	it('deduplicates IDs across images and vars', () => {
		const md = [
			'![photo](sources/mel-kaye-photo)',
			'Credit: {{sources/mel-kaye-photo:credit}}',
		].join('\n');
		expect(extractSourceIds(md)).toEqual(['mel-kaye-photo']);
	});

	it('extracts multiple distinct IDs', () => {
		const md = [
			'![a](sources/photo-a)',
			'![b](sources/photo-b)',
			'{{sources/doc-c:title}}',
		].join('\n');
		const ids = extractSourceIds(md);
		expect(ids).toHaveLength(3);
		expect(ids).toContain('photo-a');
		expect(ids).toContain('photo-b');
		expect(ids).toContain('doc-c');
	});

	it('handles empty alt text in image embeds', () => {
		expect(extractSourceIds('![](sources/empty-alt)')).toEqual(['empty-alt']);
	});

	it('handles various field names in template vars', () => {
		const md = [
			'{{sources/s1:title}}',
			'{{sources/s1:author}}',
			'{{sources/s1:credit}}',
			'{{sources/s2:url}}',
		].join('\n');
		const ids = extractSourceIds(md);
		expect(ids).toHaveLength(2);
		expect(ids).toContain('s1');
		expect(ids).toContain('s2');
	});

	it('does not match regular markdown links', () => {
		const md = '[click here](sources/not-an-image)';
		expect(extractSourceIds(md)).toEqual([]);
	});

	it('does not match malformed template vars', () => {
		const md = '{{sources/missing-field}}';
		expect(extractSourceIds(md)).toEqual([]);
	});

	it('works correctly when called multiple times (regex lastIndex reset)', () => {
		const md = '![a](sources/first)';
		expect(extractSourceIds(md)).toEqual(['first']);
		expect(extractSourceIds(md)).toEqual(['first']);
	});
});

describe('resolveSource', () => {
	it('merges source with messages', () => {
		const source = {
			id: 'photo-1',
			type: 'image' as const,
			url: 'https://example.com/photo.jpg',
			author: 'Jane Doe',
		};
		const messages = {
			title: 'A Photo',
			description: 'A nice photo',
		};
		const resolved = resolveSource(source, messages);
		expect(resolved).toEqual({
			id: 'photo-1',
			type: 'image',
			url: 'https://example.com/photo.jpg',
			author: 'Jane Doe',
			title: 'A Photo',
			description: 'A nice photo',
		});
	});

	it('messages override source fields with same name', () => {
		const source = {
			id: 'doc-1',
			type: 'text' as const,
			url: 'https://example.com',
		};
		const messages = { title: 'Document Title' };
		const resolved = resolveSource(source, messages);
		expect(resolved.title).toBe('Document Title');
		expect(resolved.id).toBe('doc-1');
	});

	it('preserves optional source fields', () => {
		const source = {
			id: 'src-1',
			type: 'pdf' as const,
			url: 'https://example.com/doc.pdf',
			date: '2023-01-01',
			credit: 'Library',
			license: 'public-domain' as const,
			tags: ['history'],
		};
		const messages = { title: 'PDF Document' };
		const resolved = resolveSource(source, messages);
		expect(resolved.date).toBe('2023-01-01');
		expect(resolved.credit).toBe('Library');
		expect(resolved.license).toBe('public-domain');
		expect(resolved.tags).toEqual(['history']);
	});

	it('handles missing optional message fields', () => {
		const source = {
			id: 'src-1',
			type: 'link' as const,
			url: 'https://example.com',
		};
		const messages = { title: 'Link' };
		const resolved = resolveSource(source, messages);
		expect(resolved.description).toBeUndefined();
	});
});
