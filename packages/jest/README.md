# @infinum/jest

Set of util functions for easier jest setup that supports both server and browser environment.

> This is an internal utility, not intended for public usage.

## Installation

```sh
yarn add @infinum/jest jest
# or
npm i @infinum/jest jest
```

## Usage

### Basic

```js
// jest.config.js
const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

module.exports = createJestConfig();
```

### With custom config

```js
// jest.config.js
const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

/** @type {import('jest').Config} */
const customConfig = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};

module.exports = createJestConfig(customConfig);
```

### With @infinum/jest/environment

```js
// jest.config.js
const { infinumJest } = require('@infinum/jest');

const createJestConfig = infinumJest();

/** @type {import('jest').Config} */
const customConfig = {
	testEnvironment: '@infinum/jest/environment',
};

module.exports = createJestConfig(customConfig);
```

## Contribution

Yes please! See the [contributing guidelines](https://github.com/infinum/react-nuts-and-bolts/blob/master/CONTRIBUTING.md) for details.

## Licence

This project is licensed under the terms of the [MIT license](https://github.com/infinum/react-nuts-and-bolts/blob/master/LICENSE).

# Credits

`jest` is maintained and sponsored by
[Infinum](https://www.infinum.com).

<p align="center">
  <a href='https://infinum.com'>
    <picture>
        <source srcset="https://assets.infinum.com/brand/logo/static/white.svg" media="(prefers-color-scheme: dark)">
        <img src="https://assets.infinum.com/brand/logo/static/default.svg">
    </picture>
  </a>
</p>
