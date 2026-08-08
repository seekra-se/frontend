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
import SearchBar from '../features/search/components/SearchBar.vue';
import logo from '@/assets/images/logo.svg';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const searchQuery = ref('');
</script>

<template>
    <div class="search-content main-content-padding">
        <header class="global-header">
            <img :src="logo" alt="Seekra" class="header-logo" />
            <span class="slogan">
                {{ t('slogan') }}
            </span>
        </header>

        <div class="search-container">
            <SearchBar
                v-model="searchQuery"
                ref="searchbar"
                class="search-bar"
                auto-submit
            />
        </div>
    </div>
</template>

<style scoped>
.search-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
}

.global-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
}

.header-logo {
    width: 320px;
    max-width: 100%;
}

.slogan {
    margin-top: 1rem;
    font-size: small;
    line-height: normal;
}

.search-container {
    width: 70%;
    max-width: 624px;
}

@media (max-width: 67.5rem) {
    .search-container {
        width: 100%;
    }
}
</style>
