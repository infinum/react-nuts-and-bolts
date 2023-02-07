const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

const config = createJestConfig({
	testEnvironment: '@infinum/jest/environment',
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
});

module.exports = config;
