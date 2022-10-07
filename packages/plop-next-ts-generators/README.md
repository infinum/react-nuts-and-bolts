# Plop Next.js Generators

## Installation

Install dependencies:

`npm add plop @infinum/plop-next-ts-generators -D`

Create `plopfile.js` in the root of your project:

`touch plopfile.js`

Register generators:

```js
const init = require('@infinum/plop-next-ts-generators');

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
	init(plop);
};
```

## Component generator

`plop component`

## Theme generator

`prop theme`
