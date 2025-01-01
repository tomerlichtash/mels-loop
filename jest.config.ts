import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	// setupFiles: ['dotenv/config'],
	globals: {
		'ts-jest': {
			tsConfig: './tsconfig.json',
		},
	},
	roots: ['<rootDir>'],
	testMatch: ['<rootDir>/tests/**/*.spec.*'],
	moduleNameMapper: {
		'^layout/(.*)$': '<rootDir>/src/layout/$1',
		'^types/(.*)$': '<rootDir>/src/types/$1',
		'^lib/(.*)$': '<rootDir>/src/lib/$1',
		'^utils/(.*)$': '<rootDir>/src/utils/$1',
		'^config/(.*)$': '<rootDir>/src/config/$1',
		'^locale/(.*)$': '<rootDir>/src/locale/$1',
		'^context/(.*)$': '<rootDir>/src/context/$1',
		'^hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^styles/(.*)$': '<rootDir>/src/styles/$1',
	},
	// testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	coverageReporters: ['json', 'text', 'lcov', 'clover'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
