import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
	reporter: [
		process.env.CI ? ['list', 'html'] : ['list', 'html'],
		// process.env.CI ? ['junit', { outputFile: 'results.xml' }] : ['list'],
	],
	timeout: 30 * 1000,
	testDir: path.join(__dirname, 'e2e'),
	retries: 2,
	outputDir: 'test-results/',
	workers: 4,
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
			name: 'Site',
			testMatch: ['site/**/*.spec.ts'],
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'Glossary',
			testMatch: ['/glossary/**/*.spec.ts'],
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'codex-the-story-of-mel',
			testMatch: ['codex/the-story-of-mel/**/*.spec.ts'],
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
};
export default config;
