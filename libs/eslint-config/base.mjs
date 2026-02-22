import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'dist/**',
			'public/**',
			'storybook-static/**',
		],
	},
	...tseslint.configs.recommended,
	{
		plugins: { 'simple-import-sort': simpleImportSort },
		rules: {
			'no-duplicate-imports': 'error',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
	prettier,
);
