const mlModuleMeta = require('./src/styles/rules/module-metadata');
const mlModuleImports = require('./src/styles/rules/module-imports');

module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
	plugins: [mlModuleMeta, mlModuleImports],
	rules: {
		'selector-class-pattern': null,
		'function-name-case': null,
		'scss/at-function-pattern': null,
		'scss/at-mixin-pattern': null,

		'keyframes-name-pattern': null,
		'value-keyword-case': null,

		'scss/dollar-variable-pattern': null,

		'ml-sasslib/module-metadata': true,
		'ml-sasslib/module-imports': true,
	},
};
