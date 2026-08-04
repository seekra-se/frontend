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

import { useSettingsConfigCacheStore } from '../../stores/settingsConfigCacheStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useSettings } from '../useSettings';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const settingDefaultValue = 42;
const settingPath = ['test', 'number'];

describe('useSettings', () => {
    describe('getSetting', () => {
        test('returns stored value', () => {
            const { getSetting } = useSettings();
            const settings = useSettingsStore();

            const key = 'setting';
            const value = 42;

            settings.set(key, value);

            expect(getSetting(key)).toBe(value);
        });

        test('returns default value', () => {
            const { getSetting } = useSettings();
            expect(getSetting(settingPath)).toBe(settingDefaultValue);
        });

        test('returns stored value instead of default value', () => {
            const { getSetting } = useSettings();
            const settings = useSettingsStore();

            const value = 43;

            expect(getSetting(settingPath)).toBe(settingDefaultValue);

            settings.set(settingPath, value);
            expect(getSetting(settingPath)).toBe(value);
        });
    });
});

beforeEach(() => {
    setActivePinia(
        createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
        })
    );
    const settingsConfigCache = useSettingsConfigCacheStore();
    settingsConfigCache.set({
        contents: [
            {
                name: 'test',
                i18n: '',
                content: [
                    {
                        type: 'number',
                        i18n: '',
                        name: 'number',
                        default: settingDefaultValue
                    }
                ]
            }
        ]
    });
});
