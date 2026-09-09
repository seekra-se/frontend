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
import SettingsPage from '../components/SettingsPage.vue';
import settingsConfiguration from '../config.js';
import { getSettingRecursively } from '../utils/getSetting.js';
import LeftSidebarLayout from '@/layouts/LeftSidebarLayout.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const settings = settingsConfiguration.contents;

const activePath = computed(() => {
    const segments = route.path.split('/').filter(Boolean);

    return segments.slice(1, segments.length);
});

const activeSection = ref(null);
const updateSettings = async function updateSettings() {
    const setting = getSettingRecursively(activePath.value, settings);
    activeSection.value = setting;
    if (!setting) {
        await router.push('/settings');
    }
};
watch(route, (newRoute) => updateSettings(newRoute));
onMounted(updateSettings);

const toggleSidebarIfSmallScreen = function toggleSidebarIfSmallScreen(
    toggleSidebarFunction,
) {
    if (matchMedia('(max-width: 48rem)').matches) toggleSidebarFunction();
};
</script>

<template>
    <div class="settings-page-wrapper">
        <header class="header">
            <h1>
                {{ t('preferences.settings') }}
            </h1>
        </header>
        <LeftSidebarLayout class="layout">
            <template #sidebar="{ toggleSidebar }">
                <ul class="sidebar-sections-list">
                    <li v-for="section in settings" :key="section">
                        <RouterLink
                            :to="`/settings/${section.name}`"
                            class="button button-link link sidebar-section"
                            :class="{
                                active:
                                    activeSection &&
                                    activeSection.name === section.name,
                            }"
                            @click="toggleSidebarIfSmallScreen(toggleSidebar)"
                        >
                            {{ t(section.i18n) }}
                        </RouterLink>
                    </li>
                </ul>
            </template>
            <div v-if="activeSection">
                <div class="settings-main-content">
                    <SettingsPage :setting="activeSection" :path="activePath" />
                </div>
            </div>
            <div v-else class="main-content--no-section">
                {{ t('settings.noSectionSelected') }}
            </div>
        </LeftSidebarLayout>
    </div>
</template>

<style scoped>
.layout {
    flex-grow: 1;
}

.settings-page-wrapper {
    display: flex;
    flex-direction: column;
}

.active {
    background-color: var(--light-hover);
}

.header {
    padding: var(--main-content-padding-y) var(--main-content-padding-x);
}

.header h1 {
    margin: 0;
}

.sidebar-sections-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.sidebar-section {
    --padding: 0.8em;
    border-radius: var(--padding);
    padding: var(--padding);
    margin-bottom: 4px;
    width: calc(100% - 2 * var(--padding));
    text-align: start;
    font-size: 1rem;
    display: block;
}

.settings-main-content {
    padding: 0 30%;
}

@media (max-width: 80em) {
    .settings-main-content {
        padding: 0;
    }
}
</style>
