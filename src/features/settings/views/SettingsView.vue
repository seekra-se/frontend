<script setup>
import LeftSidebarLayout from '@/layouts/LeftSidebarLayout.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <h1>
        {{ t('preferences.settings') }}
    </h1>
    <BaseLayout class="layout">
        <template #sidebar>
        </template>
    </BaseLayout>
</template>

<style scoped>
.layout {
    flex-grow: 1;
}
</style>