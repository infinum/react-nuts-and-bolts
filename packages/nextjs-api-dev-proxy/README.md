# @infinum/nextjs-api-dev-proxy

Development API proxy for Next.js pages. It uses [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) under the hood.

## Installation

```sh
yarn add @infinum/nextjs-api-dev-proxy
# or
npm i @infinum/nextjs-api-dev-proxy
```

## Usage

```ts
// pages/api/[[...slug]].ts
import { createProxy } from '@/utils/proxy/proxy';

export default createProxy(process.env.API_URL);

export const config = {
	api: {
		bodyParser: false, // enable POST requests
		externalResolver: true, // hide warning message
	},
};
```

### Multi env

```ts
// pages/api/[[...slug]].ts
import { createProxy } from '@/utils/proxy/proxy';

let apiUrl: string;
switch (process.env.API_PROXY) {
	case 'production':
		apiUrl = 'http://production.api.com';
		break;
	case 'uat':
		apiUrl = 'http://uat.api.com';
		break;
	case 'dev':
	default:
		apiUrl = 'http://dev.api.com';
}

export default createProxy(apiUrl);

export const config = {
	api: {
		bodyParser: false, // enable POST requests
		externalResolver: true, // hide warning message
	},
};
```

### Custom config

```ts
// pages/api/some/path/[[...slug]].ts
import { createProxy } from '@/utils/proxy/proxy';

export default createProxy(process.env.API_URL, {
	pathRewrite: {
		'^/api/some/path': '/',
	},
	logLevel: NODE_ENV === 'production' ? 'silent' : 'debug',
});

export const config = {
	api: {
		bodyParser: false, // enable POST requests
		externalResolver: true, // hide warning message
	},
};
```

## API

### options

The options extend the [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) options.

| Name      | Type      | Default                              | Description                               |
| --------- | --------- | ------------------------------------ | ----------------------------------------- | -------------- |
| `disable` | `boolean  |  ((req: NextApiRequest) => boolean)` | `process.env.NODE_ENV !== 'development''` | Disable proxy. |

## Contribution

Yes please! See the [contributing guidelines](https://github.com/infinum/react-nuts-and-bolts/blob/master/CONTRIBUTING.md) for details.

## Licence

This project is licensed under the terms of the [MIT license](https://github.com/infinum/react-nuts-and-bolts/blob/master/LICENSE).

# Credits

`nextjsApiDevProxy` is maintained and sponsored by
[Infinum](https://www.infinum.com).

<p align="center">
  <a href='https://infinum.com'>
    <picture>
        <source srcset="https://assets.infinum.com/brand/logo/static/white.svg" media="(prefers-color-scheme: dark)">
        <img src="https://assets.infinum.com/brand/logo/static/default.svg">
    </picture>
  </a>
</p>
