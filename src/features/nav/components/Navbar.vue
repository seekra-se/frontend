<!--
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
-->

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ColorSchemeButton from '@/features/colorScheme/components/ColorSchemeButton.vue';
import LanguageSwitchButton from '@/features/i18n/components/LanguageSwitchButton.vue';
import logo from '@/assets/images/logo.svg';
import Searchbar from '@/features/search/components/Searchbar.vue';

const route = useRoute();
const searchQueryModel = ref(route.name === 'searchResults' ? route.query.q || '' : '');

watch(() => route.name, name => {
    searchQueryModel.value = name === 'searchResults' ? route.query.q || '' : '';
});

watch(() => route.query.q, q => {
    if (route.name === 'searchResults') {
        searchQueryModel.value = q || '';
    }
});
</script>

<template>
    <nav class="global-nav">
        <RouterLink to="/" class="link button link">
            <img :src="logo" alt="Seekra" class="nav-logo" />
        </RouterLink>
        <Searchbar
            v-if="route.name === 'searchResults'"
            class="search-bar"
            v-model="searchQueryModel"
            auto-submit
        />
        <ul class="right-links">
            <li>
                <LanguageSwitchButton />
            </li>
            <li>
                <ColorSchemeButton />
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.global-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
}

.global-nav .right-links {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
}

.global-nav .right-links a {
    text-decoration: none;
    color: var(--dark);
}

.global-nav .right-links a:hover{
    text-decoration: underline;
}

.nav-logo {
    height: 24px;
    width: auto;
}
.search-bar {
    width: 70%;
}
</style>
