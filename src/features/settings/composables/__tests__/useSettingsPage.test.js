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

import { useSettingsPage } from '../useSettingsPage.js';
import { describe, expect, test, vi } from 'vitest';

const pushRoute = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: pushRoute
    })
}));

describe('useSettingsPage', () => {
    describe('goToSettingsPage', () => {
        test('pushes correct route', async () => {
            const { goToSettingsPage } = useSettingsPage();
            await goToSettingsPage('..a.b...c.d..e......');
            expect(pushRoute).toHaveBeenCalledWith({
                name: 'settings',
                params: {
                    rest: ['a', 'b', 'c', 'd', 'e']
                }
            });
        });
    });
});