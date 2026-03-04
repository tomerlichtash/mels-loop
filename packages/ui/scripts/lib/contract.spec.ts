import { describe, expect, it } from 'vitest';

import { buildContract, extractVars, resolve } from './contract';

describe('extractVars', () => {
	it('extracts variables from :root block', () => {
		const css = `:root {
			--ml-blue: oklch(0.55 0.15 250);
			--ml-red: oklch(0.5 0.2 27);
		}`;
		expect(extractVars(css)).toEqual([
			['--ml-blue', 'oklch(0.55 0.15 250)'],
			['--ml-red', 'oklch(0.5 0.2 27)'],
		]);
	});

	it('returns empty array when no :root block', () => {
		expect(extractVars('.foo { --ml-x: red; }')).toEqual([]);
	});

	it('returns empty array for empty :root', () => {
		expect(extractVars(':root {}')).toEqual([]);
	});

	it('ignores non --ml- variables', () => {
		const css = `:root {
			--ml-blue: blue;
			--other: red;
		}`;
		expect(extractVars(css)).toEqual([['--ml-blue', 'blue']]);
	});

	it('trims whitespace from values', () => {
		const css = `:root { --ml-x:   oklch(0.5 0 0)  ; }`;
		expect(extractVars(css)).toEqual([['--ml-x', 'oklch(0.5 0 0)']]);
	});

	it('handles values with var() references', () => {
		const css = `:root { --ml-primary: var(--ml-blue); }`;
		expect(extractVars(css)).toEqual([['--ml-primary', 'var(--ml-blue)']]);
	});

	it('extracts vars next to comments', () => {
		const css = `:root {
			/* A comment */
			--ml-x: red;
		}`;
		expect(extractVars(css)).toEqual([['--ml-x', 'red']]);
	});

	it('handles oklch values with alpha', () => {
		const css = `:root { --ml-overlay: oklch(0 0 0 / 0.5); }`;
		expect(extractVars(css)).toEqual([['--ml-overlay', 'oklch(0 0 0 / 0.5)']]);
	});
});

describe('resolve', () => {
	const lookup = new Map<string, string>([
		['--ml-blue', 'oklch(0.55 0.15 250)'],
		['--ml-primary', 'var(--ml-blue)'],
		['--ml-deep', 'var(--ml-primary)'],
	]);

	it('resolves single var() reference', () => {
		expect(resolve('var(--ml-blue)', lookup)).toBe('oklch(0.55 0.15 250)');
	});

	it('resolves chained var() references', () => {
		expect(resolve('var(--ml-primary)', lookup)).toBe('oklch(0.55 0.15 250)');
	});

	it('resolves deeply nested var() references', () => {
		expect(resolve('var(--ml-deep)', lookup)).toBe('oklch(0.55 0.15 250)');
	});

	it('keeps unresolvable var() references as-is', () => {
		expect(resolve('var(--ml-unknown)', lookup)).toBe('var(--ml-unknown)');
	});

	it('returns concrete values unchanged', () => {
		expect(resolve('oklch(0.5 0 0)', lookup)).toBe('oklch(0.5 0 0)');
	});

	it('resolves multiple var() references in one value', () => {
		const multi = new Map<string, string>([
			['--ml-a', 'red'],
			['--ml-b', 'blue'],
		]);
		expect(resolve('linear-gradient(var(--ml-a), var(--ml-b))', multi)).toBe(
			'linear-gradient(red, blue)',
		);
	});
});

describe('buildContract', () => {
	it('generates @property declarations', () => {
		const palette: [string, string][] = [['--ml-blue', 'oklch(0.55 0.15 250)']];
		const intent: [string, string][] = [['--ml-primary', 'var(--ml-blue)']];

		const { output, summary } = buildContract(palette, intent);

		expect(output).toContain('@property --ml-blue');
		expect(output).toContain('initial-value: oklch(0.55 0.15 250)');
		expect(output).toContain('@property --ml-primary');
		// var(--ml-blue) should be resolved to the concrete value
		expect(output).not.toContain('initial-value: var(');
		expect(summary).toBe('2 properties (1 palette, 1 intent)');
	});

	it('includes the header comment', () => {
		const { output } = buildContract([['--ml-x', 'red']], []);
		expect(output).toContain('Theme Contract');
		expect(output).toContain('Auto-generated');
	});

	it('handles empty inputs', () => {
		const { output, summary } = buildContract([], []);
		expect(output).toContain('Theme Contract');
		expect(summary).toBe('0 properties (0 palette, 0 intent)');
	});
});
