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

import { FetchError } from '../../errors.js';
import LegalNoticeView from '../LegalNoticeView.vue';
import { mountComponent } from '@/test-utils/mountComponent';
import { flushPromises } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';

const getLegalNotice = vi.hoisted(() =>
    vi.fn().mockResolvedValue('legal notice'),
);
vi.mock('../../services/fetchLegalContent', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getLegalNotice,
    };
});

afterEach(getLegalNotice.mockRestore);

describe('LegalNoticeView', () => {
    test('shows loading indicator', () => {
        const wrapper = mountComponent(LegalNoticeView);

        const legalNoticeLoading = wrapper.find('.legal-notice-loading');
        const legalNoticeError = wrapper.find('.error');
        const legalNotice = wrapper.find('.legal-notice');

        expect(legalNoticeLoading.exists()).toBe(true);
        expect(legalNoticeError.exists()).toBe(false);
        expect(legalNotice.exists()).toBe(false);
    });

    test('shows error', async () => {
        getLegalNotice.mockRejectedValue(new FetchError());

        const wrapper = mountComponent(LegalNoticeView);

        await flushPromises();
        await wrapper.vm.$nextTick();

        const legalNoticeLoading = wrapper.find('.legal-notice-loading');
        const legalNoticeError = wrapper.find('.error');
        const legalNotice = wrapper.find('.legal-notice');

        expect(legalNoticeLoading.exists()).toBe(false);
        expect(legalNoticeError.exists()).toBe(true);
        expect(legalNotice.exists()).toBe(false);
    });

    test('shows legal notice', async () => {
        const wrapper = mountComponent(LegalNoticeView);

        await flushPromises();
        await wrapper.vm.$nextTick();

        const legalNoticeLoading = wrapper.find('.legal-notice-loading');
        const legalNoticeError = wrapper.find('.error');
        const legalNotice = wrapper.find('.legal-notice');

        expect(legalNoticeLoading.exists()).toBe(false);
        expect(legalNoticeError.exists()).toBe(false);
        expect(legalNotice.exists()).toBe(true);
    });
});
