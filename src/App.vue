<!--
Copyright 2026 Seekra

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

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