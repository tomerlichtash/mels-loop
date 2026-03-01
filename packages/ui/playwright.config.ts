import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isCI = !!process.env.CI;

export default defineConfig({
	testDir: './src',
	testMatch: '**/*.spec.ts',
	snapshotDir: './e2e/__screenshots__',
	snapshotPathTemplate: '{snapshotDir}/{testFileDir}/{arg}--{projectName}{ext}',
	updateSnapshots: 'none',
	webServer: {
		command: 'npx http-server storybook-static -p 6007 -s',
		port: 6007,
		reuseExistingServer: !isCI,
	},
	use: {
		baseURL: 'http://localhost:6007',
		viewport: { width: 1280, height: 720 },
		actionTimeout: 10_000,
	},
	projects: [
		{
			name: 'chromium',
			use: {
				browserName: 'chromium',
			},
		},
		{
			name: 'firefox',
			use: {
				browserName: 'firefox',
			},
		},
		{
			name: 'webkit',
			use: {
				browserName: 'webkit',
			},
		},
	],
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.005,
			animations: 'disabled',
		},
	},
	reporter: isCI ? 'github' : 'html',
	forbidOnly: isCI,
	resolve: {
		alias: {
			'@e2e': resolve(__dirname, 'e2e'),
		},
	},
});
