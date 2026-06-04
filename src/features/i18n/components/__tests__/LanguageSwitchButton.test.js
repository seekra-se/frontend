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

import { expect, test, describe, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LanguageSwitchButton from '../LanguageSwitchButton.vue';
import { loadLanguage } from '@/i18n';

vi.mock('@/i18n', () => ({
    loadLanguage: vi.fn(() => Promise.resolve()),
    LANGUAGES_RTL: ['ar', 'he'],
    SUPPORTED_LANGUAGES: ['en', 'de', 'ar']
}));

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key) => key,
        locale: { value: 'de' }
    })
}));

vi.mock('@/features/icons/components/Icon.vue', () => ({
    default: {
        name: 'Icon',
        template: '<span>Icon</span>'
    }
}));

describe('LanguageSwitchButton.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        document.documentElement.lang = '';
        document.documentElement.dir = '';
    });

    test('renders correctly with initial state closed', () => {
        const wrapper = mount(LanguageSwitchButton);
        
        expect(wrapper.find('.language-button').exists()).toBe(true);
        expect(wrapper.find('.language-dropdown').exists()).toBe(false);
        expect(wrapper.find('.language-button').attributes('aria-expanded')).toBe('false');
    });

    test('opens the dropdown when language button is clicked', async () => {
        const wrapper = mount(LanguageSwitchButton);
        const button = wrapper.find('.language-button');
        
        await button.trigger('click');
        
        expect(wrapper.find('.language-dropdown').exists()).toBe(true);
        expect(button.attributes('aria-expanded')).toBe('true');
    });

    const languageTestCases = [
        { code: 'en', expectedDir: 'ltr' },
        { code: 'de', expectedDir: 'ltr' },
        { code: 'ar', expectedDir: 'rtl' }
    ];

    test.for(languageTestCases)('selectLanguage($code) sets localStorage, html attributes and changes layout direction to $expectedDir', async ({ code, expectedDir }) => {
        const wrapper = mount(LanguageSwitchButton);
        
        await wrapper.find('.language-button').trigger('click');
        
        const options = wrapper.findAll('.language-dropdown li');
        const optionToClick = options.find(opt => opt.text().includes(code));
        
        await optionToClick.trigger('click');

        expect(loadLanguage).toHaveBeenCalledWith(code);
        expect(localStorage.getItem('locale')).toBe(code);
        expect(document.documentElement.lang).toBe(code);
        expect(document.documentElement.dir).toBe(expectedDir);
        expect(wrapper.find('.language-dropdown').exists()).toBe(false);
    });

    test('closes the dropdown when clicking outside the component', async () => {
        const wrapper = mount(LanguageSwitchButton, {
            attachTo: document.body
        });

        await wrapper.find('.language-button').trigger('click');
        expect(wrapper.find('.language-dropdown').exists()).toBe(true);

        await new Promise(resolve => setTimeout(resolve, 0));

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