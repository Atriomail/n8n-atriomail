module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts', '!**/*.test.ts'],
	coverageDirectory: 'coverage',
	verbose: true,
};
