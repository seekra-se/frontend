<script setup>
import Searchbar from '@/features/search/components/Searchbar.vue';

const props = defineProps(['searchQuery']);

const searchQueryModel = defineModel();
searchQueryModel.value = props.searchQuery;
</script>

<template>
    <Searchbar class="search-bar" v-model="searchQueryModel" auto-submit />
</template>

<style scoped>
.search-bar {
    width: 50%;
}

@media (max-width: 67.5rem) {
    .search-bar {
        width: 100%;
    }
}
</style>