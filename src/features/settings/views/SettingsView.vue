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
import LeftSidebarLayout from '@/layouts/LeftSidebarLayout.vue';
import SettingsPage from '../components/SettingsPage.vue';

import { loadSettingsConfig } from '../utils/settingsParser';
import { onMounted, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const settingsLoaded = ref(false)
const settings = ref([]);
const activeSectionContent = ref({});
const activeSection = ref(null);

watchEffect(() => {
    const segments = route.path
        .split('/')
        .filter(Boolean);

    activeSection.value = segments[1];
});

const updateSettings = function updateSettings () {
    if (activeSection.value) {
        activeSectionContent.value = settings.value.filter((section) => section.name === activeSection.value)[0];
    } else {
        activeSectionContent.value = { content: [] };
    };
};

onMounted(async () => {
    settings.value = (await loadSettingsConfig()).contents;
    if (!settings.value.map((section) => section.name).includes(activeSection.value)) {
        router.push('/settings');
    };
    watchEffect(() => {
        updateSettings();
    });
    settingsLoaded.value = true;
});
</script>

<template>
    <div class="settings-page-wrapper">
        <header class="header">
            <h1>
                {{ t('preferences.settings') }}
            </h1>
        </header>
        <LeftSidebarLayout class="layout">
            <template #sidebar>
                <ul class="sidebar-sections-list">
                    <li v-for="section in settings">
                        <RouterLink
                            :to="`/settings/${section.name}`"
                            class="button button-link link sidebar-section"
                            :class="{ active: activeSection === section.name }"
                        >
                            {{ t(section.i18n) }}
                        </RouterLink>
                    </li>
                </ul>
            </template>
            <div class="settings-main-content">
                <div v-if="!settingsLoaded">
                    {{ t('loading') }}
                </div>
                <div v-else>
                    <SettingsPage :setting="activeSectionContent" :path="activeSection" />
                </div>
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