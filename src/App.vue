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
import { LANGUAGE_PATH } from './config/featureSettings.js';
import Footer from './features/footer/components/Footer.vue';
import Navbar from './features/nav/components/Navbar.vue';
import { useSettings } from './features/settings/composables/useSettings.js';
import { setLocale } from './i18n';
import { updatePageTitle } from './router';
import { computed, onMounted, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { getSetting } = useSettings();
const colorScheme = computed(() => getSetting(['appearance', 'colorScheme']));

const updateColorScheme = function updateColorScheme(newColorScheme) {
    document.body.style.setProperty(colorScheme, {
        auto: 'normal',
        dark: 'dark',
        light: 'light'
    });
    if (newColorScheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    if (newColorScheme === 'auto') {
        document.body.classList.add('color-scheme-auto');
    } else {
        document.body.classList.remove('color-scheme-auto');
    }
};
watch(colorScheme, (newColorScheme) => {
    updateColorScheme(newColorScheme);
});
updateColorScheme(colorScheme.value);

watchEffect(() => updatePageTitle(route));

onMounted(() => {
    setLocale(getSetting(LANGUAGE_PATH));
});
</script>

<template>
    <div id="app-wrapper">
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
