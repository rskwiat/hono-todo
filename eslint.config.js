import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: [
      '/**/node_modules/*',
      'node_modules/',
      'dist/',
      'build/',
      'out/',
    ]
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': ['warn'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-process-env': ['error'],
    }
  },
];
