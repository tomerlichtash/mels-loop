import { Roboto_Slab, Assistant } from 'next/font/google';

export const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-roboto-slab',
	display: 'swap',
});

export const assistant = Assistant({
	subsets: ['latin', 'hebrew'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-assistant',
	display: 'swap',
});
