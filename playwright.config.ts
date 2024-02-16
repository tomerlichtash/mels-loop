import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
	reporter: [
		process.env.CI ? ['list', 'html'] : ['list', 'html'],
		// process.env.CI ? ['junit', { outputFile: 'results.xml' }] : ['list'],
	],
	timeout: 30 * 1000,
	testDir: path.join(__dirname, 'e2e'),
	testIgnore: 'fixme/*',
	retries: 2,
	outputDir: 'test-results/',
	workers: 3,
	fullyParallel: true,
	webServer: {
		command: 'yarn run dev',
		url: baseURL,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	use: {
		video: 'retain-on-failure',
		baseURL,
		trace: 'retry-with-trace',
	},
	projects: [
		{
			name: 'Desktop',
			testMatch: ['**/*.spec.ts'],
			use: {
				...devices['Desktop Chrome'],
				...devices['Desktop Firefox'],
				...devices['Desktop Safari'],
			},
		},
		// {
		// 	name: 'Mobile',
		// 	testMatch: ['**/*.spec.ts'],
		// 	use: {
		// 		...devices['iPhone 14'],
		// 		...devices['Pixel 7'],
		// 	},
		// },
	],
};

export default config;
