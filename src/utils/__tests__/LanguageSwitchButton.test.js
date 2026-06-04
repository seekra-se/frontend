/*
 * Copyright 2026 Seekra
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect, test, describe, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LanguageSwitchButton from '@/features/i18n/components/LanguageSwitchButton.vue';
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