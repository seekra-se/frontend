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

import { validateSettingsConfig } from './settingsValidator.js';

/**
 * Loads and parses the settings configuration from a JSON file.
 * @param {string} [url='/settings.json']
 * @returns {Promise<import('../types/settingsConfig').SettingsConfig>}
 */
export async function loadSettingsConfig(url = '/settings.json') {
    let raw;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        raw = await response.json();
    } catch (e) {
        throw new Error(`[settings] Failed to load config from "${url}": ${e.message}`);
    }

    const result = validateSettingsConfig(raw);
    if (!result.valid) {
        throw new Error(result.error);
    }

    return result.config;
}