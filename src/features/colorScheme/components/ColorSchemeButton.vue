<!--
Copyright 2026 Seekra

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<script setup>
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const colorScheme = inject('colorScheme');

const colorSchemeNextMapper = {
    'light': 'dark',
    'dark': 'auto',
    'auto': 'light'
};

const colorSchemeIconMapper = {
    'dark': '⏾',
    'light': '☀',
    'auto': '◐'
};

const getTooltipTranslation = function (colorScheme) {
    return t(`preferences.colorScheme.switch.${colorSchemeNextMapper[colorScheme]}`);
};
</script>

<template>
    <button class="color-scheme-button"
        @click="colorScheme = colorSchemeNextMapper[colorScheme]"
        :aria-label="getTooltipTranslation(colorScheme)"
        :title="getTooltipTranslation(colorScheme)"
    >
        {{ colorSchemeIconMapper[colorSchemeNextMapper[colorScheme]] }}
    </button>
</template>

<style scoped>
.color-scheme-button {
    background: none;
    border: 1.5px solid var(--border);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark);
}

.color-scheme-button:hover {
    background: var(--light-hover);
}
</style>