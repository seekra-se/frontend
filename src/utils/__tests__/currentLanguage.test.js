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

import { test } from 'vitest';

test.for([
    ['en', 'en'],
    ['de', 'de'],
    ['fr', 'fr'],

    ['en-US', 'en'],
    ['en-AU', 'en'],
    ['de-DE', 'de'],
    ['fr-FR', 'fr'],

    ['en-us', 'en'],
    ['en-au', 'en'],
    ['de-de', 'de'],
    ['fr-fr', 'fr'],

    ['zh-Hans-CN', 'zh'],
    ['zh-Hant-TW', 'zh'],
    ['uz-Latn-UZ', 'uz'],

    ['en-US-u-ca-gregory', 'en'],
    ['de-DE-u-co-phonebk', 'de'],
    ['zh-Hant-TW-u-co-phonebk', 'zh']
])('returns the language \'%s\'', ([locale, language]) => {
    Object.defineProperty(navigator, 'language', {
        value: language,
        configurable: true
    });
});