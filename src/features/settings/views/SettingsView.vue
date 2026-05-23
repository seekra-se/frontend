<script setup>
import LeftSidebarLayout from '@/layouts/LeftSidebarLayout.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div>
        <h1>
            {{ t('preferences.settings') }}
        </h1>
        <LeftSidebarLayout>
            <template #sidebar>
            </template>
        </LeftSidebarLayout>
    </div>
</template>