<script setup>
import Navbar from './features/nav/components/Navbar.vue';
</script>

<template>
    <div class="content-background">
        <Navbar />
        
        <router-view />
    </div>
</template>

<style>
.content-background  {
    background: 
        radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.55) 0%, transparent 75%),
        linear-gradient(160deg, #c8d8f0, #7aa0d8, #5077C7, #dce8f8);
    height: 300px;
    display: flex;
    flex-direction: column;
}
</style>