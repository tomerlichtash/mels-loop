import {
	Assistant,
	Lekton,
	Roboto_Mono,
	Roboto_Slab,
	VT323,
} from 'next/font/google';

export const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-roboto-slab',
	display: 'swap',
});

export const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto-mono',
	display: 'swap',
});

export const lekton = Lekton({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-lekton',
	display: 'swap',
});

export const vt323 = VT323({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-vt323',
	display: 'swap',
});

export const assistant = Assistant({
	subsets: ['latin', 'hebrew'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-assistant',
	display: 'swap',
});
