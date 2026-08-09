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
import SearchBar from '@/features/search/components/SearchBar.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchQueryModel = defineModel();

watch(
    () => route.name,
    (name) => {
        searchQueryModel.value =
            name === 'searchResults' ? route.query.q || '' : '';
    },
);

watch(
    () => route.query.q,
    (q) => {
        if (route.name === 'searchResults') {
            searchQueryModel.value = q || '';
        }
    },
);
</script>

<template>
    <SearchBar
        v-if="route.name === 'searchResults'"
        v-model="searchQueryModel"
        auto-submit
    />
</template>
