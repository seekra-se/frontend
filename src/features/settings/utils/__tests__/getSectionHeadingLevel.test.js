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

import { test, expect } from 'vitest';
import { getSectionHeadingLevel } from '../getSectionHeadingLevel';

test.for([
    { path: '', expected: 2 },
    { path: 'a', expected: 2 },
    { path: 'a.', expected: 3 },
    { path: '.b', expected: 3 },
    { path: 'a.b', expected: 3 },
    { path: 'a.b', expected: 3 },
    { path: 'a.b.c', expected: 4 },
    { path: 'a.bc.d', expected: 4 },
    { path: 'ab.bc.cd', expected: 4 },
    { path: 'ab.bc.cd.de', expected: 5 }
])('returns $expected', ({ path, expected }) => {
    expect(getSectionHeadingLevel(path)).toBe(expected);
});