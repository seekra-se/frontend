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

import { getAssetsUrl } from './config/env';
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import { i18n, loadLanguage, fallbackLocale } from './i18n';
import router from './router'
import './styles/common.css'
import './styles/variables/colors.css'
import './styles/variables/dimensions.css';

import rawFonts from './styles/fonts.json';
import './styles/common.css';
import './styles/variables/colors.css';

import settings from './features/settings/config.js';
import { validateSettingsConfig } from './features/settings/utils/settingsValidator';

(async () => {
    const fonts = rawFonts.map((font) => new FontFace(
        font.family ?? '',
        Array.isArray(font.source)
            ? font.source.map(
                (source) => `url('${source.url
                    ? new URL(source.url, getAssetsUrl()).href
                    : ''
                }') format('${source.format ?? ''}')`
            ).join(',')
            : '',
        {
            weight: font.weight ?? undefined,
            style: font.style ?? undefined
        }
    ));
    await Promise.all(fonts.map((font) => font.load()));
    fonts.forEach((font) => document.fonts.add(font));

    await loadLanguage(fallbackLocale);

    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    validateSettingsConfig(settings);
    
    createApp(App)
        .use(router)
        .use(i18n)
        .use(pinia)
        .mount('#app');
})();
