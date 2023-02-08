import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	format: ['cjs', 'esm'],
	splitting: false,
	outExtension(ctx) {
		return { js: `.${ctx.format}.js` };
	},
	entry: ['src/index.ts', 'src/environment.ts'],
});
