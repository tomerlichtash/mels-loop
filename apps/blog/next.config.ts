import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'mels-loop-media.s3.eu-north-1.amazonaws.com',
			},
		],
	},
	transpilePackages: [
		'@mels-loop/ui',
		'@mels-loop/i18n',
		'@mels-loop/content-pipeline',
		'@mels-loop/forms',
	],
};

export default nextConfig;
