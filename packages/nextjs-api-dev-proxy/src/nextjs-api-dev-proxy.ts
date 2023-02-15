import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

interface ICreateProxyOptions extends Omit<Options, 'apiUrl'> {
	/**
	 * Used for disabling the proxy. By default it's enabled only in development.
	 *
	 * @default process.env.NODE_ENV !== 'development'
	 *
	 * @example
	 *
	 * createProxy('http://localhost:3000', {
	 *   disable: NODE_ENV === 'production'
	 * })
	 *
	 * @example
	 *
	 * createProxy('http://localhost:3000', {
	 *   disable: (req) => req.headers['x-skip-proxy'] === 'true'
	 * })
	 */
	disable?: boolean | ((req: NextApiRequest) => boolean);
}

export const createProxy = (apiUrl: Options['target'], options: ICreateProxyOptions = {}) => {
	const { disable = process.env.NODE_ENV !== 'development', ...proxyOptions } = options;

	const proxy = createProxyMiddleware({
		target: apiUrl,
		changeOrigin: true,
		logLevel: 'debug',
		cookieDomainRewrite: 'localhost',
		pathRewrite: { '^/api': '/' },
		...proxyOptions,
		onProxyRes: (proxyRes, ...rest) => {
			// You can manipulate the cookie here

			if (!proxyRes.headers['set-cookie']) {
				return;
			}

			// For example you can remove secure and SameSite security flags so browser can save the cookie in dev env
			const adaptCookiesForLocalhost = proxyRes.headers['set-cookie'].map((cookie) =>
				cookie.replace(/; secure/gi, '').replace(/; SameSite=None/gi, '')
			);

			proxyRes.headers['set-cookie'] = adaptCookiesForLocalhost;

			proxyOptions?.onProxyRes?.(proxyRes, ...rest);
		},
		onError: (err, ...rest) => {
			console.error(err);

			proxyOptions?.onError?.(err, ...rest);
		},
	}) as (req: NextApiRequest, res: NextApiResponse<unknown>) => void;

	return function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
		if (typeof disable === 'function' ? disable(req) : disable) {
			return res.status(404).json({ message: 'Not found' });
		}

		return proxy(req, res);
	};
};
