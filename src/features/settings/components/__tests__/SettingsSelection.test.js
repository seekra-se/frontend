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
import SettingsSelection from '../SettingsSelection.vue';
import { mountComponent } from '@/test-utils/mountComponent.js';
import { expect, describe, test } from 'vitest';
import { nextTick } from 'vue';

const getWrapper = function getWrapper({
    i18n = 'selection',
    options = [],
    allowMultiple = false,
    defaultValue = undefined,
    translations = {},
    piniaOptions = {}
} = {}) {
    return mountComponent(SettingsSelection, {
        attrs: {
            setting: {
                name: 'selection',
                type: 'selection',
                i18n,
                options,
                allowMultiple,
                default: defaultValue
            },
            path: 'selection'
        }
    }, translations, [], piniaOptions);
};

const getChecked = function getChecked(inputs) {
    return inputs.map((input) => input.element.matches(':checked'));
};

const exampleOptions = [
    { name: 'o0', i18n: 'o0' },
    { name: 'o1', i18n: 'o1' },
    { name: 'o2', i18n: 'o2' }
];

describe('SettingsSelection', () => {
    test('displays options correctly', () => {
        const wrapper = getWrapper({ options: exampleOptions });

        const listItems = wrapper.findAll('li');
        expect(listItems.length).toBe(3);

        for (let i = 0; i <= 2; i++) {
            const option = exampleOptions[i];
            const listItem = listItems[i];

            expect(listItem.find('.input-label').text()).toBe(option.i18n);

            const input = listItem.find('input');
            expect(input.attributes('type')).toBe('radio');
            expect(input.attributes('name')).toBe('selection');

            expect(input.element.matches(':checked')).toBe(false);
        }
    });

    test('shows value from store', () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.set('selection', 'o1');
                }
            }
        });

        const inputs = wrapper.findAll('input');
        const inputsChecked = getChecked(inputs);
        expect(inputsChecked).toStrictEqual([false, true, false]);
    });

    test('reacts on store change', async () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.set('selection', 'o1');
                }
            }
        });
        const settings = useSettingsStore();

        {
            const inputs = wrapper.findAll('input');
            const inputsChecked = getChecked(inputs);
            expect(inputsChecked).toStrictEqual([false, true, false]);
        }
        {
            settings.set('selection', 'o2');
            await nextTick();
            const inputs = wrapper.findAll('input');
            const inputsChecked = getChecked(inputs);
            expect(inputsChecked).toStrictEqual([false, false, true]);
        }
    });

    test('shows multiple values from store', () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.set('selection', ['o1', 'o2']);
                }
            },
            allowMultiple: true
        });

        const inputs = wrapper.findAll('input');
        const inputsChecked = getChecked(inputs);
        expect(inputsChecked).toStrictEqual([false, true, true]);
    });

    test('shows default value', () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            defaultValue: 'o2'
        });

        const inputs = wrapper.findAll('input');
        const inputsChecked = getChecked(inputs);
        expect(inputsChecked).toStrictEqual([false, false, true]);
    });

    test('shows multiple default values', () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            defaultValue: ['o0', 'o1'],
            allowMultiple: true
        });

        const inputs = wrapper.findAll('input');
        const inputsChecked = getChecked(inputs);
        expect(inputsChecked).toStrictEqual([true, true, false]);
    });

    test('shows store value even if default value is set', () => {
        const wrapper = getWrapper({
            options: exampleOptions,
            default: 'o2',
            piniaOptions: {
                setupStores: () => {
                    const store = useSettingsStore();
                    store.set('selection', 'o1');
                }
            }
        });

        const inputs = wrapper.findAll('input');
        const inputsChecked = getChecked(inputs);
        expect(inputsChecked).toStrictEqual([false, true, false]);
    });

    test('stores one value', async () => {
        const wrapper = getWrapper({ options: exampleOptions });

        const store = useSettingsStore();
        expect(store.get('selection')).toBeUndefined();

        const inputs = wrapper.findAll('input');
        const inputO0 = inputs[0];
        const inputO1 = inputs[1];
        const inputO2 = inputs[2];

        await inputO0.setValue(true);
        await nextTick();
        expect(store.get('selection')).toBe('o0');

        await inputO1.setValue(true);
        await nextTick();
        expect(store.get('selection')).toBe('o1');

        await inputO2.setValue(true);
        await nextTick();
        expect(store.get('selection')).toBe('o2');
        expect(inputO2.element.matches(':checked')).toBe(true);
    });

    test('stores multiple values', async () => {
        const setValue = async function setValue(input, value) {
            input.setValue(value);
            await nextTick();
        };

        const check = function check(input) {
            return setValue(input, true);
        };

        const uncheck = function uncheck(input) {
            return setValue(input, false);
        };

        const expectSelectionValue = function expectSelectionValue(value, options = exampleOptions) {
            value.sort();
            expect(store.get('selection').sort()).toStrictEqual(value);
            const checkedInputs = getChecked(inputs);
            expect(
                options
                .map((option) => option.name)
                .filter((_, i) => checkedInputs[i])
            ).toStrictEqual(value);
        };

        const wrapper = getWrapper({
            options: exampleOptions,
            allowMultiple: true
        });

        const store = useSettingsStore();
        expect(store.get('selection')).toBeUndefined();

        const inputs = wrapper.findAll('input');
        const inputO0 = inputs[0];
        const inputO1 = inputs[1];
        const inputO2 = inputs[2];

        await check(inputO0);
        expectSelectionValue(['o0']);

        await uncheck(inputO0);
        expectSelectionValue([]);

        await check(inputO1);
        expectSelectionValue(['o1']);

        await check(inputO0);
        expectSelectionValue(['o0', 'o1']);

        await check(inputO2);
        expectSelectionValue(['o0', 'o1', 'o2']);

        await uncheck(inputO2);
        expectSelectionValue(['o0', 'o1']);

        await check(inputO2);
        expectSelectionValue(['o0', 'o1', 'o2']);

        await uncheck(inputO1);
        expectSelectionValue(['o0', 'o2']);

        await inputO0.setValue(true);
        expectSelectionValue(['o0', 'o2']);

        await inputO0.setValue(false);
        expectSelectionValue(['o2']);

        await inputO1.setValue(true);
        expectSelectionValue(['o1', 'o2']);

        await inputO2.setValue(false);
        expectSelectionValue(['o1']);

        await inputO1.setValue(true);
        expectSelectionValue(['o1']);

        await inputO1.setValue(false);
        expectSelectionValue([]);
    });

    test('shows correct translation', () => {
        const translation = 'Selection setting';
        const wrapper = getWrapper({
            translations: {
                selection: translation
            }
        });

        const label = wrapper.find('.label');
        expect(label.text()).toBe(translation);
    });
});
