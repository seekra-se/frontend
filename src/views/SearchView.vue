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