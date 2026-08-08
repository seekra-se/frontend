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
import SettingsInput from '../SettingsInput.vue';
import { mountComponent } from '@/test-utils/mountComponent';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

const getWrapper = function getWrapper({ type = 'string', i18n = 'input', defaultValue = undefined, piniaOptions = {} } = {}) {
    return mountComponent(SettingsInput, {
        attrs: {
            setting: {
                name: 'input',
                default: defaultValue,
                i18n,
                type
            },
            path: 'input'
        }
    }, {}, [], piniaOptions);
};

describe('SettingsInput', () => {
    test('uses correct input type', () => {
        const stringSettingWrapper = getWrapper();

        const stringInputElement = stringSettingWrapper.find('input');
        expect(stringInputElement.attributes('type')).toBe('text');

        const numberSettingWrapper = getWrapper({ type: 'number' });

        const numberInputElement = numberSettingWrapper.find('input');
        expect(numberInputElement.attributes('type')).toBe('number');
    });

    test('shows empty value', () => {
        const stringSettingWrapper = getWrapper();

        const inputElement = stringSettingWrapper.find('input');
        expect(inputElement.attributes('value')).toBeUndefined();
    });

    test('shows value from store', () => {
        const value = 'example value';
        const stringSettingWrapper = getWrapper({
            type: 'string',
            i18n: 'input',
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.settings.input = value;
                }
            }
        });
        const inputElement = stringSettingWrapper.find('input');

        expect(inputElement.element.value).toBe(value);
    });

    test('shows default value', () => {
        const value = 'example value';
        const wrapper = getWrapper({
            type: 'string',
            i18n: 'input',
            defaultValue: value
        });
        const inputElement = wrapper.find('input');

        expect(inputElement.element.value).toBe(value);
    });

    test('store value instead of default value', () => {
        const storeValue = 'store value';
        const defaultValue = 'default value';
        const wrapper = getWrapper({
            type: 'string',
            i18n: 'input',
            defaultValue: defaultValue,
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.settings.input = storeValue;
                }
            }
        });
        const inputElement = wrapper.find('input');

        expect(inputElement.element.value).toBe(storeValue);
    });

    test('stores value', async () => {
        const value = 'example value';
        const wrapper = getWrapper();

        const store = useSettingsStore();
        expect(store.get('input')).toBeUndefined();

        const inputElement = wrapper.find('input');
        await inputElement.setValue(value);

        const form = wrapper.find('form');
        await form.trigger('submit');

        expect(store.get('input')).toBe(value);
    });

    test('reacts on store change', async () => {
        const value = 'example value';
        const value2 = 'example value 2';
        const anotherValue = 'another value';
        const wrapper = getWrapper();

        const inputElement = wrapper.find('input');
        expect(inputElement.element.value).toBe('');

        const store = useSettingsStore();
        store.set('input', value);
        await nextTick();
        expect(inputElement.element.value).toBe(value);

        await inputElement.setValue(anotherValue);
        expect(inputElement.element.value).toBe(anotherValue);

        // input does not update if there are unsaved changes
        store.set('input', value2);
        expect(inputElement.element.value).toBe(anotherValue);

        const form = wrapper.find('form');
        expect(form.classes('done-button-shown')).toBeTruthy();

        await form.trigger('submit');
        expect(store.get('input')).toBe(anotherValue);

        expect(form.classes('done-button-shown')).toBeFalsy();
    });

    test('shows done button correctly', async () => {
        const wrapper = getWrapper();

        const form = wrapper.find('form');
        const inputElement = wrapper.find('input');

        expect(form.classes('done-button-shown')).toBeFalsy();

        await inputElement.setValue('value');
        expect(form.classes('done-button-shown')).toBeTruthy();

        await form.trigger('submit');
        expect(form.classes('done-button-shown')).toBeFalsy();

        await inputElement.setValue('Hello, World!');
        expect(form.classes('done-button-shown')).toBeTruthy();

        await form.trigger('submit');
        expect(form.classes('done-button-shown')).toBeFalsy();

        await inputElement.setValue('');
        expect(form.classes('done-button-shown')).toBeTruthy();

        await form.trigger('submit');
        expect(form.classes('done-button-shown')).toBeFalsy();

        await inputElement.setValue('a');
        expect(form.classes('done-button-shown')).toBeTruthy();

        const store = useSettingsStore();
        store.set('input', 'a');
        await nextTick();
        expect(form.classes('done-button-shown')).toBeFalsy();

        await inputElement.setValue('');
        store.set('input', '');
        await nextTick();
        expect(form.classes('done-button-shown')).toBeFalsy();
    });

    test('shows correct translation', () => {
        const translation = 'Text input';

        const wrapper = mountComponent(SettingsInput, {
            attrs: {
                setting: {
                    name: 'input',
                    i18n: 'input',
                    type: 'string',
                },
                path: 'input'
            }
        }, {
            input: translation
        });

        const label = wrapper.find('label');
        expect(label.text()).toBe(translation);
    });
});
