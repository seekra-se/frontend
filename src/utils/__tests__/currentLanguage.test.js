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

import { expect, test } from 'vitest';
import getCurrentLanguage from '../currentLanguage';

const locales = [
    { navigatorLanguage: 'en',                      expected: 'en'},
    { navigatorLanguage: 'de',                      expected: 'de'},
    { navigatorLanguage: 'fr',                      expected: 'fr'},

    { navigatorLanguage: 'en-US',                   expected: 'en'},
    { navigatorLanguage: 'en-AU',                   expected: 'en'},
    { navigatorLanguage: 'de-DE',                   expected: 'de'},
    { navigatorLanguage: 'fr-FR',                   expected: 'fr'},

    { navigatorLanguage: 'en-us',                   expected: 'en'},
    { navigatorLanguage: 'en-au',                   expected: 'en'},
    { navigatorLanguage: 'de-de',                   expected: 'de'},
    { navigatorLanguage: 'fr-fr',                   expected: 'fr'},

    { navigatorLanguage: 'zh-Hans-CN',              expected: 'zh'},
    { navigatorLanguage: 'zh-Hant-TW',              expected: 'zh'},
    { navigatorLanguage: 'uz-Latn-UZ',              expected: 'uz'},

    { navigatorLanguage: 'en-US-u-ca-gregory',      expected: 'en'},
    { navigatorLanguage: 'de-DE-u-co-phonebk',      expected: 'de'},
    { navigatorLanguage: 'zh-Hant-TW-u-co-phonebk', expected: 'zh'}
];

const localStorageLanguages = [
    ['en', 'en'],
    ['de', 'de'],
    ['fr', 'fr'],
    [null, null]
];

test.for(locales)('returns the language $expected for navigator language $navigatorLanguage', ({ navigatorLanguage, expected }) => {
    Object.defineProperty(navigator, 'language', {
        value: navigatorLanguage,
        configurable: true
    });

    expect(getCurrentLanguage()).toBe(expected);
});