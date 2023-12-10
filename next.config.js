import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { withAxiom } from "next-axiom";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
	optimizeFonts: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		// additionalData: `@import "src/scss/_config.scss";`,
	},
	i18n: {
		locales: ["en", "he"],
		defaultLocale: "en",
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	async redirects() {
		return [
			{
				source: "/docs/preface",
				destination: "/docs/the-story-of-mel/pages/preface",
				permanent: true,
			},
			{
				source: "/docs/mels-hack-the-missing-bits",
				destination: "/docs/the-story-of-mel/pages/mels-hack-the-missing-bits",
				permanent: true,
			},
			{
				source: "/docs/resources",
				destination: "/docs/the-story-of-mel/pages/resources",
				permanent: true,
			},
			{
				source: "/docs/blackjack-writeup",
				destination: "/docs/the-story-of-mel/pages/blackjack-writeup",
				permanent: true,
			},
		];
	},
};

export default withAxiom(nextConfig);
