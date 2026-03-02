import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
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
	],
	async redirects() {
		return [
			{
				source: '/docs/the-story-of-mel/pages/:pageId',
				destination: '/stories/the-story-of-mel/articles/:pageId',
				permanent: true,
			},
			{
				source: '/docs/the-story-of-mel',
				destination: '/stories/the-story-of-mel',
				permanent: true,
			},
			{
				source: '/docs',
				destination: '/stories/the-story-of-mel',
				permanent: true,
			},
			{
				source: '/docs/the-story-of-mel/codex/:path*',
				destination: '/stories/the-story-of-mel/codex/:path*',
				permanent: true,
			},
			{
				source: '/docs/the-story-of-mel/resources',
				destination: '/stories/the-story-of-mel/resources',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
