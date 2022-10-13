/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
	plop.setGenerator('component', {
		description: 'Generates a component package',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'Enter component name:',
			},
			{
				type: 'input',
				name: 'description',
				message: 'The description of this component:',
			},
		],
		actions(answers) {
			const actions = [];

			if (!answers) return actions;

			const { componentName, description } = answers;

			actions.push({
				type: 'addMany',
				templateFiles: 'plop/component/**',
				destination: `./packages/{{dashCase componentName}}`,
				base: 'plop/component',
				data: { description, componentName },
				abortOnFail: true,
			});

			return actions;
		},
	});

	plop.setGenerator('hook', {
		description: 'Generates a hook package',
		prompts: [
			{ type: 'input', name: 'hookName', message: 'Enter hook name:' },
			{ type: 'input', name: 'description', message: 'The description of this hook:' },
		],
		actions(answers) {
			const actions = [];

			if (!answers) return actions;

			const { hookName, description } = answers;

			actions.push({
				type: 'addMany',
				templateFiles: 'plop/hook/**',
				destination: `./packages/{{dashCase hookName}}`,
				base: 'plop/hook',
				data: { description, hookName },
				abortOnFail: true,
			});

			return actions;
		},
	});
};
