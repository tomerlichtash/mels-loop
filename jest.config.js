module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	setupFiles: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@src/(.*)$": "<rootDir>/src/$1",
		"(?<!\\.st)\\.(css|scss)$": "identity-obj-proxy",
	},
	testPathIgnorePatterns: ["<rootDir>/cypress/"],
	coveragePathIgnorePatterns: ["/node_modules/"],
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.jest.json",
			diagnostics: false,
		},
	},
	transform: {
		"\\.st\\.css?$": "@stylable/jest",
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
	testEnvironment: "jsdom",
};
