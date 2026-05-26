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

import { ref, readonly } from 'vue';
import { loadSettingsConfig } from '../utils/settingsParser.js';

const config  = ref(null);
const error   = ref(null);
const loading = ref(false);

/**
 * Provides reactive access to the parsed settings configuration.
 * The config is loaded once and shared across all consumers.
 */
export function useSettingsConfig() {
    async function load(url = '/settings.json') {
        loading.value = true;
        error.value   = null;
        try {
            config.value = await loadSettingsConfig(url);
        } catch (e) {
            error.value  = e.message;
            config.value = null;
        } finally {
            loading.value = false;
        }
    }

    return {
        config:  readonly(config),
        error:   readonly(error),
        loading: readonly(loading),
        load,
    };
}