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

import ColorSchemeButton from '../ColorSchemeButton.vue';
import { useSettings } from '@/features/settings/composables/useSettings.js';
import { mountComponent } from '@/test-utils/mountComponent';
import { describe, expect, test } from 'vitest';

const { getSetting } = useSettings();

const colorSchemeSettingPath = ['appearance', 'colorScheme']

const getWrapper = function getWrapper () {
    return mountComponent(ColorSchemeButton);
};

describe('ColorSchemeButton', () => {
    test('sets color scheme setting', async () => {
        const wrapper = getWrapper();

        expect(getSetting(colorSchemeSettingPath)).toBe('auto');
        
        const colorSchemeButton = wrapper.find('button');

        await colorSchemeButton.trigger('click');
        expect(getSetting(colorSchemeSettingPath)).toBe('light');

        await colorSchemeButton.trigger('click');
        expect(getSetting(colorSchemeSettingPath)).toBe('dark');

        await colorSchemeButton.trigger('click');
        expect(getSetting(colorSchemeSettingPath)).toBe('auto');
    });
});
