/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['packages/**/src/**/*.{js,jsx,ts,tsx}'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	transform: {
		'^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
