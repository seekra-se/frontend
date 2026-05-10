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
import Searchbar from '../features/search/components/Searchbar.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchQuery = ref('');

const submitSearch = function () {
    router.push({
        name: 'searchResults',
        query: { q: searchQuery.value }
    })
};
</script>

<template>
    <div class="search-content">
        <header class="global-header">
            <h1>Seekra</h1>
            <span class="slogan">
                Built to search.
            </span>
        </header>
    
        <form class="search-form" @submit.prevent="submitSearch">
            <Searchbar v-model="searchQuery" ref="searchbar" />
        </form>
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

.global-header h1 {
    display: inline-block;
    margin: 0;
    line-height: 1;
    background: linear-gradient(to right, #689BDB, #5F8DDC, #5077C7, #4562BE, #374FA5, #22298F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 6rem;
}

.slogan{
    margin: 0;
    font-size: small;
}

.search-form {
    width: 70%;
    max-width: 624px;
}
</style>