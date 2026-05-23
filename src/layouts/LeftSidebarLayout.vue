<script setup>
import Sidebar from '@/features/sidebar/components/Sidebar.vue';

import { computed, useSlots } from 'vue';

const slots = useSlots();

const hasSidebarSlot = computed(() => !!slots.sidebar);
</script>

<template>
    <div
        class="layout-container"
        :style="{ 'grid-template-columns': `${hasSidebarSlot ? 'minmax(auto, 340px) ' : ''}1fr` }"
    >
        <div v-if="hasSidebarSlot">
            <Sidebar>
                <slot name="sidebar" />
            </Sidebar>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<style scoped>
.layout-container {
    display: grid;
}
</style>