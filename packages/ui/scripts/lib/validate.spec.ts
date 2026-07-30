import { describe, expect, it } from 'vitest';

import {
	extractVarNames,
	levenshtein,
	suggest,
	validateOverrides,
} from './validate';

describe('extractVarNames', () => {
	it('extracts variable names from any selector', () => {
		const css = `
			:root { --ml-blue: blue; --ml-red: red; }
			[data-theme="dark"] { --ml-blue: darkblue; }
		`;
		expect(extractVarNames(css)).toEqual(['--ml-blue', '--ml-red']);
	});

	it('returns empty array for no matches', () => {
		expect(extractVarNames('.foo { color: red; }')).toEqual([]);
	});

	it('ignores non --ml- variables', () => {
		const css = `:root { --ml-x: a; --other: b; }`;
		expect(extractVarNames(css)).toEqual(['--ml-x']);
	});
});

describe('levenshtein', () => {
	it('returns 0 for identical strings', () => {
		expect(levenshtein('abc', 'abc')).toBe(0);
	});

	it('returns length for empty string comparison', () => {
		expect(levenshtein('', 'abc')).toBe(3);
		expect(levenshtein('abc', '')).toBe(3);
	});

	it('counts single insertion', () => {
		expect(levenshtein('ac', 'abc')).toBe(1);
	});

	it('counts single deletion', () => {
		expect(levenshtein('abc', 'ac')).toBe(1);
	});

	it('counts single substitution', () => {
		expect(levenshtein('abc', 'axc')).toBe(1);
	});

	it('handles complex edits', () => {
		expect(levenshtein('kitten', 'sitting')).toBe(3);
	});
});

describe('suggest', () => {
	const candidates = new Set([
		'--ml-blue',
		'--ml-red',
		'--ml-pink',
		'--ml-color-primary',
	]);

	it('suggests closest match within distance 3', () => {
		expect(suggest('--ml-bue', candidates)).toBe('--ml-blue');
	});

	it('suggests for typo in longer name', () => {
		expect(suggest('--ml-color-primay', candidates)).toBe('--ml-color-primary');
	});

	it('returns null when no close match', () => {
		expect(suggest('--ml-something-totally-different', candidates)).toBeNull();
	});

	it('returns exact match at distance 0', () => {
		expect(suggest('--ml-pink', candidates)).toBe('--ml-pink');
	});

	it('returns null for empty candidate set', () => {
		expect(suggest('--ml-x', new Set())).toBeNull();
	});
});

describe('validateOverrides', () => {
	const baseVars = new Set(['--ml-blue', '--ml-red', '--ml-color-primary']);

	it('passes when all overrides are valid', () => {
		const result = validateOverrides(baseVars, [
			{
				name: 'brand.css',
				css: ':root { --ml-blue: navy; --ml-red: crimson; }',
			},
		]);
		expect(result.errors).toEqual([]);
		expect(result.totalOverrides).toBe(2);
		expect(result.fileCount).toBe(1);
		expect(result.baseVarCount).toBe(3);
	});

	it('detects orphaned variables', () => {
		const result = validateOverrides(baseVars, [
			{ name: 'brand.css', css: ':root { --ml-green: green; }' },
		]);
		expect(result.errors).toHaveLength(1);
		expect(result.errors[0].file).toBe('brand.css');
		expect(result.errors[0].name).toBe('--ml-green');
	});

	it('suggests corrections for typos', () => {
		const result = validateOverrides(baseVars, [
			{ name: 'brand.css', css: ':root { --ml-bue: blue; }' },
		]);
		expect(result.errors[0].suggestion).toBe('--ml-blue');
	});

	it('returns null suggestion when no close match', () => {
		const result = validateOverrides(baseVars, [
			{ name: 'brand.css', css: ':root { --ml-completely-unknown-var: x; }' },
		]);
		expect(result.errors[0].suggestion).toBeNull();
	});

	it('validates across multiple files', () => {
		const result = validateOverrides(baseVars, [
			{ name: 'a.css', css: ':root { --ml-blue: x; }' },
			{ name: 'b.css', css: ':root { --ml-red: y; --ml-oops: z; }' },
		]);
		expect(result.totalOverrides).toBe(3);
		expect(result.fileCount).toBe(2);
		expect(result.errors).toHaveLength(1);
		expect(result.errors[0].file).toBe('b.css');
	});

	it('handles empty brand files array', () => {
		const result = validateOverrides(baseVars, []);
		expect(result.errors).toEqual([]);
		expect(result.totalOverrides).toBe(0);
		expect(result.fileCount).toBe(0);
	});
});
