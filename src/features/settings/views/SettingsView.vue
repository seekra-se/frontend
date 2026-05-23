<script setup>
import LeftSidebarLayout from '@/layouts/LeftSidebarLayout.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="settings-page-wrapper">
        <header>
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
</style>