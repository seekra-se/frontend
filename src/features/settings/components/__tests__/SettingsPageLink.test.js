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

import SettingsPageLink from '../SettingsPageLink.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createI18n } from 'vue-i18n';

const goToSettingsPage = vi.fn();
vi.mock('../../composables/useSettingsPage.js', () => ({
    useSettingsPage: () => ({
        goToSettingsPage,
    }),
}));

const getWrapper = function getWrapper({ target, displayName }) {
    return mount(SettingsPageLink, {
        attrs: {
            target,
            displayName,
        },
        global: {
            plugins: [createI18n()],
        },
    });
};

describe('SettingsPageLink', () => {
    test('shows correct display name', () => {
        const displayName = 'A settings page link';
        const wrapper = getWrapper({ displayName });
        expect(wrapper.text()).toBe(displayName);
    });

    test('follows link', async () => {
        const target = 'section1.subsection2';
        const wrapper = getWrapper({ target });

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(goToSettingsPage).toHaveBeenCalledWith(target);
    });
});
