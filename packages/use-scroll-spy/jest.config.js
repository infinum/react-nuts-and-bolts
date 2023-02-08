const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

/** @type {import('jest').Config} */
const customConfig = {
	testEnvironment: '@infinum/jest/environment',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};

module.exports = createJestConfig(customConfig);
