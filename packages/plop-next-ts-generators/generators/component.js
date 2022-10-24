const {
	dir,
	CORE_DOMAIN,
	SHARED_DOMAIN,
	FEATURE_DOMAIN,
	rootDomains,
	MULTI_PART_COMPONENT,
	componentTypes,
	defaultConfig,
} = require('../constants');

/**
 * @param {import('../index').Config} config
 * @returns {import("plop").GeneratorConfig}
 */
module.exports = function component(config) {
	const { baseUrl, componentsUrl } = { ...defaultConfig, ...config };

	return {
		description: 'Generates a Chakra UI component',
		prompts: [
			{
				type: 'list',
				name: 'rootDomain',
				message: 'Select a root domain:',
				default: rootDomains[0],
				choices: rootDomains,
			},
			{
				when: ({ rootDomain }) => rootDomain === SHARED_DOMAIN || rootDomain === FEATURE_DOMAIN,
				type: 'input',
				name: 'subDomain',
				message: (answer) => {
					const { rootDomain } = answer;

					if (rootDomain === SHARED_DOMAIN) {
						return 'Enter shared component domain (e.g. buttons):';
					}

					if (rootDomain === FEATURE_DOMAIN) {
						return 'Enter feature component domain (e.g. todos):';
					}
				},
			},
			{
				when: ({ rootDomain }) => rootDomain === CORE_DOMAIN,
				type: 'list',
				name: 'componentType',
				message: (answer) => `Enter ${answer.rootDomain} component type:`,
				default: componentTypes[0],
				choices: componentTypes,
			},
			{
				type: 'input',
				name: 'name',
				message: (answer) => {
					const { rootDomain } = answer;

					if (rootDomain === SHARED_DOMAIN) {
						return 'Enter component name (e.g. ShareButton):';
					}

					if (rootDomain === FEATURE_DOMAIN) {
						return 'Enter component name (e.g. TodoSection):';
					}

					return 'Enter component name (e.g. MyComponent):';
				},
			},
		],
		actions(answers) {
			const actions = [];

			if (!answers) return actions;

			const { rootDomain, name, componentType } = answers;

			const isCoreDomain = rootDomain === CORE_DOMAIN;
			const isSharedDomain = rootDomain === SHARED_DOMAIN;
			const isFeatureDomain = rootDomain === FEATURE_DOMAIN;
			const isMultipartComponent = componentType === MULTI_PART_COMPONENT;

			const parts = ['button', 'panel', 'icon'];

			if (isCoreDomain) {
				actions.push({
					type: 'addMany',
					destination: `${baseUrl}/${componentsUrl}/{{rootDomain}}/{{pascalCase name}}`,
					templateFiles: `${dir}/templates/component/{{rootDomain}}/{{componentType}}/**`,
					base: `${dir}/templates/component/{{rootDomain}}/{{componentType}}`,
					data: isMultipartComponent ? { name, parts } : { name },
					abortOnFail: true,
				});

				actions.push({
					type: 'add',
					path: `${baseUrl}/styles/theme/components/{{dashCase name}}.ts`,
					templateFile: `${dir}/templates/theme/components/{{componentType}}.hbs`,
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

			if (isSharedDomain || isFeatureDomain) {
				actions.push({
					type: 'addMany',
					destination: `${baseUrl}/${componentsUrl}/{{rootDomain}}/{{dashCase subDomain}}/{{pascalCase name}}`,
					templateFiles: `${dir}/templates/component/{{rootDomain}}/{{componentType}}/**`,
					base: `${dir}/templates/component/{{rootDomain}}/{{componentType}}`,
					data: { name },
					abortOnFail: true,
				});
			}

			return actions;
		},
	};
};
