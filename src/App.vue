<script setup>
import Navbar from './features/nav/components/Navbar.vue';
</script>

<template>
    <div class="content-background">
        <Navbar />
        
        <router-view />
    </div>
</template>