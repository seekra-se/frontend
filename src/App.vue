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

import { useColorScheme } from './features/colorScheme/composables/useColorScheme';
import { ref, provide, watch } from 'vue';

const { getColorScheme, updateColorScheme } = useColorScheme();
const colorScheme = ref(getColorScheme());
provide('colorScheme', colorScheme);
watch(colorScheme, val => updateColorScheme(val))
</script>

<template>
    <div
        :style="{ colorScheme: colorScheme === 'auto' ? 'normal' : (colorScheme === 'dark' ? 'dark' : 'light')}"
        :class="{ dark: colorScheme === 'dark', 'color-scheme-auto': colorScheme === 'auto' }"
        id="app-wrapper"
    >
        <Navbar />

        <router-view class="main-content" />

        <Footer />
    </div>
</template>

<style scoped>
#app-wrapper {
    --main-content-padding-x: 30px;
    --main-content-padding-y: 40px;
    --main-content-padding: var(--main-content-padding-y) var(--main-content-padding-x);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--light-bg);
    color: var(--dark);
}

.main-content {
    flex-grow: 1;
}

@media (max-width: 48rem) {
    #app-wrapper {
        --main-content-padding-x: 15px;
    }
}
</style>