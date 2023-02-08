import type { Config } from 'jest';

export function infinumJest() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (customJestConfig: any = {}) => {
		return async (): Promise<Config> => {
			const resolvedJestConfig =
				(typeof customJestConfig === 'function' ? await customJestConfig() : customJestConfig) ?? {};

			return {
				...customJestConfig,

				clearMocks: true,
				coverageDirectory: 'coverage',
				coverageProvider: 'v8',

				transform: {
					// Use SWC to compile tests
					'^.+\\.(t|j)sx?$': '@swc/jest',
					...(resolvedJestConfig.transform ?? []),
				},

				testPathIgnorePatterns: [
					// Don't look for tests in node_modules
					'/node_modules/',
					// Don't look for tests in dist folder
					'/dist/',
					// Custom config can append to testPathIgnorePatterns but not modify it
					...(resolvedJestConfig.testPathIgnorePatterns ?? []),
				],

				watchPathIgnorePatterns: [
					// Don't re-run if change happens in node_modules
					'/node_modules/',
					// Custom config can append to watchPathIgnorePatterns but not modify it
					...(resolvedJestConfig.watchPathIgnorePatterns ?? []),
				],
			};
		};
	};
}
