<script setup>
import Sidebar from '@/features/sidebar/components/Sidebar.vue';
</script>

<template>
    <div class="layout-container">
        <Sidebar>
            <slot name="sidebar" />
        </Sidebar>
        <div class="main-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.layout-container {
    display: grid;
    grid-template-columns: min(24%, 280px) 1fr;
}

.main-content {
    padding: 20px;
}
</style>