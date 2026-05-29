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

import { createRouter, createWebHistory } from 'vue-router';
import { i18n } from '@/i18n';

import SearchView from '../views/SearchView.vue';
import SearchResultsView from '@/features/search/views/SearchResultsView.vue';
import SettingsView from '@/features/settings/views/SettingsView.vue';
import NotFound from '../views/NotFound.vue';
import PrivacyPolicy from '@/views/legal/PrivacyPolicy.vue';

const routes = [
    {
        path: '/',
        name: 'startPage',
        component: SearchView
    },
    {
        path: '/search',
        name: 'searchResults',
        component: SearchResultsView,
        props: route => ({
            searchQuery: route.query.q
        }),
        meta: {
            title: (route) => route.query.q
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: {
            title: () => i18n.global.t('preferences.settings')
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    },
    {
    path: '/privacy',
    name: 'privacyPolicy',
    component: PrivacyPolicy,
    meta: {
        title: () => 'Privacy Policy'
    }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// set page title
router.afterEach(to => {
    const title =
        typeof to.meta.title === 'function'
        ? to.meta.title(to)
        : to.meta.title;

    if (title) {
        document.title = `${title} - Seekra`;
    } else {
        document.title = 'Seekra';
    };
});

export default router;