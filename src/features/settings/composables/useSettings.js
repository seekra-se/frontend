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

import { useSettingsStore } from '../stores/settingsStore';
import { getSettingRecursively } from '../utils/getSetting';
import { loadSettingsConfig } from '../utils/settingsParser';

/**
 * Provides access to the stored settings.
 */
export const useSettings = function useSettings () {
    /**
     * Returns the value of a specific setting.
     * @param {string[]} key - The settings key.
     * @return The value of the setting.
     */
    const getSetting = async function getSetting (key) {
        const settingsStore = useSettingsStore();

        const settings = await loadSettingsConfig();
        return (
            settingsStore.get(key) ??
            getSettingRecursively(
                key, settings.contents ?? []
            )?.default
        );
    };

    return { getSetting };
};
