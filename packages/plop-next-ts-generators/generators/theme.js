const INIT_COMMAND = 'init';
const ADD_FOUNDATION_COMMAND = 'add-foundation';
const ADD_COMPONENT_COMMAND = 'add-component';
const commands = [INIT_COMMAND, ADD_FOUNDATION_COMMAND, ADD_COMPONENT_COMMAND];

const {
	dir,
	componentTypes,
	RADIUS_FOUNDATION,
	SPACING_FOUNDATION,
	TYPOGRAPHY_FOUNDATION,
	Z_INDEX_FOUNDATION,
	foundations,
	defaultConfig,
} = require('../constants');

/**
 * @param {import('../index').Config} config
 * @returns {import("plop").GeneratorConfig}
 */
module.exports = function theme(config) {
	const { baseUrl } = { ...defaultConfig, ...config };

	console.log(dir);

	return {
		description: 'Generate a Chakra UI theme',
		prompts: [
			{
				type: 'list',
				name: 'command',
				message: 'Select a command:',
				default: commands,
				choices: commands,
			},
			{
				when: ({ command }) => command === ADD_FOUNDATION_COMMAND,
				type: 'list',
				name: 'foundation',
				message: 'Select foundation:',
				default: foundations[0],
				choices: foundations,
			},
			{
				when: ({ command }) => command === ADD_COMPONENT_COMMAND,
				type: 'input',
				name: 'name',
				message: 'Enter component name:',
			},
			{
				when: ({ command }) => command === ADD_COMPONENT_COMMAND,
				type: 'list',
				name: 'componentType',
				message: 'Select a component type:',
				default: componentTypes[0],
				choices: componentTypes,
			},
		],
		actions(answers) {
			const actions = [];

			if (!answers) return actions;

			const { command, name } = answers;

			/**
			 * Init theme
			 */
			if (command === INIT_COMMAND) {
				actions.push({
					type: 'add',
					path: `${baseUrl}/styles/theme/index.ts`,
					templateFile: `${dir}/templates/theme/init/theme.hbs`,
				});
			}

			/**
			 * Foundation theme generator
			 */
			if (command === ADD_FOUNDATION_COMMAND) {
				const isRadius = answers.foundation === RADIUS_FOUNDATION;
				const isSpacing = answers.foundation === SPACING_FOUNDATION;
				const isTypography = answers.foundation === TYPOGRAPHY_FOUNDATION;
				const isZIndex = answers.foundation === Z_INDEX_FOUNDATION;

				actions.push({
					type: 'add',
					path: `${baseUrl}/styles/theme/foundations/{{dashCase foundation}}.ts`,
					templateFile: `${dir}/templates/theme/foundations/{{dashCase foundation}}.hbs`,
				});

				let importTemplate = `import \{ {{foundation}} \} from './foundations/{{foundation}}';\n// -- PLOP:IMPORT_FOUNDATION_THEME --`;

				// radius foundation should be imported as radii
				if (isRadius) {
					importTemplate = `import \{ radii \} from './foundations/radius';\n// -- PLOP:IMPORT_FOUNDATION_THEME --`;
				}

				// z-index foundation should be imported as zIndices
				if (isZIndex) {
					importTemplate = `import \{ zIndices \} from './foundations/z-index';\n// -- PLOP:IMPORT_FOUNDATION_THEME --`;
				}

				actions.push({
					type: 'modify',
					path: `${baseUrl}/styles/theme/index.ts`,
					pattern: /\/\/ -- PLOP:IMPORT_FOUNDATION_THEME --/gi,
					template: importTemplate,
					data: { name },
				});

				let registerTemplate = `{{foundation}},\n		// -- PLOP:REGISTER_FOUNDATION_THEME --`;

				// radius foundation should be registered as radii
				if (isRadius) {
					registerTemplate = `radii,\n		// -- PLOP:REGISTER_FOUNDATION_THEME --`;
				}

				// spacing foundation should be renamed to space
				if (isSpacing) {
					registerTemplate = `space: {{foundation}},\n		// -- PLOP:REGISTER_FOUNDATION_THEME --`;
				}

				// typography foundation should be spread
				if (isTypography) {
					registerTemplate = `...{{foundation}},\n		// -- PLOP:REGISTER_FOUNDATION_THEME --`;
				}

				// z-index foundation should be registered to zIndices
				if (isZIndex) {
					registerTemplate = `zIndices,\n		// -- PLOP:REGISTER_FOUNDATION_THEME --`;
				}

				actions.push({
					type: 'modify',
					path: `${baseUrl}/styles/theme/index.ts`,
					pattern: /\/\/ -- PLOP:REGISTER_FOUNDATION_THEME --/gi,
					template: registerTemplate,
					data: { name },
				});
			}

			/**
			 * Component theme generator
			 */
			if (command === ADD_COMPONENT_COMMAND) {
				actions.push({
					type: 'add',
					path: `${baseUrl}/styles/theme/components/{{dashCase name}}.ts`,
					templateFile: `${dir}/templates/theme/components/{{componentType}}.hbs`,
					data: { name },
				});

				actions.push({
					type: 'modify',
					path: `${baseUrl}/styles/theme/index.ts`,
					pattern: /\/\/ -- PLOP:IMPORT_COMPONENT_THEME --/gi,
					template: `import \{ {{camelCase name}}Theme as {{pascalCase name}} \} from './components/{{dashCase name}}';\n// -- PLOP:IMPORT_COMPONENT_THEME --`,
					data: { name },
				});

				actions.push({
					type: 'modify',
					path: `${baseUrl}/styles/theme/index.ts`,
					pattern: /\/\/ -- PLOP:REGISTER_COMPONENT_THEME --/gi,
					template: `{{pascalCase name}},\n		// -- PLOP:REGISTER_COMPONENT_THEME --`,
					data: { name },
				});
			}

			return actions;
		},
	};
};
