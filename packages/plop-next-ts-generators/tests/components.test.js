import { resolve } from 'node:path';
import * as fs from 'node:fs';
import { render, waitFor } from 'cli-testing-library';

import { getFileHelper } from './helpers/file-helper.js';
import { kebabCase } from './helpers/utils.js';

describe('component generators', () => {
	const { getFilePath } = getFileHelper();

	/** @type {import('cli-testing-library').RenderResult} */
	let cli;

	const plopfilePath = resolve(__dirname, './helpers/plopfile.js');
	const outputDir = resolve(__dirname, './output');

	beforeEach(async () => {
		cli = await render('plop', [`--plopfile=${plopfilePath}`, `--dest=${outputDir}`, 'component']);
	});

	it('should generate core single-part component', async () => {
		const componentOutputPath = './output/src/components/core';
		const stylesOutputPath = './output/src/styles/theme/components';
		const componentName = 'TestComponent';
		const componentFilePath = await getFilePath(`${componentOutputPath}/${componentName}/${componentName}.tsx`);
		const componentStoryFilePath = await getFilePath(
			`${componentOutputPath}/${componentName}/${componentName}.stories.tsx`
		);
		const componentTestFilePath = await getFilePath(
			`${componentOutputPath}/${componentName}/${componentName}.test.tsx`
		);
		const componentStylesFilePath = await getFilePath(`${stylesOutputPath}/${kebabCase(componentName)}.ts`);

		const { findByText, userEvent } = cli;

		expect(await findByText('Select a root domain:')).toBeInTheConsole();

		expect(await findByText('❯ core')).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		expect(await findByText('❯ single-part')).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		expect(await findByText('Enter component name (e.g. MyComponent):')).toBeInTheConsole();

		userEvent.keyboard(`${componentName}[Enter]`);

		await waitFor(async () => fs.promises.stat(componentFilePath));
		await waitFor(async () => fs.promises.stat(componentStoryFilePath));
		await waitFor(async () => fs.promises.stat(componentTestFilePath));
		await waitFor(async () => fs.promises.stat(componentStylesFilePath));

		const component = fs.readFileSync(componentFilePath, 'utf8');
		const story = fs.readFileSync(componentStoryFilePath, 'utf8');
		const test = fs.readFileSync(componentTestFilePath, 'utf8');
		const styles = fs.readFileSync(componentStylesFilePath, 'utf8');

		expect(component).toMatchSnapshot();
		expect(story).toMatchSnapshot();
		expect(test).toMatchSnapshot();
		expect(styles).toMatchSnapshot();
	});
});
