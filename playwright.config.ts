import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";

const TEST_BROWSERS = [
	{
		name: "Desktop Chrome",
		use: {
			...devices["Desktop Chrome"],
		},
	},
	{
		name: "Desktop Firefox",
		use: {
			...devices["Desktop Firefox"],
		},
	},
	{
		name: "Desktop Safari",
		use: {
			...devices["Desktop Safari"],
		},
	},
	// Test against mobile viewports.
	{
		name: "Mobile Chrome",
		use: {
			...devices["Pixel 5"],
		},
	},
	{
		name: "Mobile Safari",
		use: devices["iPhone 12"],
	},
];

const TEST_CI_BROWSERS = [
	{
		name: "Desktop Chrome",
		use: {
			...devices["Desktop Chrome"],
		},
	},
];

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
	// use: {
	// 	baseURL: process.env.URL,
	// },

	// Timeout per test
	timeout: 30 * 1000,
	// Test directory
	testDir: path.join(__dirname, "e2e"),
	// If a test fails, retry it additional 2 times
	retries: 2,
	// Artifacts folder where screenshots, videos, and traces are stored.
	outputDir: "test-results/",

	// Run your local dev server before starting the tests:
	// https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
	webServer: {
		command: "yarn run dev",
		port: 3000,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},

	use: {
		// Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
		// More information: https://playwright.dev/docs/trace-viewer
		trace: "retry-with-trace",

		// All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
		// contextOptions: {
		//   ignoreHTTPSErrors: true,
		// },
	},

	projects: process.env.TEST_CI ? TEST_CI_BROWSERS : TEST_BROWSERS,
	// projects: [
	// 	{
	// 		name: "Desktop Chrome",
	// 		use: {
	// 			...devices["Desktop Chrome"],
	// 		},
	// 	},
	// 	// {
	// 	//   name: 'Desktop Firefox',
	// 	//   use: {
	// 	//     ...devices['Desktop Firefox'],
	// 	//   },
	// 	// },
	// 	// {
	// 	//   name: 'Desktop Safari',
	// 	//   use: {
	// 	//     ...devices['Desktop Safari'],
	// 	//   },
	// 	// },
	// 	// Test against mobile viewports.
	// 	{
	// 		name: "Mobile Chrome",
	// 		use: {
	// 			...devices["Pixel 5"],
	// 		},
	// 	},
	// 	{
	// 		name: "Mobile Safari",
	// 		use: devices["iPhone 12"],
	// 	},
	// ],
};
export default config;
