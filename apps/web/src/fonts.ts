import { Assistant, Lekton, Roboto_Slab } from 'next/font/google';

export const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-roboto-slab',
	display: 'swap',
});

export const lekton = Lekton({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-lekton',
	display: 'swap',
});

/*
 * 600 is carried for Hebrew specifically. Assistant's Medium sits much closer
 * to its Regular than Roboto Slab's does — a term set at 500 is measurably
 * heavier and still reads as body text — so Hebrew steps emphasis up a notch.
 * See --ml-term-font-weight in layout.css.
 */
export const assistant = Assistant({
	subsets: ['latin', 'hebrew'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-assistant',
	display: 'swap',
});
