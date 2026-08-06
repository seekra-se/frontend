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

import SettingsView from '../SettingsView.vue';
import { mountComponent } from '@/test-utils/mountComponent.js';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

const settingsHoisted = vi.hoisted(() => [
    {
        name: 's0',
        i18n: 'settings.s0',
        content: []
    },
    {
        name: 's1',
        i18n: 'settings.s1',
        content: [
            {
                type: 'bool',
                name: 'b0',
                i18n: 'settings.s1.b0'
            },
            {
                type: 'number',
                name: 'n0',
                i18n: 'settings.s1.n0'
            },
            {
                type: 'string',
                name: 'st0',
                i18n: 'settings.s1.st0'
            },
            {
                type: 'selection',
                name: 'se0',
                i18n: 'settings.s1.se0',
                options: [
                    { name: 'o0', i18n: 'settings.s1.se0.o0' },
                    { name: 'o1', i18n: 'settings.s1.se0.o1' },
                    { name: 'o2', i18n: 'settings.s1.se0.o2' },
                    { name: 'o3', i18n: 'settings.s1.se0.o3' }
                ]
            },
            {
                type: 'section',
                name: 's0',
                i18n: 'settings.s1.s0',
                content: []
            },
            {
                type: 'section',
                name: 's1',
                i18n: 'settings.s1.s1',
                content: [
                    {
                        type: 'bool',
                        name: 'b0',
                        i18n: 'settings.s1.s1.b0',
                        default: true
                    }
                ]
            }
        ]
    },
    {
        name: 's2',
        i18n: 'settings.s2',
        content: [
            {
                type: 'section',
                name: 's0',
                i18n: 'settings.s2.s0',
                content: [
                    {
                        type: 'bool',
                        name: 'b0',
                        i18n: 'settings.s2.s0.b0',
                        default: true
                    }
                ]
            }
        ]
    },
    {
        name: 's3',
        i18n: 'settings.s3',
        content: [
            {
                type: 'section',
                name: 's0',
                i18n: 'settings.s3.s0',
                content: []
            }
        ]
    },
    {
        name: 's4',
        i18n: 'settings.s4',
        content: [
            {
                type: 'selection',
                name: 'se0',
                i18n: 'settings.s4.se0',
                options: [
                    { name: 'o0', i18n: 'settings.s4.se0.o0' },
                    { name: 'o1', i18n: 'settings.s4.se0.o1' },
                    { name: 'o2', i18n: 'settings.s4.se0.o2' },
                    { name: 'o3', i18n: 'settings.s4.se0.o3' }
                ]
            }
        ]
    },
    {
        name: 's5',
        i18n: 'settings.s5',
        content: [
            {
                type: 'string',
                name: 'st0',
                i18n: 'settings.s5.st0'
            }
        ]
    },
    {
        name: 's6',
        i18n: 'settings.s6',
        content: [
            {
                type: 'number',
                name: 'n0',
                i18n: 'settings.s6.n0'
            }
        ]
    },
    {
        name: 's7',
        i18n: 'settings.s7',
        content: [
            {
                type: 'bool',
                name: 'b0',
                i18n: 'settings.s7.b0'
            }
        ]
    },
    {
        name: 's8',
        i18n: 'settings.s8',
        content: [
            {
                type: 'section',
                name: 's0',
                i18n: 'settings.s8.s0',
                content: [
                    {
                        type: 'section',
                        name: 's0',
                        i18n: 'settings.s8.s0.s0',
                        content: [
                            {
                                type: 'section',
                                name: 's0',
                                i18n: 'settings.s8.s0.s0.s0',
                                content: [
                                    {
                                        type: 'selection',
                                        name: 'se0',
                                        i18n: 'settings.s8.s0.s0.s0.se0',
                                        allowMultiple: true,
                                        options: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
const settings = settingsHoisted.values();

const originalCurrentSection = 's0';
let currentSection = originalCurrentSection;

vi.mock('../../settings.json', () => ({
    default: { contents: settingsHoisted }
}));

vi.mock('vue-router', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useRoute: () => ({
            path: `/settings/${currentSection}`
        })
    };
});

const getWrapper = function getWrapper ({ translations = {} } = {}) {
    return mountComponent(SettingsView, {}, translations, [], {});
};

describe('SettingsView', () => {
    describe('heading', () => {
        test('shows correct translation', () => {
            const translation = 'Settings';
            const wrapper = getWrapper({
                translations: {
                    'preferences.settings': translation
                }
            });

            const header = wrapper.find('header');
            expect(header.text()).toBe(translation);
        });
    });

    describe('sidebar', () => {
        test('shows all top-level sections', async () => {
            const wrapper = getWrapper();
            await nextTick();

            const sidebarItems = wrapper.findAll('.sidebar-sections-list > li');
            settings.forEach((setting, index) => {
                const sidebarItem = sidebarItems[index];

                expect(sidebarItem.text()).toBe(setting.i18n);

                const link = sidebarItem.find('*');
                expect(link.attributes('href')).toBe(`/settings/${setting.name}`);
                expect(link.classes('active')).toBe(setting.name === currentSection);
            });
        });
    });

    describe('main', () => {
        describe('correct element', () => {
            test('shows that no section is selected', async () => {
                currentSection = '';

                const wrapper = getWrapper();
                await nextTick();

                const mainContent = wrapper.find('.settings-main-content');
                const mainContentNoSection = wrapper.find('.main-content--no-section');

                expect(mainContent.exists()).toBe(false);
                expect(mainContentNoSection.exists()).toBe(true);
            });

            test('shows main content', async () => {
                const wrapper = getWrapper();
                await nextTick();

                const mainContent = wrapper.find('.settings-main-content');
                const mainContentNoSection = wrapper.find('.main-content--no-section');

                expect(mainContent.exists()).toBe(true);
                expect(mainContentNoSection.exists()).toBe(false);
            });
        });
    });
});

beforeEach(() => {
    currentSection = originalCurrentSection;
});