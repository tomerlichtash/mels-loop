import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: [
		'@mels-loop/ui',
		'@mels-loop/i18n',
		'@mels-loop/content-pipeline',
		'@mels-loop/forms',
	],
};

export default nextConfig;
