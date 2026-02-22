import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', 'public/**'],
	},
	...tseslint.configs.recommended,
	prettier,
);
