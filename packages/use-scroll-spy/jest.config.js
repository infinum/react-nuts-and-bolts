const { infinumJest } = require('@infinum/jest/dist');

const createJestConfig = infinumJest();

/** @type {import('jest').Config} */
const customConfig = {
	testEnvironment: '@infinum/jest/dist/environment',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};

module.exports = createJestConfig(customConfig);
