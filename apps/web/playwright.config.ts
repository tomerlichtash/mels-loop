import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	use: {
		baseURL: 'http://localhost:3000',
	},
	webServer: {
		command: 'pnpm dev',
		port: 3000,
		reuseExistingServer: !process.env.CI,
	},
});
