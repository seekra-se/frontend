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

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
            </template>
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

.header {
    padding: var(--main-content-padding-y) var(--main-content-padding-x);
}

.header h1 {
    margin: 0;
}
</style>