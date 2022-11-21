import { resolve } from 'node:path';
import * as fs from 'node:fs';
import { render, waitFor } from 'cli-testing-library';

import { getFileHelper } from './file-helper.js';
import { ADD_FOUNDATION_COMMAND, INIT_COMMAND } from '../constants.js';

describe('theme generators', () => {
	const { getFilePath } = getFileHelper();

	/** @type {import('cli-testing-library').RenderResult} */
	let cli;

	beforeEach(async () => {
		cli = await render('plop', [
			`--plopfile=${resolve(__dirname, './plopfile.js')}`,
			`--dest=${resolve(__dirname, './output')}`,
			'theme',
		]);
	});

	it('should init theme', async () => {
		const themeFilePath = await getFilePath(`./output/src/styles/theme/index.ts`);

		const { findByText, userEvent } = cli;

		expect(await findByText('Select a command:')).toBeInTheConsole();

		expect(await findByText(`❯ ${INIT_COMMAND}`)).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(themeFilePath));

		const theme = fs.readFileSync(themeFilePath, 'utf8');

		expect(theme).toMatchSnapshot();
	});

	it('should add colors foundation theme', async () => {
		const themeFilePath = await getFilePath(`./output/src/styles/theme/index.ts`);
		const colorsFoundationFilePath = await getFilePath(`./output/src/styles/theme/foundations/colors.ts`);

		const { findByText, userEvent, getStdallStr } = cli;

		// Init theme file first
		const themeInitializer = await render('plop', [
			`--plopfile=${resolve(__dirname, './plopfile.js')}`,
			`--dest=${resolve(__dirname, './output')}`,
			'theme',
		]);

		expect(await themeInitializer.findByText('Select a command:')).toBeInTheConsole();

		expect(await themeInitializer.findByText(`❯ ${INIT_COMMAND}`)).toBeInTheConsole();

		themeInitializer.userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(themeFilePath));

		// Add colors foundation

		expect(await findByText('Select a command:')).toBeInTheConsole();

		userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ ${ADD_FOUNDATION_COMMAND}`)).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		expect(await findByText('Select foundation:')).toBeInTheConsole();

		userEvent.keyboard('[ArrowDown]');
		userEvent.keyboard('[ArrowDown]');
		userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ colors`)).toBeInTheConsole();

		await userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(colorsFoundationFilePath));

		console.log(getStdallStr());

		const colorFoundation = fs.readFileSync(colorsFoundationFilePath, 'utf8');
		const theme = fs.readFileSync(themeFilePath, 'utf8');

		expect(colorFoundation).toMatchSnapshot();
		expect(theme).toMatchSnapshot();
	});
});
