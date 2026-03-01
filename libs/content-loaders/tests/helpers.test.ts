import { describe, expect, it } from 'vitest';

import { extractSourceIds, resolveSource } from '../src/helpers/parse';

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
