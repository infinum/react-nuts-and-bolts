import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

export const createProxy = (apiUrl: Options['target'], options?: Omit<Options, 'apiUrl'>) => {
	const proxy = createProxyMiddleware({
		target: apiUrl,
		changeOrigin: true,
		logLevel: 'debug',
		cookieDomainRewrite: 'localhost',
		pathRewrite: { '^/api': '/' },
		...options,
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

			options?.onProxyRes?.(proxyRes, ...rest);
		},
		onError: (err, ...rest) => {
			console.error(err);

			options?.onError?.(err, ...rest);
		},
	}) as (req: NextApiRequest, res: NextApiResponse<unknown>) => void;

	return function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
		// Don't allow requests to hit the proxy when not in development mode
		// NextJS doesn't allow conditional API routes
		if (process.env.NODE_ENV !== 'development') {
			return res.status(404).json({ message: 'Not found' });
		}

		return proxy(req, res);
	};
};
