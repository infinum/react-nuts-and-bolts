const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

/** @type {import('jest').Config} */
const customConfig = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customConfig);
