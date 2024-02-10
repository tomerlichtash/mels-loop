import { it, describe, expect } from 'vitest';
import {
	stringArrayToMap,
	flattenArray,
	unique,
	arrayToMap,
	parseDate,
	clonePlainObject,
} from '../src/utils/index';

describe('MLUtils', () => {
	describe('flattenArray', () => {
		it('keep array as array', () => {
			expect(flattenArray(['a', 1])).toEqual(['a', 1]);
		});

		it('flatten nested arrays', () => {
			expect(flattenArray([['a', 1]])).toEqual(['a', 1]);
		});

		it('keep drop empty array as array', () => {
			expect(flattenArray(['a', [], 1, []])).toEqual(['a', 1]);
		});

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

	describe.skip('parseDate', () => {
		it('parse date', () => {
			expect(parseDate(0)).toEqual('1970-01-01T00:00:00.000Z');
		});
	});

	describe('clonePlainObject', () => {
		it('deep clone object', () => {
			const source = {
				name: 'Mel',
				address: {
					city: 'Orange County',
					country: 'USA',
				},
				hobbies: ['lgp-30', 'rpc-4000'],
			};

			const clone = clonePlainObject(source);

			expect(source === clone).toBeFalsy();

			expect(source.name).toEqual(clone.name);
			expect(source.address.city).toEqual(clone.address.city);
			expect(source.address.country).toEqual(clone.address.country);
			expect(source.hobbies[0]).toEqual(clone.hobbies[0]);
			expect(source.hobbies[1]).toEqual(clone.hobbies[1]);

			source.name = 'Ed';
			source.address.city = 'Los Angeles';
			source.hobbies.push('fortran');

			expect(clone.name).toEqual('Mel');
			expect(clone.address.city).toEqual('Orange County');
			expect(clone.hobbies.includes('fortran')).toBeFalsy();
		});
	});
});
