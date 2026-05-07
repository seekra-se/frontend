<script setup>
import Navbar from './features/nav/components/Navbar.vue';
import Footer from './features/footer/components/Footer.vue';
</script>

<template>
    <Navbar />
    
    <router-view />

    <Footer />
</template>