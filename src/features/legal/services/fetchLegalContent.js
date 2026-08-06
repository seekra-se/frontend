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

import { FetchError } from '../errors';
import { getAssetsUrl } from '@/config/env';

const fetchHtml = async function fetchHtml (url, options) {
    let response;
    try {
        response = await fetch(url, options);
    } catch (err) {
        if (err instanceof TypeError) throw new FetchError(err);
        else throw err;
    }
    if (response.ok) return await response.text();
    else throw new FetchError();
};

export const getLegalNotice = async function getLegalNotice () {
    const legalNoticeUrl = new URL('legal/legal_notice.html', getAssetsUrl()).href;
    const html = await fetchHtml(legalNoticeUrl);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const legalNoticeContainer = doc.querySelector('main') ?? doc.body;
    legalNoticeContainer.querySelectorAll('a').forEach(
        (link) => link.classList.add('link')
    );
    return legalNoticeContainer.innerHTML;
};
