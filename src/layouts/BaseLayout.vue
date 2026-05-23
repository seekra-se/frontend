<script setup>
import Sidebar from '@/features/sidebar/components/Sidebar.vue';
</script>

<template>
    <div class="layout-container">
        <div>
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
    grid-template-columns: minmax(auto, 340px) 1fr;
}
</style>