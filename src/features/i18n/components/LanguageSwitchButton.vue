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
import { LANGUAGE_PATH } from '@/config/featureSettings';
import UIIcon from '@/features/icons/components/UIIcon.vue';
import { useSettings } from '@/features/settings/composables/useSettings';
import { setLocale, SUPPORTED_LANGUAGES } from '@/i18n';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const { setSetting, getSetting } = useSettings();

const isOpen = ref(false);
const languageDropdown = ref(null);

const selectLanguage = function selectLanguage(code) {
    setSetting(LANGUAGE_PATH, code);
    close();
};

watch(() => getSetting(LANGUAGE_PATH), setLocale);

const close = function close() {
    document.removeEventListener('click', closeWrapperOnClickOutside);
    isOpen.value = false;
};

const closeWrapperOnClickOutside = function closeWrapperOnClickOutside(e) {
    if (languageDropdown.value) {
        if (!languageDropdown.value.contains(e.target)) {
            close();
        };
    };
};

const open = function open() {
    if (!isOpen.value) {
        isOpen.value = true;
        setTimeout(() => {
            document.addEventListener('click', closeWrapperOnClickOutside);
        }, 0);
    };
};
</script>

<template>
    <div class="language-switch" tabindex="-1">
        <button
            class="language-button button"
            @click="open"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
        >
            <span class="lang-code">{{ t(`preferences.locale.languages.${locale}`) }}</span>
            <span class="chevron" :class="{ open: isOpen }">
                <UIIcon name="chevron-down" size="1em" />
            </span>
        </button>

        <ul
            v-if="isOpen"
            ref="languageDropdown"
            class="language-dropdown"
            role="listbox"
            :style="{
                bottom: 'calc(var(--offset) + 2 * var(--trigger-padding-y) + 1em)' // easier to add auto adaption to the available space
            }"
        >
            <li
                v-for="lang in SUPPORTED_LANGUAGES"
                :key="lang"
                role="option"
                :aria-selected="lang === locale"
                :class="{ active: lang === locale }"
                @click="selectLanguage(lang)"
            >
                <span class="lang-label">{{ t(`preferences.locale.languages.${lang}`) }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.language-switch {
    --trigger-padding-y: 4px;
    position: relative;
}

.language-button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: var(--trigger-padding-y) 10px;
    cursor: pointer;
    color: var(--dark);
}

.language-button:hover {
    background-color: var(--light-hover);
}

.chevron {
    font-size: 0.75rem;
    transition: transform 0.2s;
    display: inline-block;
}

.chevron.open {
    transform: rotate(180deg);
}

.language-dropdown {
    --offset: 6px;
    position: absolute;
    right: 0;
    background-color: var(--light-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    list-style: none;
    margin: 0;
    padding: 6px 0;
    min-width: 160px;
    z-index: 100;
}

.language-dropdown li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9rem;
}

.language-dropdown li:hover {
    background-color: var(--light-hover);
}

.language-dropdown li.active {
    font-weight: bold;
}

.flag {
    font-size: 1.1rem;
}
</style>
