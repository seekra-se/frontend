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

type FontFormat =
    'woff2' | 'woff' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg';

interface FontSource {
    url: string;
    format: FontFormat;
}

interface RawFont {
    family: string;
    weight: string;
    style: string;
    source: FontSource[];
}

const fonts: RawFont[] = [
    {
        family: 'Inter',
        weight: '100 900',
        style: 'normal',
        source: [
            {
                url: 'fonts/Inter/Inter-Variable.woff2',
                format: 'woff2',
            },
            {
                url: 'fonts/Inter/Inter-Variable.ttf',
                format: 'truetype',
            },
        ],
    },
    {
        family: 'Inter',
        weight: '100 900',
        style: 'italic',
        source: [
            {
                url: 'fonts/Inter/Inter-Italic-Variable.woff2',
                format: 'woff2',
            },
            {
                url: 'fonts/Inter/Inter-Italic-Variable.ttf',
                format: 'truetype',
            },
        ],
    },
];

export default fonts;
