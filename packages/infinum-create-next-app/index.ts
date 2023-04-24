#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import prompts from 'prompts';
import path from 'path';
import fs from 'fs';
import { validateNpmName } from './helpers/validate-pkg';
import { isFolderEmpty } from './helpers/is-folder-empty';
import ciInfo from 'ci-info';
import packageJson from './package.json';

let projectPath = '';

program
	.name(packageJson.name)
	.version(packageJson.version)
	.arguments('<project-directory>')
	.usage(`${chalk.green('<project-directory>')} [options]`)
	.action((name) => {
		projectPath = name;
	})
	.option(
		'--chakra-ui',
		`

  Initialize with Chakra UI config. (default)
`
	)
	.option(
		'--datx',
		`

  Initialize with Datx. (default)
`
	)
	.option(
		'--bugsnag',
		`

  Initialize with Bugsnag. (default)
`
	)
	.allowUnknownOption()
	.parse(process.argv);

const onPromptState = (state: any) => {
	if (state.aborted) {
		// If we don't re-enable the terminal cursor before exiting
		// the program, the cursor will remain hidden
		process.stdout.write('\x1B[?25h');
		process.stdout.write('\n');
		process.exit(1);
	}
};

async function run() {
	if (typeof projectPath === 'string') {
		projectPath = projectPath.trim();
	}

	if (!projectPath) {
		const res = await prompts({
			onState: onPromptState,
			type: 'text',
			name: 'path',
			message: 'What is your project named?',
			initial: 'my-app',
			validate: (name) => {
				const validation = validateNpmName(path.basename(path.resolve(name)));
				if (validation.valid) {
					return true;
				}
				return 'Invalid project name: ' + validation.problems![0];
			},
		});

		if (typeof res.path === 'string') {
			projectPath = res.path.trim();
		}
	}

	if (!projectPath) {
		console.log(
			'\nPlease specify the project directory:\n' +
				`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}\n` +
				'For example:\n' +
				`  ${chalk.cyan(program.name())} ${chalk.green('my-next-app')}\n\n` +
				`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
		);
		process.exit(1);
	}

	const resolvedProjectPath = path.resolve(projectPath);
	const projectName = path.basename(resolvedProjectPath);

	const { valid, problems } = validateNpmName(projectName);

	if (!valid) {
		console.error(
			`Could not create a project called ${chalk.red(`"${projectName}"`)} because of npm naming restrictions:`
		);

		problems!.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`));
		process.exit(1);
	}

	/**
	 * Verify the project dir is empty or doesn't exist
	 */
	const root = path.resolve(resolvedProjectPath);
	const appName = path.basename(root);
	const folderExists = fs.existsSync(root);

	if (folderExists && !isFolderEmpty(root, appName)) {
		process.exit(1);
	}

	// const example = typeof program.example === 'string' && program.example.trim();
	const preferences = {} as Record<string, boolean | string>;

	const defaults: typeof preferences = {
		chakraUi: true,
	};

	const getPrefOrDefault = (field: string) => preferences[field] ?? defaults[field];

	if (!process.argv.includes('--chakra-ui') && !process.argv.includes('--no-chakra-ui')) {
		if (ciInfo.isCI) {
			// program.chakraUi = false;
		} else {
			const chakra = chalk.hex('#38B2AC')('Chakra UI');

			const { chakraUi } = await prompts({
				onState: onPromptState,
				type: 'toggle',
				name: 'chakraUi',
				message: `Would you like to use ${chakra} with this project?`,
				initial: getPrefOrDefault('tailwind'),
				active: 'Yes',
				inactive: 'No',
			});

			// program.chakraUi = Boolean(chakraUi);
			preferences.chakraUi = Boolean(chakraUi);
		}
	}

	if (!process.argv.includes('--bugsnag') && !process.argv.includes('--no-chakra-ui')) {
		if (ciInfo.isCI) {
			// program.bugsnag = false;
		} else {
			const bugsnaglabel = chalk.hex('#38B2AC')('Bugsnag');

			const { bugsnag } = await prompts({
				onState: onPromptState,
				type: 'toggle',
				name: 'bugsnag',
				message: `Would you like to use ${bugsnaglabel} with this project?`,
				initial: getPrefOrDefault('bugsnag'),
				active: 'Yes',
				inactive: 'No',
			});

			// program.bugsnag = Boolean(bugsnag);
			preferences.bugsnag = Boolean(bugsnag);
		}
	}

	const options = program.opts();
	const limit = options.first ? 1 : undefined;
	console.log(program);
}

run();
