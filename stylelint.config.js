const mlModuleMeta = require('./src/styles/rules/module-metadata');
const mlModuleImports = require('./src/styles/rules/module-imports');

module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
	plugins: [mlModuleMeta, mlModuleImports],
	rules: {
		'ml-sasslib/module-metadata': true,
		'ml-sasslib/module-imports': true,

		'selector-class-pattern': null, // don't enforce kebab-case classnames
		'scss/dollar-variable-pattern': null,
		'function-name-case': null,
	},
};
