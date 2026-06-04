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
import { assertType, assertString } from '../settingsValidator';

describe('validateSettingsConfig', () => {

});

describe('validateEntry', () => {

});

describe('validateSelectionOptions', () => {

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
    ])('throws error for the value %s', ([ value ]) => {
        expect(() => assertString(value)).throws(Error);
    });
});