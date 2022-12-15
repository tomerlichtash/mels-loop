import { PlaywrightTestConfig, devices } from "@playwright/test";
import { attachHook } from "@stylable/node";
import path from "path";

attachHook();

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
	reporter: [
		process.env.CI ? ["junit", { outputFile: "results.xml" }] : ["list"],
	],

	// Timeout per test
	timeout: 30 * 1000,
	// Test directory
	testDir: path.join(__dirname, "e2e"),
	// If a test fails, retry it additional 2 times
	retries: 2,
	// Artifacts folder where screenshots, videos, and traces are stored.
	outputDir: "test-results/",

	workers: 4,
	fullyParallel: true,

	// Run your local dev server before starting the tests:
	// https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
	webServer: {
		command: "yarn run dev",
		url: baseURL,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},

	use: {
		// screenshot: "only-on-failure",
		video: "retain-on-failure",

		// Use baseURL so to make navigations relative.
		// More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
		baseURL,

		// Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
		// More information: https://playwright.dev/docs/trace-viewer
		trace: "retry-with-trace",

		// All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
		// contextOptions: {
		//   ignoreHTTPSErrors: true,
		// },
	},

	projects: [
		{
			name: "Site",
			testMatch: ["site/**/*.spec.ts"],
			use: {
				...devices["Desktop Chrome"],
			},
		},
		{
			name: "Glossary",
			testMatch: ["/glossary/**/*.spec.ts"],
			use: {
				...devices["Desktop Chrome"],
			},
		},
		{
			name: "codex-the-story-of-mel",
			testMatch: ["codex/the-story-of-mel/**/*.spec.ts"],
			use: {
				...devices["Desktop Chrome"],
				// ...devices["iPhone 12"],
			},
		},
		// {
		// 	name: "Mobile Chrome",
		// 	testMatch: [
		// 		/.mobile.spec.ts/,
		// 		/popover.spec.ts/,
		// 		/glossary/,
		// 		/annotations/,
		// 	],
		// 	use: {
		// 		...devices["Pixel 5"],
		// 	},
		// },
	],
};
export default config;
