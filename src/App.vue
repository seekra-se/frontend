<script setup>
import Navbar from './features/nav/components/Navbar.vue';
import Footer from './features/footer/components/Footer.vue';
</script>

<template>
    <Navbar />

    <div class="main-content">
        <router-view />
    </div>

    <Footer />
</template>

<style scoped>
.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 60px;
    flex-grow: 1;
}
</style>