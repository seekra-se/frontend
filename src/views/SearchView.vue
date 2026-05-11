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
import Searchbar from '../features/search/components/Searchbar.vue'
</script>

<template>
    <header class="global-header">
        <h1>Seekra</h1>
        <span class="slogan">
            Built to search.
        </span>
    </header>
    
    <form id="search-form">
        <Searchbar />
    </form>
</template>

<style scoped>
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
    background: linear-gradient(
        to right,
        var(--primary-color-l-4),
        var(--primary-color),
        var(--primary-color-d-4)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 6rem;
}

.slogan{
    margin: 0;
    font-size: small;
}

#search-form {
    width: 70%;
    max-width: 624px;
}
</style>