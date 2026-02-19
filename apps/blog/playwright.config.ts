import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	use: {
		baseURL: 'http://localhost:3001',
	},
	webServer: {
		command: 'pnpm dev',
		port: 3001,
		reuseExistingServer: !process.env.CI,
	},
});
