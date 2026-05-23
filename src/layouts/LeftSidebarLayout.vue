<script setup>
import Sidebar from '@/features/sidebar/components/Sidebar.vue';
</script>

<template>
    <div class="layout-container">
        <Sidebar>
            <slot name="sidebar" />
        </Sidebar>
        <main class="main-content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout-container {
    display: grid;
    grid-template-columns: min(24%, 280px) 1fr;
    border-top: 1px solid var(--border);
}

.main-content {
    padding: 20px;
}
</style>