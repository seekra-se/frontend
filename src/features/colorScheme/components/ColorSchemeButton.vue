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
import Icon from '@/features/icons/components/Icon.vue';

import { useSettings } from '@/features/settings/composables/useSettings';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { getSetting, setSetting } = useSettings();

const colorScheme = computed(() => getSetting(['appearance', 'colorScheme']));

const colorSchemeNextMapper = {
    'light': 'dark',
    'dark': 'auto',
    'auto': 'light'
};

const colorSchemeIconMapper = {
    'dark': 'crescent-moon',
    'light': 'sun',
    'auto': 'circle-black-white'
};

const getTooltipTranslation = function getTooltipTranslation(colorScheme) {
    return t(`preferences.colorScheme.switch.${colorSchemeNextMapper[colorScheme]}`);
};

const setColorScheme = function setColorScheme(newColorScheme) {
    setSetting(['appearance', 'colorScheme'], newColorScheme);
};
</script>

<template>
    <button class="color-scheme-button"
        @click="setColorScheme(colorSchemeNextMapper[colorScheme])"
        :aria-label="getTooltipTranslation(colorScheme)"
        :title="getTooltipTranslation(colorScheme)"
    >
        <Icon
            :name="colorSchemeIconMapper[colorSchemeNextMapper[colorScheme]]"
            size="16"
        />
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
