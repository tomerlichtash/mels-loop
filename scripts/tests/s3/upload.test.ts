import { describe, expect, it } from 'vitest';

import { parseArgs, parseList } from '../../src/s3/upload';

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
