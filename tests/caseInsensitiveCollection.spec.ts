import { it, describe, expect } from 'vitest';
import {
	CaseInsensitiveMap,
	CaseInsensitiveSet,
} from '../src/lib/caseInsensitiveCollections';

describe('CaseInsensitiveCollection', () => {
	describe('Map', () => {
		it('string', () => {
			const mapString = new CaseInsensitiveMap<string>();

			mapString.set('keywithoutcase', 'valwithoutcase');
			expect(mapString.has('keywithoutcase')).toBeTruthy();
			expect(mapString.get('keywithoutcase')).toEqual('valwithoutcase');

			mapString.set('keyWithCase', 'valWithCase');
			expect(mapString.has('keyWithCase')).toBeTruthy();
			expect(mapString.get('keyWithCase')).toEqual('valWithCase');
			expect(mapString.has('keyWithcase')).toBeTruthy();
			expect(mapString.get('keywithcase')).toEqual('valWithCase');
		});

		it('number', () => {
			const mapString = new CaseInsensitiveMap<number>();

			mapString.set('keywithoutcase', 1234);
			expect(mapString.has('keywithoutcase')).toBeTruthy();
			expect(mapString.get('keywithoutcase')).toEqual(1234);

			mapString.set('keyWithCase', 5678);
			expect(mapString.has('keyWithCase')).toBeTruthy();
			expect(mapString.get('keyWithCase')).toEqual(5678);
			expect(mapString.has('keyWithcase')).toBeTruthy();
			expect(mapString.get('keywithcase')).toEqual(5678);
		});

		it('boolean', () => {
			const mapString = new CaseInsensitiveMap<boolean>();

			mapString.set('keywithoutcase', true);
			expect(mapString.has('keywithoutcase')).toBeTruthy();
			expect(mapString.get('keywithoutcase')).toEqual(true);

			mapString.set('keyWithCase', false);
			expect(mapString.has('keyWithCase')).toBeTruthy();
			expect(mapString.get('keyWithCase')).toEqual(false);
			expect(mapString.has('keyWithcase')).toBeTruthy();
			expect(mapString.get('keywithcase')).toEqual(false);
		});

		it('object', () => {
			const mapString = new CaseInsensitiveMap<Record<string, string>>();

			mapString.set('keywithoutcase', { key: 'val' });
			expect(mapString.has('keywithoutcase')).toBeTruthy();
			expect(mapString.get('keywithoutcase')).toEqual({ key: 'val' });

			mapString.set('keyWithCase', { key: 'val' });
			expect(mapString.has('keyWithCase')).toBeTruthy();
			expect(mapString.get('keyWithCase')).toEqual({ key: 'val' });
			expect(mapString.has('keyWithcase')).toBeTruthy();
			expect(mapString.get('keywithcase')).toEqual({ key: 'val' });
		});
	});

	describe('Set', () => {
		it('add', () => {
			const set = new CaseInsensitiveSet();
			set.add('key');
			expect(set.has('key')).toBeTruthy();
		});

		it('has', () => {
			const set = new CaseInsensitiveSet();
			expect(set.has('key')).toBeFalsy();
			set.add('key');
			expect(set.has('key')).toBeTruthy();
		});

		it('delete', () => {
			const set = new CaseInsensitiveSet();
			set.add('key');
			set.delete('key');
			expect(set.has('key')).toBeFalsy();
			expect(set.entries.length).toEqual(0);
		});

		it('normalize', () => {
			const set = new CaseInsensitiveSet();
			set.add('UPPERCASE_KEY');
			expect(set.has('UPPERCASE_KEY')).toBeTruthy();
			expect(set.has('uppercase_key')).toBeTruthy();
		});
	});
});
