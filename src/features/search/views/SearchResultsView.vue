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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="main-content-padding">
        <div class="search-results-error-message-container">
            <div class="search-results-error-message">
                <p>{{ t('search.error.searchNotAvailable') }}</p>
                <p>{{ t('error.tryAgainToAnotherTime') }}</p>
            </div>
        </div>
        <div class="search-results-container"></div>
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
    width: 100%;
}

.search-results-error-message {
    padding: var(--error-message-padding);
    font-size: 18px;
    box-shadow: 0px 0px 42px var(--gray-box-shadow);
    border-radius: 28px;
    text-align: center;
    background-color: var(--light-bg);
    animation: fade-in 0.8s ease-out;
    height: var(--error-message-height);
    display: flex;
    justify-content: center;
    flex-direction: column;
    outline: 1px solid var(--border);
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
        opacity: 1;
        transform: scale(1);
    }
}
</style>
