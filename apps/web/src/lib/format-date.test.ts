import { describe, expect, it } from 'vitest';

import { formatArticleDate, formatSourceDate } from './format-date';

describe('formatSourceDate', () => {
	it('passes a bare year through untouched', () => {
		expect(formatSourceDate('1952', 'en')).toBe('1952');
		expect(formatSourceDate('1952', 'he')).toBe('1952');
	});

	it('renders year-month as month/year in both locales', () => {
		expect(formatSourceDate('1959-06', 'en')).toBe('06/1959');
		expect(formatSourceDate('1959-06', 'he')).toBe('06/1959');
	});

	it('orders a full date by locale — month first in English, day first in Hebrew', () => {
		expect(formatSourceDate('1945-08-08', 'en')).toBe('08/08/1945');
		expect(formatSourceDate('1983-05-21', 'en')).toBe('05/21/1983');
		expect(formatSourceDate('1983-05-21', 'he')).toBe('21/05/1983');
	});

	it('shows anything unparseable as written', () => {
		expect(formatSourceDate('circa 1960', 'en')).toBe('circa 1960');
		expect(formatSourceDate('', 'en')).toBe('');
	});
});

describe('formatArticleDate', () => {
	it('returns empty for an invalid date', () => {
		expect(formatArticleDate('not a date', 'en')).toBe('');
	});

	it('orders by locale', () => {
		expect(formatArticleDate('2023-05-21T12:00:00Z', 'en')).toBe('05/21/2023');
		expect(formatArticleDate('2023-05-21T12:00:00Z', 'he')).toBe('21/05/2023');
	});
});
