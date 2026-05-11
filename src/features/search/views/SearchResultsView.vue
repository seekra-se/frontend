<script setup>
import Searchbar from '@/features/search/components/Searchbar.vue';

const props = defineProps(['searchQuery']);

const searchQueryModel = defineModel();
searchQueryModel.value = props.searchQuery;
</script>

<template>
    <Searchbar class="search-bar" v-model="searchQueryModel" auto-submit />

    <div class="search-results-error-message-container">
        <div class="search-results-error-message">
            <p>Search is not available right now.</p>
            <p>Please try again to another time.</p>
        </div>
    </div>
    <div class="search-results-container">
    </div>
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

.search-results-container {
    margin-top: 56px;
}

.search-results-error-message-container {
    --error-message-height: 100px;
    --error-message-padding: 2em;
    display: flex;
    justify-content: center;
    width: calc(100% - 2 * var(--main-content-padding-x));
    position: absolute;
    top: calc(50vh - 0.5 * var(--error-message-height) - var(--error-message-padding));
}

.search-results-error-message {
    padding: var(--error-message-padding);
    font-size: 18px;
    box-shadow: 0px 0px 42px #cdcdcdb3;
    border-radius: 28px;
    text-align: center;
    background-color: #f7f7f7;
    animation: fade-in 0.8s ease-out;
    height: var(--error-message-height);
    display: flex;
    justify-content: center;
    flex-direction: column;
    outline: 1px solid var(--light-d-2);
}

@media (max-width: 48rem) {
    .search-results-error-message-container {
        --error-message-height: 150px;
    }
    .search-results-error-message {
        padding: 1em;
        width: 100%;
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 0;
        transform: scale(1.02);
    }
    100% {
        opacity: 100;
        transform: scale(1);
    }
}
</style>