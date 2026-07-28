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

import { getSettingsPagePathSegments } from '../settingsPage.js';
import { describe, expect, test } from 'vitest';

describe('settingsPage', () => {
    describe('getSettingsPagePathSegments', () => {
        test.for([
            { path: 'a.b.c', expected: ['a', 'b', 'c'] },
            { path: 'a', expected: ['a'] },
            { path: 'a.b', expected: ['a', 'b'] },
            { path: 'a..b', expected: ['a', 'b'] },
            { path: '.a.b', expected: ['a', 'b'] },
            { path: '..a.b', expected: ['a', 'b'] },
            { path: '.a.b.', expected: ['a', 'b'] },
            { path: '..a.b..', expected: ['a', 'b'] },
            { path: 'a.b.', expected: ['a', 'b'] },
            { path: 'a.b..', expected: ['a', 'b'] },
            { path: '.a.b..', expected: ['a', 'b'] },
            { path: '..a.b.', expected: ['a', 'b'] },
            { path: '.a..b', expected: ['a', 'b'] },
            { path: '..a..b', expected: ['a', 'b'] },
            { path: '.a..b.', expected: ['a', 'b'] },
            { path: '..a..b..', expected: ['a', 'b'] },
            { path: 'a..b.', expected: ['a', 'b'] },
            { path: 'a..b..', expected: ['a', 'b'] },
            { path: '.a..b..', expected: ['a', 'b'] },
            { path: '..a..b.', expected: ['a', 'b'] },
            { path: '..a.....b.c..d....', expected: ['a', 'b', 'c', 'd'] },
            { path: 'a.b.c/', expected: ['a', 'b', 'c'] },
            { path: 'a.#b.c', expected: ['a', 'b', 'c'] },
            { path: 'a.#b.c/', expected: ['a', 'b', 'c'] },
            { path: 'a1.#b.c/', expected: ['a1', 'b', 'c'] },
            { path: 'a-1.#b.c/', expected: ['a-1', 'b', 'c'] },
            { path: 'a-1.b@.c', expected: ['a-1', 'b', 'c'] },
            { path: '....@a/#...)!&§[b.#§c..d....', expected: ['a', 'b', 'c', 'd'] },
            { path: '....@a/#...)!&§[b.#§c..dä....', expected: ['a', 'b', 'c', 'd'] },
            { path: '..,...~..@a/#.+..)!&§[b.#§c..dä..)..', expected: ['a', 'b', 'c', 'd'] },
            { path: 'a.@.b', expected: ['a', 'b'] },
            { path: 1, expected: [] },
            { path: false, expected: [] },
            { path: true, expected: [] },
            { path: null, expected: [] },
            { path: undefined, expected: [] }
        ])('returns $expected', async ({ path, expected }) => {
            expect(getSettingsPagePathSegments(path)).toStrictEqual(expected);
        });
    })
})