const stylelint = require('stylelint');
const ruleName = 'ml-sasslib/module-imports';

const messages = stylelint.utils.ruleMessages(ruleName, {
	expectedImport: (importName) => `Expected import of "${importName}"`,
	invalidImportPath: (importPath) => `Invalid import path "${importPath}"`,
});

/** @type {import('stylelint').Rule} */
module.exports = stylelint.createPlugin(ruleName, (isEnabled) => {
	return (root, result) => {
		if (!isEnabled) return;

		// Check if the file name contains '.module.'
		const file = root.source.input.file;
		if (!file || !file.includes('.module.')) return;

		let baseComponentStyleImported = false;
		const visitedFiles = new Set();

		// Recursive function to check imports
		function checkImports(root) {
			if (visitedFiles.has(root.source.input.file)) {
				// If this file has already been visited, skip it to avoid infinite loop
				return;
			}
			visitedFiles.add(root.source.input.file);

			// Check for imports in this file
			root.walkAtRules('import', (atRule) => {
				const importPath = atRule.params.replace(/["']/g, ''); // Remove quotes from the import path
				if (importPath.includes('lib/component')) {
					baseComponentStyleImported = true;
				} else {
					// If the import does not match, recursively check the imported file
					const importedRoot = atRule.root();
					if (importedRoot) {
						checkImports(importedRoot);
					}
				}
			});
		}

		// Start checking imports from the root
		checkImports(root);

		if (!baseComponentStyleImported) {
			// Report error if lib/component is not imported
			stylelint.utils.report({
				message: messages.expectedImport('lib/component'),
				node: root,
				result,
				ruleName,
			});
		}
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
