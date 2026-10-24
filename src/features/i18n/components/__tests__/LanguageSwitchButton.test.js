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

import LanguageSwitchButton from '../LanguageSwitchButton.vue';
import { LANGUAGE_PATH } from '@/config/featureSettings';
import { useSettings } from '@/features/settings/composables/useSettings.js';
import { mountComponent } from '@/test-utils/mountComponent.js';
import { describe, expect, test } from 'vitest';

const getWrapper = function getWrapper() {
    return mountComponent(LanguageSwitchButton);
};

describe('LanguageSwitchButton', () => {
    test('renders correctly with initial state closed', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('.language-button').exists()).toBe(true);
        expect(wrapper.find('.language-dropdown').exists()).toBe(false);
        expect(
            wrapper.find('.language-button').attributes('aria-expanded'),
        ).toBe('false');
    });

    test('opens the dropdown when language button is clicked', async () => {
        const wrapper = getWrapper();
        const button = wrapper.find('.language-button');

        await button.trigger('click');

        expect(wrapper.find('.language-dropdown').exists()).toBe(true);
        expect(button.attributes('aria-expanded')).toBe('true');
    });

    test('sets the language when clicking it', async () => {
        const { getSetting } = useSettings();

        const wrapper = getWrapper();

        await wrapper.find('.language-button').trigger('click');

        const options = wrapper.findAll('.language-dropdown li');

        const enOption = options.find((opt) => opt.text().includes('en'));
        await enOption.trigger('click');
        expect(getSetting(LANGUAGE_PATH)).toBe('en');
        expect(wrapper.find('.language-dropdown').exists()).toBe(false);

        const deOption = options.find((opt) => opt.text().includes('de'));
        await deOption.trigger('click');
        expect(getSetting(LANGUAGE_PATH)).toBe('de');
        expect(wrapper.find('.language-dropdown').exists()).toBe(false);
    });

    test('closes the dropdown when clicking outside the component', async () => {
        const wrapper = getWrapper();

        await wrapper.find('.language-button').trigger('click');
        expect(wrapper.find('.language-dropdown').exists()).toBe(true);

        await new Promise((resolve) => setTimeout(resolve, 0));

        const externalDiv = document.createElement('div');
        document.body.appendChild(externalDiv);

        const clickEvent = new MouseEvent('click', { bubbles: true });
        externalDiv.dispatchEvent(clickEvent);

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.language-dropdown').exists()).toBe(false);

        wrapper.unmount();
        externalDiv.remove();
    });
});
