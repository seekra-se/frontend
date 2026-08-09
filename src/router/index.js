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

import LegalNoticeView from '@/features/legal/views/LegalNoticeView.vue';
import SearchResultsView from '@/features/search/views/SearchResultsView.vue';
import SearchView from '@/features/search/views/SearchView.vue';
import SettingsView from '@/features/settings/views/SettingsView.vue';
import NotFound from '@/views/NotFound.vue';

import { i18n } from '@/i18n';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'startPage',
        component: SearchView,
    },
    {
        path: '/search',
        name: 'searchResults',
        component: SearchResultsView,
        props: (route) => ({
            searchQuery: route.query.q,
        }),
        meta: {
            title: (route) => route.query.q,
        },
    },
    {
        path: '/legal/notice',
        name: 'legalNotice',
        component: LegalNoticeView,
        meta: {
            title: () => i18n.global.t('legal.notice.title'),
        },
    },
    {
        path: '/settings/:rest(.*)*',
        name: 'settings',
        component: SettingsView,
        meta: {
            title: () => i18n.global.t('preferences.settings'),
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export const updatePageTitle = function updatePageTitle(route) {
    const title =
        typeof route.meta.title === 'function'
            ? route.meta.title(route)
            : route.meta.title;

    if (title) {
        document.title = `${title} - Seekra`;
    } else {
        document.title = 'Seekra';
    }
};

// remove trailing slash(es)
router.beforeEach((route) => {
    if (route.path !== '/' && route.path.endsWith('/')) {
        return {
            path: route.path.replace(/\/+$/, ''),
            query: route.query,
            hash: route.hash,
            replace: true,
        };
    }
});

export default router;
