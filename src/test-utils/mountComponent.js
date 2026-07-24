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

import { createTestingPinia } from '@pinia/testing';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import { createMemoryHistory, createRouter } from 'vue-router';

export const mountComponent = function mountComponent (component, options = {}, i18nMessages = {}, routes = [], piniaOptions = {}) {
    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        messages: {
            en: i18nMessages
        }
    });

    const router = createRouter({
        history: createMemoryHistory(),
        routes
    });

    return mount(component, {
        global: {
            plugins: [
                i18n,
                router,
                createTestingPinia({
                    ...piniaOptions,
                    stubActions: false,
                    createSpy: vi.fn
                })
            ],
        },
        ...options
    });
};