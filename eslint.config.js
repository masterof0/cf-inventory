import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		plugins: { js },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	tseslint.configs.recommended,
	pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
	{
		files: ['**/*.json'],
		plugins: { json },
		language: 'json/json',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: true,
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
		},
		extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	},
	{
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'max-len': ['error', { code: 120 }],
			quotes: ['warn', 'single'],
			indent: ['warn', '2'],
		},
	},
	eslintPluginPrettierRecommended,
])
