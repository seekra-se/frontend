<script setup>
import Sidebar from '@/features/sidebar/components/Sidebar.vue';
</script>

<template>
    <Sidebar>
        <slot name="sidebar" />
    </Sidebar>
    <slot />
</template>