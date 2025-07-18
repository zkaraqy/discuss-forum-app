import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': fixupPluginRules(pluginHooks),
    },
    rules: pluginHooks.configs.recommended.rules,
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
  daStyle,
  {
    rules: {
      'linebreak-style': 'off',
      'no-alert': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 'off',
    },
  },
];
