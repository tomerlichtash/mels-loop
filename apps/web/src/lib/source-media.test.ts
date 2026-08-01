import { describe, expect, it } from 'vitest';

import { isImageUrl } from './source-media';

describe('isImageUrl', () => {
	it('recognises hosted image copies', () => {
		expect(isImageUrl('/media/v2/images/mel-kaye-grave.jpg')).toBe(true);
		expect(isImageUrl('/media/v2/images/scan.jpeg')).toBe(true);
		expect(isImageUrl('/media/x.PNG')).toBe(true);
		expect(isImageUrl('/media/x.webp')).toBe(true);
	});

	it('rejects documents, pages and directories', () => {
		expect(isImageUrl('/media/v2/documents/W1-01.0_Blackjack_Game.pdf')).toBe(
			false,
		);
		expect(isImageUrl('https://ed-thelen.org/comp-hist/lgp-30-man.html')).toBe(
			false,
		);
		expect(
			isImageUrl('http://www.bitsavers.org/pdf/royalPrecision/LGP-30/'),
		).toBe(false);
		expect(isImageUrl('')).toBe(false);
	});
});
