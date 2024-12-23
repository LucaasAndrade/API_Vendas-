import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import type { Linter } from "eslint";
import pluginPrettier from 'prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{ts, tsx}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  pluginPrettier.configs.recommended,
  {
    rules: {
      'no-console': [1],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
