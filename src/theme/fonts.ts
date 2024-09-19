import localFont from 'next/font/local';
import type { NextFont } from 'next/dist/compiled/@next/font';

const robotoSlab = localFont({
	src: [
		{
			path: '../../public/assets/fonts/roboto-slab/RobotoSlab-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/assets/fonts/roboto-slab/RobotoSlab-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../public/assets/fonts/roboto-slab/RobotoSlab-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	]
});

const assistant = localFont({
	src: [
		{
			path: '../../public/assets/fonts/assistant/Assistant-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/assets/fonts/assistant/Assistant-SemiBold.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../public/assets/fonts/assistant/Assistant-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	]
});

const fontByLocale: Record<string, NextFont> = {
	en: robotoSlab,
	he: assistant
};

export default fontByLocale;
