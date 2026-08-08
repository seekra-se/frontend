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

import { useSettingsStore } from '../../stores/settingsStore.js';
import SettingsSwitch from '../SettingsSwitch.vue';
import { mountComponent } from '@/test-utils/mountComponent.js';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

const getWrapper = function getWrapper({
    i18n = 'switch1',
    defaultValue = undefined,
    translations = {},
    piniaOptions = {}
} = {}) {
    return mountComponent(SettingsSwitch, {
        attrs: {
            setting: {
                type: 'bool',
                name: 'switch',
                i18n,
                default: defaultValue
            },
            path: 'switch'
        }
    }, translations, [], piniaOptions);
};

describe('SettingsSwitch', () => {
    test('shows value from store', async () => {
        const wrapper = getWrapper();

        const store = useSettingsStore();
        store.set('switch', true);
        await nextTick();

        const switchElement = wrapper.find('.switch-wrapper');
        const switchElementClasses = switchElement.classes();

        expect(switchElementClasses).toContain('enabled');

        store.set('switch', false);
        await nextTick();

        const switchElementClasses2 = switchElement.classes();
        expect(switchElementClasses2).not.toContain('enabled');
    });

    test('shows default value', () => {
        const wrapper = getWrapper({
            defaultValue: true
        });

        const switchElement = wrapper.find('.switch-wrapper');
        expect(switchElement.classes('enabled')).toBeTruthy();
    });

    test('shows stored value instead of default value', () => {
        const wrapper = getWrapper({
            defaultValue: true,
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.set('switch', false);
                }
            }
        });

        const switchElement = wrapper.find('.switch-wrapper');
        expect(switchElement.classes('enabled')).toBeFalsy();
    });

    test('reacts on store change', async () => {
        const wrapper = getWrapper();
        const store = useSettingsStore();

        const switchElement = wrapper.find('.switch-wrapper');
        expect(switchElement.classes('enabled')).toBeFalsy();

        store.set('switch', true);
        await nextTick();
        expect(switchElement.classes('enabled')).toBeTruthy();
    });

    test('toggles value in store', async () => {
        const wrapper = getWrapper();

        const switchElement = wrapper.find('.switch-wrapper');

        const store = useSettingsStore();
        expect(store.get('switch')).toBeUndefined();

        switchElement.trigger('click');
        await nextTick();
        expect(store.get('switch')).toBe(true);

        switchElement.trigger('click');
        await nextTick();
        expect(store.get('switch')).toBe(false);
    });

    test('shows correct translation', () => {
        const translation = 'Switch';

        const wrapper = getWrapper({
            translations: { switch1: translation }
        });

        const label = wrapper.find('label');
        expect(label.text()).toBe(translation);
    });
});
