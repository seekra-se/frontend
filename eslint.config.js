import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

const commonRules = {
    'eqeqeq': 'error', // prettier-ignore

    'prefer-const': 'error',
    'no-var': 'error',
    'no-duplicate-imports': 'error',
    'no-import-assign': 'error',

    'prefer-arrow-callback': 'error',
    'require-await': 'warn',
    'no-async-promise-executor': 'error',

    'no-unreachable': 'error',
    'no-constant-condition': 'error',

    'no-debugger': 'error',
    'no-alert': 'error',
    'no-console': 'warn',

    'no-new-object': 'error',
    'no-array-constructor': 'error',
    'no-prototype-builtins': 'error',
    'object-shorthand': 'error',

    'prefer-template': 'error',
};

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: commonRules,
    },

    pluginVue.configs['flat/essential'],

    {
        files: ['**/*.{js,mjs,cjs}'],
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',

            'no-empty-function': 'error',
            'default-param-last': 'error',
        },
    },

    {
        files: ['**/*.{ts,mts,cts,vue}'],
        extends: [tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'no-undef': 'off',

            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/default-param-last': 'error',

            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: ['.vue'],
            },
        },
    },
]);
