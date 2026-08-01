import { describe, expect, it } from 'vitest';

import { parseSource, sourceSchema } from '../src/schema';

const valid = {
	id: 'mel-blackjack-writeup',
	type: 'document',
	standing: 'primary',
	url: '/media/v2/documents/W1-01.0_Blackjack_Game.pdf',
	image: '/media/v2/images/mel-kaye-blackjack-writeup.jpg',
	page: '/stories/the-story-of-mel/documents/blackjack-writeup',
	date: '1960',
	author: 'Mel Kaye',
	repository: 'bitsavers',
	repositoryUrl: 'http://bitsavers.trailing-edge.com/x.pdf',
	license: 'fair-use',
	tags: ['blackjack'],
};

describe('sourceSchema', () => {
	it('accepts a fully-populated record', () => {
		expect(sourceSchema.safeParse(valid).success).toBe(true);
	});

	it('accepts the minimal record', () => {
		expect(
			sourceSchema.safeParse({
				id: 'x',
				type: 'link',
				standing: 'secondary',
				url: 'https://example.org',
			}).success,
		).toBe(true);
	});

	it('requires standing — classification is not optional', () => {
		const rest: Partial<typeof valid> = { ...valid };
		delete rest.standing;
		expect(sourceSchema.safeParse(rest).success).toBe(false);
	});

	it('rejects values outside the closed unions', () => {
		expect(
			sourceSchema.safeParse({ ...valid, license: 'CC-BY 4.0' }).success,
		).toBe(false);
		expect(
			sourceSchema.safeParse({ ...valid, standing: 'tertiary' }).success,
		).toBe(false);
		expect(sourceSchema.safeParse({ ...valid, type: 'photo' }).success).toBe(
			false,
		);
	});

	it('rejects unknown keys — the field that drifted once fails loudly now', () => {
		expect(sourceSchema.safeParse({ ...valid, credit: 'x' }).success).toBe(
			false,
		);
		expect(sourceSchema.safeParse({ ...valid, originUrl: 'x' }).success).toBe(
			false,
		);
	});
});

describe('parseSource', () => {
	it('names the offending file in its error', () => {
		expect(() => parseSource({}, 'content/sources/x/index.json')).toThrow(
			/content\/sources\/x\/index\.json/,
		);
	});
});
