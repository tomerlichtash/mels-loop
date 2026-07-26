import { Heebo, Lekton, Roboto_Slab } from 'next/font/google';

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
 * Heebo, drawn as Roboto's Hebrew companion — its Latin glyphs are Roboto
 * itself. That makes it the one face here structurally related to the Latin
 * side: Roboto Slab is the same skeleton wearing slab serifs, so the two
 * scripts now share proportions instead of merely coexisting. Assistant, which
 * this replaces, had no relationship to Roboto Slab at all.
 *
 * The variable is named for the script rather than the face, so the next
 * change of mind does not have to touch the stylesheets that read it.
 *
 * 600 is carried because Hebrew sets terms and quotes a step heavier than
 * English — see --ml-term-font-weight in layout.css.
 */
export const hebrew = Heebo({
	subsets: ['latin', 'hebrew'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-hebrew',
	display: 'swap',
});
