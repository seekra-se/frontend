import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'eqeqeq': 'error',

            'no-unused-vars': 'error',
            'no-undef': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-duplicate-imports': 'error',
            'no-import-assign': 'error',

            'no-empty-function': 'error',
            'default-param-last': 'error',
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
        },
    },
    pluginVue.configs['flat/essential'],
]);
