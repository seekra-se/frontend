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

import { describe, test, expect } from 'vitest';
import { validateSettingsConfig, validateEntry, validateSelectionOptions, assertType, assertString } from '../settingsValidator';

describe('settingsValidator', () => {
    describe('validateSettingsConfig', () => {
        test.for([
            { settings: {
                contents: []
            } },
            { settings: {
                contents: [
                    {
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                contents: [
                    {
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                ]
            } },
            { settings: {
                contents: [
                    {
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                contents: [
                    {
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                allowMultiple: false,
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } }
        ])('does not throw an error and returns input', ({ settings }) => {
            validateSettingsConfig(settings);
        });

        test.for([
            { settings: false },
            { settings: true },
            { settings: 0 },
            { settings: 42 },
            { settings: '' },
            { settings: ' ' },
            { settings: 'a' },
            { settings: {} },
            { settings: {
                content: [
                    {
                        type: 'sectio',
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                allowMultiple: 'false',
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                content: [
                    {
                        type: 'sectio',
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                content: [
                    {
                        type: 'section',
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                contents: [
                    {
                        type: 'section',
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        type: 'section',
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43',
                                default: 'true'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 42
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } },
            { settings: {
                contents: [
                    {
                        type: 'bool',
                        name: 'aStandaloneBooleanSetting',
                        i18n: 'settings.settings.aStandaloneBooleanSetting',
                        default: true
                    },
                    {
                        name: 'general',
                        i18n: 'settings.settings.general',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'copyOfGeneral',
                        i18n: 'settings.settings.copyOfGeneral',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 42',
                                default: false,
                                i18n: 'settings.settings.general.enableFeature42'
                            }
                        ]
                    },
                    {
                        name: 'aSection',
                        i18n: 'settings.settings.aSection',
                        content: [
                            {
                                type: 'bool',
                                name: 'Enable feature 43',
                                i18n: 'settings.settings.aSection.enableFeature43'
                            },
                            {
                                type: 'selection',
                                name: 'language',
                                i18n: 'settings.settings.aSection.language.label',
                                default: 'en',
                                allowMultiple: false,
                                options: [
                                    { name: 'en', i18n: 'settings.settings.aSection.language.options.en' },
                                    { name: 'de', i18n: 'settings.settings.aSection.language.options.de' },
                                ]
                            },
                            {
                                type: 'section',
                                name: 'section2',
                                i18n: 'settings.settings.aSection.section2.label',
                                content: [
                                    {
                                        type: 'string',
                                        name: 'string',
                                        i18n: 'settings.settings.aSection.sections.string',
                                        default: 'str'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            } }
        ])('throws error', ({ settings }) => {
            expect(() => validateSettingsConfig(settings)).toThrow(Error)
        })
    });

    describe('validateEntry', () => {
        test.for([
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: false }],
        
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: 42 }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: 0 }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: -42.7 }],
        
            [{ name: 'aString', type: 'string', i18n: 'aString.label' }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: '' }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: 'Seekra is great!' }],

            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', options: [
                { name: 'yes', i18n: 'selectSomething.options.yes' },
                { name: 'no', i18n: 'selectSomething.options.no' },
                { name: 'maybe', i18n: 'selectSomething.options.maybe' }
            ] }],

            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'no', options: [
                { name: 'yes', i18n: 'selectSomething.options.yes' },
                { name: 'no', i18n: 'selectSomething.options.no' },
                { name: 'maybe', i18n: 'selectSomething.options.maybe' }
            ] }],

            [{ name: 'selectMultiple', type: 'selection', i18n: 'selectMultiple.title', default: ['1', '2', '3'], allowMultiple: true, options: [
                { name: '1', i18n: 'selectMultiple.options.1' },
                { name: '2', i18n: 'selectMultiple.options.2' },
                { name: '3', i18n: 'selectMultiple.options.3' }
            ] }],

            [{ name: 'selectMultiple', type: 'selection', i18n: 'selectMultiple.title', default: ['2', '3'], allowMultiple: true, options: [
                { name: '1', i18n: 'selectMultiple.options.1' },
                { name: '2', i18n: 'selectMultiple.options.2' },
                { name: '3', i18n: 'selectMultiple.options.3' }
            ] }],

            [{ name: 'selectMultiple', type: 'selection', i18n: 'selectMultiple.title', default: ['2'], allowMultiple: true, options: [
                { name: '1', i18n: 'selectMultiple.options.1' },
                { name: '2', i18n: 'selectMultiple.options.2' },
                { name: '3', i18n: 'selectMultiple.options.3' }
            ] }],

            [{ name: 'selectMultiple', type: 'selection', i18n: 'selectMultiple.title', default: [], allowMultiple: true, options: [
                { name: '1', i18n: 'selectMultiple.options.1' },
                { name: '2', i18n: 'selectMultiple.options.2' },
                { name: '3', i18n: 'selectMultiple.options.3' }
            ] }],

            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [] }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [
                { name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true }
            ] }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [
                { name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true },
                { name: 'enableFeature43', type: 'bool', i18n: 'feature.43.enable', default: true }
            ] }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [
                { name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true },
                { name: 'enableFeature43', type: 'bool', i18n: 'feature.43.enable', default: true },
                { name: 'aSecondSection', type: 'section', i18n: 'sections.aSecondSection.title', content: [
                    { name: 'enableFeature44', type: 'bool', i18n: 'feature.44.enable', default: true },
                ] }
            ] }]
        ])('throws no error for the entry %s', ([ entry ]) => {
            expect(() => validateEntry(entry)).not.throws(Error);
        });

        test.for([
            [{ name: 'enableFeature42', type: 'bool', i18n: '' }],
            [{ name: 'enableFeature42', type: 'thisTypeDoesNotExistAndHasAVeryLongName', i18n: 'feature.42.enable' }],
            [{ name: '', type: 'thisTypeDoesNotExistAndHasAVeryLongName', i18n: 'feature.42.enable' }],
            [{ name: '', type: 'thisTypeDoesNotExistAndHasAVeryLongName', i18n: '' }],
            [{ name: '', type: 'bool', i18n: '' }],
            [{ name: '', type: 'bool', i18n: '' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 42 }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: '42' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 'Seekra' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 'true' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 'false' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 'undefined' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: 'null' }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: [] }],
            [{ name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: {} }],
            [{ name: 'enableFeature42', type: '', i18n: 'feature.42.enable', default: {} }],
        
            [{ name: '', type: 'number', i18n: 'aNumber.label' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: '42' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: 'zero' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: 'undefined' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: 'false' }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: true }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: false }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: [] }],
            [{ name: 'aNumber', type: 'number', i18n: 'aNumber.label', default: {} }],
            [{ name: 'aNumber', type: '', i18n: 'aNumber.label', default: {} }],
            [{ name: 'aNumber', type: '', i18n: 'aNumber.label', default: 42 }],
        
            [{ name: 'aString', type: 'string', i18n: '' }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: 42 }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: true }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: false }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: [] }],
            [{ name: 'aString', type: 'string', i18n: 'aString.label', default: {} }],
            [{ name: 'aString', type: 'string', i18n: '', default: {} }],

            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'a', options: true }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'a', options: [] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: ['a'], options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: ['a', 'b'], options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', allowMultiple: true, default: 'a', options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', allowMultiple: true, default: 'a', options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', allowMultiple: true, default: ['c'], options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', allowMultiple: true, default: [1], options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', allowMultiple: true, default: ['a', 1], options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'c', options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: 'b' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'a', options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: '' },
                { name: 'c' }
            ] }],
            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'a', allowMultiple: 'false', options: [
                { name: 'a', i18n: 'a' },
                { name: 'b', i18n: '' },
                { name: 'c' }
            ] }],

            [{ name: 'selectSomething', type: 'selection', i18n: 'selectSomething.title', default: 'no', options: [
                { name: 'yes', i18n: '' },
                { name: '', i18n: 'selectSomething.options.no' },
                { name: 'maybe', i18n: 'selectSomething.options.maybe' },
                { name: '', i18n: '' },
                { name: 42, i18n: 43 },
                { name: '' },
                { i18n: '' },
                {}
            ] }],

            [{ name: 'aSection', type: 'section', i18n: '', content: [] }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: '' }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: '[]' }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: 'a' }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [
                { name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true },
                { name: 'enableFeature43', type: 'bool', i18n: 'feature.42.enable', default: 0 },
                { name: 'enableFeature44', type: 'bool' }
            ] }],
            [{ name: 'aSection', type: 'section', i18n: 'sections.aSection.title', content: [
                { name: 'enableFeature42', type: 'bool', i18n: 'feature.42.enable', default: true },
                { name: 'enableFeature43', type: 'bool', i18n: 'feature.43.enable', default: true },
                { name: 'aSecondSection', type: 'section', i18n: 'sections.aSecondSection.title', content: 'Hello' },
                { name: 'aSecondSection', type: 'section', i18n: '', content: [] },
                { name: 'aSecondSection', type: 'section', i18n: 'i18n', content: [] },
                { name: 'aSecondSection', type: 'section', content: [] }
            ] }]
        ])('throws an error for the entry %s', ([ entry ]) => {
            expect(() => validateEntry(entry)).throws(Error);
        });
    });

    describe('validateSelectionOptions', () => {
        test.for([
            [[{ name: 'test', i18n: 'test.label' }]],
            [[{ name: 'test', i18n: 'test.label' }, { name: 'test2', i18n: 'test2.label' }]],
            [[{ name: 'test', i18n: 'test.label' }, { name: 'test', i18n: 'test2.label' }, { name: 'test3', i18n: 'test.label' }]]
        ])('throws no error for the options %s', ([ options ]) => {
            expect(() => validateSelectionOptions(options)).not.throws(Error);
        });

        test.for([
            [[{}]],
            [[{ i18n: '' }]],
            [[{ i18n: 'a' }]],
            [[{ name: 'a' }]],
            [[{ name: '' }]],
            [[{ name: '', i18n: 'test.label' }]],
            [[{ name: 'test', i18n: '' }]],
            [[{ name: '', i18n: '' }]],
            [[{ name: '', i18n: 'test.label' }, { name: 'test2', i18n: '' }]],
            [[{ name: 'test', i18n: '' }, { name: '', i18n: 'test2.label' }, { name: '', i18n: '  ' }, { name: '42', i18n: '42.i18n' }]],
            [[]]
        ])('throws an error for the options %s', ([ options ]) => {
            expect(() => validateSelectionOptions(options)).throws(Error);
        });
    });

    describe('assertType', () => {
        test.for([
            ['bool'],
            ['number'],
            ['string'],
            ['selection'],
            ['section']
        ])('throws no error for the value %s', ([ value ]) => {
            expect(() => assertType(value)).not.throw(Error);
        });

        test.for([
            [''],
            [' '],
            ['  '],
            ['   '],

            ['42'],
            ['0'],
            ['-42'],
            ['-42.0'],
            ['-0.0'],

            ['a'],
            ['ab'],
            ['SeekraIsGreat!'],
            ['Seekra is great!'],

            [undefined],
            [null]
        ])('throws an error for the value %s', ([ value ]) => {
            expect(() => assertType(value)).throw(Error);
        });
    });

    describe('assertString', () => {
        test.for([
            ['a'],
            ['b'],
            ['ab'],

            ['0'],
            ['42'],

            ['null'],
            ['undefined'],

            ['()&%())']
        ])('throws no error for the value %s', ([ value ]) => {
            expect(() => assertString(value)).not.throw(Error);
        });

        test.for([
            [0],
            [1],
            [42],
            [-1],
            [-42],

            [''],
            [' '],
            ['  '],
            ['     ']
        ])('throws an error for the value %s', ([ value ]) => {
            expect(() => assertString(value)).throws(Error);
        });
    });
});