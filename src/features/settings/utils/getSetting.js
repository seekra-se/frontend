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

export const getSetting = function getSetting (name, settings) {
    return settings.filter((setting) => setting.name === name)[0];
};

export const getSettingRecursively = function getSettingRecursively (sectionPath, settings) {
    const oneSettingsLevel = function oneSettingsLevel (cursor, acc) {
        const setting = getSetting(cursor[0], acc.content);
        if (!setting) return;

        if (setting.type === undefined) setting.type = 'section';
        if (setting.type === 'section') {
            const newCursor = cursor.slice(1, cursor.length);

            if (newCursor.length !== 0) {
                return oneSettingsLevel(cursor.slice(1, cursor.length), setting);
            } else {
                return setting;
            }
        } else if (cursor.length <= 1) {
            return setting;
        } else {
            return;
        }
    };
    return oneSettingsLevel(sectionPath, { content: settings });
};
