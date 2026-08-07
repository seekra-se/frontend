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

import { FetchError } from '../../errors';
import { getLegalNotice } from '../fetchLegalContent';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

let fetchSpy;

beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch');
});

afterEach(() => {
    fetchSpy.mockRestore();
});

const exampleHtml = `<h1>Heading</h1>
<p>
    <a>...</a>
</p>`;

const exampleHtmlWithLinkClass = `<h1>Heading</h1>
<p>
    <a class="link">...</a>
</p>`;
const exampleHtmlDocument = `<html>
    <head>
        <title>Legal Notice</title>
    </head>
    <body>
        ${exampleHtml}
    </body>
</html>`;
const exampleHtmlDocumentWithMain = `<html>
    <head>
        <title>Legal Notice</title>
    </head>
    <body>
        <main>
            ${exampleHtml}
        </main>
    </body>
</html>`;

describe('fetchLegalContent', () => {
    describe('getLegalNotice', () => {
        describe('success', () => {
            test('returns HTML body', async () => {
                fetchSpy.mockResolvedValue(
                    new Response(exampleHtmlDocument)
                );

                expect(
                    (await getLegalNotice()).trim()
                ).toBe(exampleHtmlWithLinkClass);
            });

            test('returns HTML <main>', async () => {
                fetchSpy.mockResolvedValue(
                    new Response(exampleHtmlDocumentWithMain)
                );

                expect(
                    (await getLegalNotice()).trim()
                ).toBe(exampleHtmlWithLinkClass);
            });

            test('does not fail on success status code', async () => {
                fetchSpy.mockResolvedValue(
                    new Response(null, { status: 206 })
                );

                await getLegalNotice();
            });
        });

        describe('error', () => {
            test('throws FetchError when fetch fails', async () => {
                fetchSpy.mockRejectedValue(new TypeError());
                await expect(getLegalNotice()).rejects.toThrow(FetchError);
            });

            test('throws FetchError on HTTP error', async () => {
                fetchSpy.mockResolvedValue(
                    new Response(null, { status: 404 })
                );
                await expect(getLegalNotice()).rejects.toThrow(FetchError);
            });

            test('does not throw FetchError when fetch throws another error than TypeError', async () => {
                fetchSpy.mockRejectedValue(new Error());
                await expect(getLegalNotice()).rejects.toThrow(Error);
            });
        });
    });
});
