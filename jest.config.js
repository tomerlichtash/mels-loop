module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	setupFiles: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@src/(.*)$": "<rootDir>/src/$1",
		"(?<!\\.st)\\.(css|scss)$": "identity-obj-proxy",
	},
	coveragePathIgnorePatterns: ["/node_modules/"],
	testPathIgnorePatterns: ["<rootDir>/e2e/"],
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.jest.json",
			diagnostics: true,
		},
	},
	transform: {
		"\\.st\\.css?$": "@stylable/jest",
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
	testEnvironment: "jsdom",
};
