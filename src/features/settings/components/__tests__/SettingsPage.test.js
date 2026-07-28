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

import Selection from '../Selection.vue';
import SettingsInput from '../SettingsInput.vue';
import SettingsPage from '../SettingsPage.vue';
import SettingsPageLink from '../SettingsPageLink.vue';
import Switch from '../Switch.vue';
import { mountComponent } from '@/test-utils/mountComponent.js';
import { describe, expect, test } from 'vitest';


const getWrapper = function getWrapper({ content = [], translations = {}, piniaOptions = {} }) {
    return mountComponent(SettingsPage, {
        attrs: {
            setting: {
                name: 'section',
                type: 'section',
                i18n: 'section',
                content: content
            },
            path: 'section'
        }
    }, translations, [], piniaOptions);
};

const exampleSettings = [
    {
        type: 'bool',
        name: 'b0',
        i18n: 'settings.section.b0'
    },
    {
        type: 'number',
        name: 'n0',
        i18n: 'settings.section.n0'
    },
    {
        type: 'string',
        name: 'st0',
        i18n: 'settings.section1.st0'
    },
    {
        type: 'selection',
        name: 'se0',
        i18n: 'settings.section.se0',
        options: [
            { name: 'o0', i18n: 'settings.section.se0.o0' },
            { name: 'o1', i18n: 'settings.section.se0.o1' },
            { name: 'o2', i18n: 'settings.section.se0.o2' },
            { name: 'o3', i18n: 'settings.section.se0.o3' }
        ]
    },
    {
        type: 'section',
        name: 's0',
        i18n: 'settings.section.s0',
        content: []
    },
    {
        type: 'section',
        name: 's1',
        i18n: 'settings.section.s1',
        content: [
            {
                type: 'bool',
                name: 'b0',
                i18n: 'settings.section.s1.b0',
                default: true
            }
        ]
    }
];

describe('SettingsPage', () => {
    test('shows correct heading', () => {
        const translation = 'Example section';
        const wrapper = getWrapper({
            translations: { section: translation }
        });

        const heading = wrapper.find('.section-heading');
        expect(heading.text()).toBe(translation);
    });

    test('shows settings correctly', () => {
        const wrapper = getWrapper({
            content: exampleSettings
        });


        const settingsWrappers = wrapper.findAll('.setting');
        expect(settingsWrappers.length).toBe(exampleSettings.length);

        exampleSettings.forEach((expectedSetting, index) => {
            const settingWrapper = settingsWrappers[index];

            const switchSetting = settingWrapper.findComponent(Switch);
            const inputSetting = settingWrapper.findComponent(SettingsInput);
            const selectionSetting = settingWrapper.findComponent(Selection);
            const settingsPageLink = settingWrapper.findComponent(SettingsPageLink);

            let setting;
            if (expectedSetting.type === 'bool') {
                expect(switchSetting.exists()).toBe(true);
                expect(inputSetting.exists()).toBe(false);
                expect(selectionSetting.exists()).toBe(false);
                expect(settingsPageLink.exists()).toBe(false);

                setting = switchSetting;
            } else if (expectedSetting.type === 'string' || expectedSetting.type === 'number') {
                expect(switchSetting.exists()).toBe(false);
                expect(inputSetting.exists()).toBe(true);
                expect(selectionSetting.exists()).toBe(false);
                expect(settingsPageLink.exists()).toBe(false);

                setting = inputSetting;
            } else if (expectedSetting.type === 'selection') {
                expect(switchSetting.exists()).toBe(false);
                expect(inputSetting.exists()).toBe(false);
                expect(selectionSetting.exists()).toBe(true);
                expect(settingsPageLink.exists()).toBe(false);

                setting = selectionSetting;
            } else {
                expect(switchSetting.exists()).toBe(false);
                expect(inputSetting.exists()).toBe(false);
                expect(selectionSetting.exists()).toBe(false);
                expect(settingsPageLink.exists()).toBe(true);

                setting = settingsPageLink;
            }
            if (
                expectedSetting.type === 'bool' ||
                expectedSetting.type === 'string' ||
                expectedSetting.type === 'number' ||
                expectedSetting.type === 'selection'
            ) {
                expect(setting.props('setting')).toMatchObject(expectedSetting);
                expect(setting.props('path')).toBe(`section.${expectedSetting.name}`);
            } else {
                expect(setting.props('displayName')).toBe(expectedSetting.i18n);
                expect(setting.props('target')).toBe(`section.${expectedSetting.name}`);
            }
        });
    });
});