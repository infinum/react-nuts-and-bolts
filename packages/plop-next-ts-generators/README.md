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
	init(plop, { 
    // Base source code folder, defaults to `./src` but on some projects you need to set it to `./`
    // baseUrl: './src',

    // For changing components folder URL or name, defaults to `./components` but you can change it to `./components/ui`
    // componentsUrl: './components'
  });
};
```

Add scripts to your package.json:

```json
{
  "scripts": {
    "gen:component": "plop component",
    "gen:theme": "plop theme"
  }
}
```

## Component generator

`npm run gen:component`

## Theme generator

`npm run gen:theme`
