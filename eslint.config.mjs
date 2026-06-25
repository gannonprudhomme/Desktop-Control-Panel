import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.cache/**',
      '.context/**',
      'config/**',
      'dist/**',
      'node_modules/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,js}', 'types/**/*.ts', 'dev/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['*.config.{js,mjs,ts}', 'scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
