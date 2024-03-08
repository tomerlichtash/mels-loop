const stylelint = require('stylelint');
const ruleName = 'ml-sasslib/module-metadata';

const moduleMetaNamespace = `$__stylesheet__`;

const messages = stylelint.utils.ruleMessages(ruleName, {
	expectedVariable: (variableName) => `Expected module to define "${variableName}"`,
	expectedMap: () => `Variable "${moduleMetaNamespace}" must be a map`,
	expectedStringProperty: () =>
		`Property 'name' of variable "${moduleMetaNamespace}" must be a string`,
});

/** @type {import('stylelint').Rule} */
module.exports = stylelint.createPlugin(ruleName, (isEnabled) => {
	return (root, result) => {
		if (!isEnabled) return;

		// Check if the file name contains '.module.'
		const file = root.source.input.file;
		if (!file || !file.includes('.module.')) return;

		let stylesheetVariable;

		// Check all declarations within the root
		root.walkDecls((decl) => {
			// Check if the declaration belongs to a variable named properly
			if (decl.prop === moduleMetaNamespace) {
				// If found, mark the variable as existing and store it
				stylesheetVariable = decl.value;
			}
		});

		if (!stylesheetVariable) {
			// If the variable was not found, report the error
			stylelint.utils.report({
				message: messages.expectedVariable(moduleMetaNamespace),
				node: root,
				result,
				ruleName,
			});
		} else {
			// Check if the variable is a map
			if (!stylesheetVariable.startsWith('(') || !stylesheetVariable.endsWith(')')) {
				stylelint.utils.report({
					message: messages.expectedMap(),
					node: root,
					result,
					ruleName,
				});
				return;
			}

			// Parse the variable value as a map
			const mapValue = stylesheetVariable.slice(1, -1);
			const mapItems = mapValue.split(',').map((item) => item.trim().split(':'));
			const map = Object.fromEntries(mapItems);

			// Check if the map contains a 'name' property
			if (!Object.prototype.hasOwnProperty.call(map, 'name')) {
				stylelint.utils.report({
					message: messages.expectedStringProperty(),
					node: root,
					result,
					ruleName,
				});
				return;
			}

			// Check if the 'name' property is a string
			if (!/^\([^()]+\)$/.test(stylesheetVariable)) {
				stylelint.utils.report({
					message: messages.expectedStringProperty(),
					node: root,
					result,
					ruleName,
				});
				return;
			}
		}
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
