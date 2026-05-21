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
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadLanguage, LANGUAGES_RTL } from '@/i18n';

const { locale } = useI18n();

const isOpen = ref(false);

const languages = [
    { code: 'en', label: 'English',    flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
    { code: 'fr', label: 'Français',   flag: '🇫🇷' },
    { code: 'es', label: 'Español',    flag: '🇪🇸' },
    { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
    { code: 'pt', label: 'Português',  flag: '🇵🇹' },
];

const currentLanguage = computed(
    () => languages.find(l => l.code === locale.value) ?? languages[0]
);

async function selectLanguage(code) {
    await loadLanguage(code);
    localStorage.setItem('locale', code);
    document.documentElement.lang = code;
    document.documentElement.dir = LANGUAGES_RTL.includes(code) ? 'rtl' : 'ltr';
    isOpen.value = false;
}

function toggle() {
    isOpen.value = !isOpen.value;
}

function closeOnBlur() {
    // A short delay so that the click on the option can be registered
    setTimeout(() => { isOpen.value = false; }, 150);
}
</script>

<template>
    <div class="language-switch" @blur="closeOnBlur" tabindex="-1">
        <button
            class="language-button button"
            @click="toggle"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
        >
            <span class="flag">{{ currentLanguage.flag }}</span>
            <span class="lang-code">{{ currentLanguage.code.toUpperCase() }}</span>
            <span class="chevron" :class="{ open: isOpen }">▾</span>
        </button>

        <ul v-if="isOpen" class="language-dropdown" role="listbox">
            <li
                v-for="lang in languages"
                :key="lang.code"
                role="option"
                :aria-selected="lang.code === locale"
                :class="{ active: lang.code === locale }"
                @click="selectLanguage(lang.code)"
            >
                <span class="flag">{{ lang.flag }}</span>
                <span class="lang-label">{{ lang.label }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.language-switch {
    position: relative;
}

.language-button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1px solid var(--dark);
    border-radius: 6px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--dark);
}

.language-button:hover {
    background-color: var(--light-d-1);
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
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background-color: var(--light-bg);
    border: 1px solid var(--light-d-1);
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
    background-color: var(--light-d-1);
}

.language-dropdown li.active {
    font-weight: bold;
}

.flag {
    font-size: 1.1rem;
}
</style>