import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/helpers/parse.ts'],
			reporter: ['text', 'html'],
			reportsDirectory: 'coverage',
			thresholds: {
				perFile: true,
				lines: 100,
				functions: 100,
				branches: 80,
				statements: 90,
			},
		},
	},
});
