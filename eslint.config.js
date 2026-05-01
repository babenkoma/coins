import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		...pluginJs.configs.recommended,
		// JS
		rules: {},
	},
	...tseslint.configs.recommended,
	{
		// TS
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
		},
	},
	{
		...pluginReactConfig,
		// React.js
		rules: {
			'react/display-name': 'off',
			'react/require-render-return': 'off',
		},
	},
	{
		ignores: ['**/*.spec.ts', '**/*.spec.tsx', '**/@types/**/*'],
	},
];
