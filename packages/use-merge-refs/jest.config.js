/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/'],
	coverageProvider: 'v8',
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['<rootDir>/tests/?(*.)+(spec|test).[tj]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.(t|j)sx?$': [
			'@swc/jest',
			{
				jsc: {
					target: 'es2022',
					transform: {
						react: { runtime: 'automatic' },
					},
				},
			},
		],
	},
};
