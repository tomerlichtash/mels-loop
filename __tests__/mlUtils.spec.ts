import { it, describe, expect } from 'vitest';
import {
	stringArrayToMap,
	flattenArray,
	unique,
	arrayToMap,
	parseDate,
} from '../src/utils/index';

describe('MLUtils', () => {
	describe('flattenArray', () => {
		it('keep array as array', () => {
			expect(flattenArray(['a', 1])).toEqual(['a', 1]);
		}),
			it('flatten nested arrays', () => {
				expect(flattenArray([['a', 1]])).toEqual(['a', 1]);
			}),
			it('keep drop empty array as array', () => {
				expect(flattenArray(['a', [], 1, []])).toEqual(['a', 1]);
			}),
			it('flatten comlpex nested arrays', () => {
				expect(
					flattenArray([
						[
							['a', 1],
							['b', 2],
							['c', 3],
						],
						[],
						[
							['d', 4],
							['e', 5],
							['f', 6, [9, 8, 7, ['z', 'y', 'x']]],
						],
						[],
						[[[[['q', 'w']]]]],
					])
				).toEqual([
					'a',
					1,
					'b',
					2,
					'c',
					3,
					'd',
					4,
					'e',
					5,
					'f',
					6,
					9,
					8,
					7,
					'z',
					'y',
					'x',
					'q',
					'w',
				]);
			});
	});

	describe('stringArrayToMap', () => {
		it('map strings in stubs map', () => {
			expect(stringArrayToMap(['a', 'b', 'c'])).toEqual({
				a: 1,
				b: 1,
				c: 1,
			});
		});
	});

	describe('arrayToMap', () => {
		const mockObj1 = {
			id: 'id1',
			path: 'path1',
		};

		const mockObj2 = {
			id: 'id2',
			path: 'path2',
		};

		it('map array', () => {
			expect(arrayToMap([mockObj1, mockObj2], 'id')).toEqual({
				[mockObj1.id]: mockObj1,
				[mockObj2.id]: mockObj2,
			});

			expect(arrayToMap([mockObj1, mockObj2], 'path')).toEqual({
				[mockObj1.path]: mockObj1,
				[mockObj2.path]: mockObj2,
			});
		});
	});

	describe('unique', () => {
		it('generate unique ID', () => {
			const id1 = unique.id();
			const id2 = unique.id();
			expect(id1).not.toEqual(id2);
		});

		it('generate unique ID with default key', () => {
			const id1 = unique.id();
			expect(id1.includes('mlid-')).toBeTruthy();
		});

		it('generate unique ID with custom key', () => {
			const id1 = unique.id('mels');
			const id2 = unique.id('loop');
			expect(id1.includes('mels-')).toBeTruthy();
			expect(id2.includes('loop-')).toBeTruthy();
		});
	});

	describe.skip('parseDate', () => {
		it('parse date', () => {
			expect(parseDate(0)).toEqual('1970-01-01T00:00:00.000Z');
		});
	});
});
