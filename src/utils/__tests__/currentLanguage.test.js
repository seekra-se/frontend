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
    { navigatorLanguage: 'en',                      localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'de',                      localStorageLanguage: null, expected: 'de'},
    { navigatorLanguage: 'fr',                      localStorageLanguage: null, expected: 'fr'},

    { navigatorLanguage: 'en-US',                   localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'en-AU',                   localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'de-DE',                   localStorageLanguage: null, expected: 'de'},
    { navigatorLanguage: 'fr-FR',                   localStorageLanguage: null, expected: 'fr'},

    { navigatorLanguage: 'en-us',                   localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'en-au',                   localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'de-de',                   localStorageLanguage: null, expected: 'de'},
    { navigatorLanguage: 'fr-fr',                   localStorageLanguage: null, expected: 'fr'},

    { navigatorLanguage: 'zh-Hans-CN',              localStorageLanguage: null, expected: 'zh'},
    { navigatorLanguage: 'zh-Hant-TW',              localStorageLanguage: null, expected: 'zh'},
    { navigatorLanguage: 'uz-Latn-UZ',              localStorageLanguage: null, expected: 'uz'},

    { navigatorLanguage: 'en-US-u-ca-gregory',      localStorageLanguage: null, expected: 'en'},
    { navigatorLanguage: 'de-DE-u-co-phonebk',      localStorageLanguage: null, expected: 'de'},
    { navigatorLanguage: 'zh-Hant-TW-u-co-phonebk', localStorageLanguage: null, expected: 'zh'}
];

test.for(locales)('returns the language $expected for navigator language $navigatorLanguage and local storage language $localStorageLanguage', ({ navigatorLanguage, localStorageLanguage, expected }) => {
    Object.defineProperty(navigator, 'language', {
        value: navigatorLanguage,
        configurable: true
    });

    if (localStorageLanguage) {
        localStorage.setItem('locale', localStorageLanguage);
    };

    expect(getCurrentLanguage()).toBe(expected);
});