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
	experimental: {
		/*
		 * @phosphor-icons/react's entry re-exports ~1500 icons. Production
		 * tree-shakes that away, but in dev the whole barrel is compiled the
		 * first time a route imports from it, which stalls the first
		 * navigation for a long time. This rewrites barrel imports to direct
		 * module paths so only the icons actually used are compiled.
		 */
		optimizePackageImports: ['@phosphor-icons/react'],
	},
	async rewrites() {
		return {
			// fallback rewrites run only when no file matches in public/
			fallback: [
				{
					source: '/media/:path*',
					destination:
						'https://mels-loop-media.s3.eu-north-1.amazonaws.com/:path*',
				},
			],
		};
	},
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
