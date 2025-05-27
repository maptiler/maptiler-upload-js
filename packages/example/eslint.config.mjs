// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier/recommended'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: './types', group: 'type', position: 'after' },
          ],
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-const' },
      ],
      'comma-dangle': ['error', 'always-multiline'],
      curly: ['error', 'all'],
      'no-console': 'error',
      eqeqeq: 'error',
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
])
