/*
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
*/

import { createI18n } from 'vue-i18n';
import getCurrentLanguage from './utils/currentLanguage';

export const fallbackLocale = 'en';

const SUPPORTED_LANGUAGES = [
    'en'
];

export const i18n = createI18n({
    legacy: false,
    locale: getCurrentLanguage(),
    fallbackLocale: fallbackLocale,
    messages: {}
});

const loadedLanguages = new Set();

export async function loadLanguage (locale) {
    if (!SUPPORTED_LANGUAGES.includes(locale)) {
        locale = fallbackLocale;
    }

    if (loadedLanguages.has(locale)) {
        i18n.global.locale.value = locale;
        return;
    };

    const messages = (await import(`./locales/${locale}.json`)).default;

    i18n.global.setLocaleMessage(locale, messages);
    i18n.global.locale.value = locale;

    loadedLanguages.add(locale);
};