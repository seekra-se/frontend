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

export const useColorTheme = function () {
    const getColorTheme = function () {
        let colorTheme = localStorage.getItem('theme') || 'auto';
        if (!(colorTheme === 'dark' || colorTheme === 'light' || colorTheme === 'auto')) {
            colorTheme = 'auto';
        };
        return colorTheme;
    };

    const updateColorTheme = function (newTheme) {
        let actualNewTheme = newTheme;
        if (!(actualNewTheme === 'dark' || actualNewTheme === 'light' || actualNewTheme === 'auto')) {
            actualNewTheme = 'auto';
        };

        localStorage.setItem('theme', actualNewTheme);
    };

    const appHasDarkClass = function (colorTheme) {
        return colorTheme === 'dark';
    };

    return {
        getColorTheme,
        updateColorTheme,
        appHasDarkClass
    };
};