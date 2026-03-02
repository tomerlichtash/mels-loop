import { defineConfig } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
	testDir: './src/primitives',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	retries: isCI ? 2 : 0,
	snapshotDir: './__snapshots__',
	snapshotPathTemplate:
		'{snapshotDir}/{testFileDir}/{arg}--{projectName}-{platform}{ext}',
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
			timeout: 15_000,
		},
	},
	reporter: isCI ? 'github' : 'html',
	forbidOnly: isCI,
	shard: process.env.SHARD
		? {
				current: Number(process.env.SHARD),
				total: Number(process.env.SHARD_TOTAL),
			}
		: undefined,
});
