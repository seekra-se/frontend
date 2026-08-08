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
                ...globals.node
            }
        }
    },
    pluginVue.configs['flat/essential'],
]);
