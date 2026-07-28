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

import { describe, expect,  test } from 'vitest';
import { ensureUnit } from '../cssDimensions';

describe('cssDimensions', () => {
    test.for([
        { dimension: null,                       expected: '0px' },
        { dimension: undefined,                  expected: '0px' },

        { dimension: 0,                          expected: '0px' },
        { dimension: -0,                         expected: '0px' },
        { dimension: -1,                         expected: '-1px' },
        { dimension: -42,                        expected: '-42px' },
        { dimension: 1,                          expected: '1px' },
        { dimension: 42,                         expected: '42px' },

        { dimension: 0.0,                        expected: '0px' },
        { dimension: -0.0,                       expected: '0px' },
        { dimension: -1.0,                       expected: '-1px' },
        { dimension: -42.0,                      expected: '-42px' },
        { dimension: 1.0,                        expected: '1px' },
        { dimension: 42.0,                       expected: '42px' },

        { dimension: 0.42,                       expected: '0.42px' },
        { dimension: -0.42,                      expected: '-0.42px' },
        { dimension: -1.42,                      expected: '-1.42px' },
        { dimension: -42.42,                     expected: '-42.42px' },
        { dimension: 1.42,                       expected: '1.42px' },
        { dimension: 42.42,                      expected: '42.42px' },

        { dimension: '0',                        expected: '0px' },
        { dimension: '-0',                       expected: '-0px' },
        { dimension: '-1',                       expected: '-1px' },
        { dimension: '-42',                      expected: '-42px' },
        { dimension: '1',                        expected: '1px' },
        { dimension: '42',                       expected: '42px' },

        { dimension: '0.0',                      expected: '0.0px' },
        { dimension: '-0.0',                     expected: '-0.0px' },
        { dimension: '-1.0',                     expected: '-1.0px' },
        { dimension: '-42.0',                    expected: '-42.0px' },
        { dimension: '1.0',                      expected: '1.0px' },
        { dimension: '42.0',                     expected: '42.0px' },

        { dimension: '0.42',                     expected: '0.42px' },
        { dimension: '-0.42',                    expected: '-0.42px' },
        { dimension: '-1.42',                    expected: '-1.42px' },
        { dimension: '-42.42',                   expected: '-42.42px' },
        { dimension: '1.42',                     expected: '1.42px' },
        { dimension: '42.42',                    expected: '42.42px' },

        { dimension: '0px',                      expected: '0px' },
        { dimension: '-0px',                     expected: '-0px' },
        { dimension: '-1px',                     expected: '-1px' },
        { dimension: '-42px',                    expected: '-42px' },
        { dimension: '1px',                      expected: '1px' },
        { dimension: '42px',                     expected: '42px' },

        { dimension: '0.0px',                    expected: '0.0px' },
        { dimension: '-0.0px',                   expected: '-0.0px' },
        { dimension: '-1.0px',                   expected: '-1.0px' },
        { dimension: '-42.0px',                  expected: '-42.0px' },
        { dimension: '1.0px',                    expected: '1.0px' },
        { dimension: '42.0px',                   expected: '42.0px' },

        { dimension: '0.42px',                   expected: '0.42px' },
        { dimension: '-0.42px',                  expected: '-0.42px' },
        { dimension: '-1.42px',                  expected: '-1.42px' },
        { dimension: '-42.42px',                 expected: '-42.42px' },
        { dimension: '1.42px',                   expected: '1.42px' },
        { dimension: '42.42px',                  expected: '42.42px' },

        { dimension: '0em',                      expected: '0em' },
        { dimension: '-0em',                     expected: '-0em' },
        { dimension: '-1em',                     expected: '-1em' },
        { dimension: '-42em',                    expected: '-42em' },
        { dimension: '1em',                      expected: '1em' },
        { dimension: '42em',                     expected: '42em' },

        { dimension: '0.0em',                    expected: '0.0em' },
        { dimension: '-0.0em',                   expected: '-0.0em' },
        { dimension: '-1.0em',                   expected: '-1.0em' },
        { dimension: '-42.0em',                  expected: '-42.0em' },
        { dimension: '1.0em',                    expected: '1.0em' },
        { dimension: '42.0em',                   expected: '42.0em' },

        { dimension: '0.42em',                   expected: '0.42em' },
        { dimension: '-0.42em',                  expected: '-0.42em' },
        { dimension: '-1.42em',                  expected: '-1.42em' },
        { dimension: '-42.42em',                 expected: '-42.42em' },
        { dimension: '1.42em',                   expected: '1.42em' },
        { dimension: '42.42em',                  expected: '42.42em' },

        { dimension: 'calc(42px - 1em)',         expected: 'calc(42px - 1em)' },
        { dimension: 'calc(42px)',               expected: 'calc(42px)' },
        { dimension: 'calc(42vh)',               expected: 'calc(42vh)' },
        { dimension: 'min(42px, 1em)',           expected: 'min(42px, 1em)' },
        { dimension: 'max(42px, 5rem)',          expected: 'max(42px, 5rem)' },
        { dimension: 'clamp(42vh, 23vw, 13cap)', expected: 'clamp(42vh, 23vw, 13cap)' },

        { dimension: 'calc(42px-1em)',           expected: 'calc(42px-1em)' },
        { dimension: 'min(42px,1em)',            expected: 'min(42px,1em)' },
        { dimension: 'max(42px,5rem)',           expected: 'max(42px,5rem)' },
        { dimension: 'clamp(42vh,23vw,13cap)',   expected: 'clamp(42vh,23vw,13cap)' },
        { dimension: 'clamp( 42vh,23vw,13cap )', expected: 'clamp( 42vh,23vw,13cap )' }
    ])('ensureUnit returns $expected with input $dimension', ({ dimension, expected }) => {
        expect(ensureUnit(dimension)).toBe(expected);
    });
});