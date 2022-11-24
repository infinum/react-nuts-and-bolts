import { resolve } from 'node:path';
import * as fs from 'node:fs';
import { render, waitFor } from 'cli-testing-library';

import { getFileHelper } from './helpers/file-helper.js';
import {
	ADD_COMPONENT_COMMAND,
	ADD_FOUNDATION_COMMAND,
	INIT_COMMAND,
	MULTI_PART_COMPONENT,
	SINGLE_PART_COMPONENT,
} from '../constants.js';

describe('theme generators', () => {
	const { getFilePath } = getFileHelper();

	/** @type {import('cli-testing-library').RenderResult} */
	let cli;

	const plopfilePath = resolve(__dirname, './helpers/plopfile.js');
	const outputDir = resolve(__dirname, './output');

	beforeEach(async () => {
		cli = await render('plop', [`--plopfile=${plopfilePath}`, `--dest=${outputDir}`, 'theme']);
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

		const { findByText, userEvent } = cli;

		// Init theme file first
		const themeInitializer = await render('plop', [`--plopfile=${plopfilePath}`, `--dest=${outputDir}`, 'theme']);

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

		await userEvent.keyboard('[ArrowDown]');
		await userEvent.keyboard('[ArrowDown]');
		await userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ colors`)).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(colorsFoundationFilePath));

		const colorFoundation = fs.readFileSync(colorsFoundationFilePath, 'utf8');

		expect(colorFoundation).toMatchSnapshot();

		await waitFor(async () => {
			const theme = fs.readFileSync(themeFilePath, 'utf8');

			expect(theme).toContain(`import { colors } from './foundations/colors';`);
			expect(theme).toContain(`colors,`);
		});

		const theme = fs.readFileSync(themeFilePath, 'utf8');
		expect(theme).toMatchSnapshot();
	});

	it('should add single-part button component theme', async () => {
		const themeFilePath = await getFilePath(`./output/src/styles/theme/index.ts`);
		const buttonComponentThemeFilePath = await getFilePath(`./output/src/styles/theme/components/button.ts`);

		const { findByText, userEvent } = cli;

		// Init theme file first
		const themeInitializer = await render('plop', [`--plopfile=${plopfilePath}`, `--dest=${outputDir}`, 'theme']);

		expect(await themeInitializer.findByText('Select a command:')).toBeInTheConsole();

		expect(await themeInitializer.findByText(`❯ ${INIT_COMMAND}`)).toBeInTheConsole();

		themeInitializer.userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(themeFilePath));

		// Add colors foundation

		expect(await findByText('Select a command:')).toBeInTheConsole();

		userEvent.keyboard('[ArrowDown]');
		userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ ${ADD_COMPONENT_COMMAND}`)).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		expect(await findByText('Enter component name:')).toBeInTheConsole();

		await userEvent.keyboard('Button');
		await userEvent.keyboard('[Enter]');

		expect(await findByText('Select a component type:')).toBeInTheConsole();
		expect(await findByText(`❯ ${SINGLE_PART_COMPONENT}`)).toBeInTheConsole();

		await userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(buttonComponentThemeFilePath));

		const buttonComponentTheme = fs.readFileSync(buttonComponentThemeFilePath, 'utf8');

		expect(buttonComponentTheme).toMatchSnapshot();

		await waitFor(async () => {
			const theme = fs.readFileSync(themeFilePath, 'utf8');

			expect(theme).toContain(`import { buttonTheme as Button } from './components/button';`);
			expect(theme).toContain(`Button,`);
		});

		const theme = fs.readFileSync(themeFilePath, 'utf8');
		expect(theme).toMatchSnapshot();
	});

	it('should add multi-part accordion component theme', async () => {
		const themeFilePath = await getFilePath(`./output/src/styles/theme/index.ts`);
		const accordionComponentThemeFilePath = await getFilePath(`./output/src/styles/theme/components/accordion.ts`);

		const { findByText, userEvent } = cli;

		// Init theme file first
		const themeInitializer = await render('plop', [`--plopfile=${plopfilePath}`, `--dest=${outputDir}`, 'theme']);

		expect(await themeInitializer.findByText('Select a command:')).toBeInTheConsole();

		expect(await themeInitializer.findByText(`❯ ${INIT_COMMAND}`)).toBeInTheConsole();

		themeInitializer.userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(themeFilePath));

		// Add colors foundation

		expect(await findByText('Select a command:')).toBeInTheConsole();

		userEvent.keyboard('[ArrowDown]');
		userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ ${ADD_COMPONENT_COMMAND}`)).toBeInTheConsole();

		userEvent.keyboard('[Enter]');

		expect(await findByText('Enter component name:')).toBeInTheConsole();

		await userEvent.keyboard('accordion');
		await userEvent.keyboard('[Enter]');

		expect(await findByText('Select a component type:')).toBeInTheConsole();

		await userEvent.keyboard('[ArrowDown]');

		expect(await findByText(`❯ ${MULTI_PART_COMPONENT}`)).toBeInTheConsole();

		await userEvent.keyboard('[Enter]');

		await waitFor(async () => fs.promises.stat(accordionComponentThemeFilePath));

		const accordionComponentTheme = fs.readFileSync(accordionComponentThemeFilePath, 'utf8');

		expect(accordionComponentTheme).toMatchSnapshot();

		await waitFor(async () => {
			const theme = fs.readFileSync(themeFilePath, 'utf8');

			expect(theme).toContain(`import { accordionTheme as Accordion } from './components/accordion';`);
			expect(theme).toContain(`Accordion,`);
		});

		const theme = fs.readFileSync(themeFilePath, 'utf8');
		expect(theme).toMatchSnapshot();
	});
});
