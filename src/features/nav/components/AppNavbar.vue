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
import NavbarSearchBarWrapper from './NavbarSearchBarWrapper.vue';
import logo from '@/assets/images/logo.svg';
import ColorSchemeButton from '@/features/colorScheme/components/ColorSchemeButton.vue';
</script>

<template>
    <nav class="global-nav">
        <RouterLink to="/" class="link button link">
            <img :src="logo" alt="Seekra" class="nav-logo" />
        </RouterLink>
        <NavbarSearchBarWrapper class="navbar-search-bar-wrapper" />
        <ul class="right-links">
            <li>
                <ColorSchemeButton />
            </li>
        </ul>
    </nav>
    <div class="navbar-search-bar-wrapper-small-screens-wrapper">
        <NavbarSearchBarWrapper class="navbar-search-bar-wrapper-small-screens" />
    </div>
</template>

<style scoped>
.global-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px var(--main-content-padding-x);
    height: 42px;
}

.global-nav .right-links {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
}

.global-nav .right-links a {
    text-decoration: none;
    color: var(--dark);
}

.global-nav .right-links a:hover{
    text-decoration: underline;
}

.nav-logo {
    height: 24px;
    width: auto;
}

.navbar-search-bar-wrapper {
    width: 100%;
    padding: 0 30px;
}

.navbar-search-bar-wrapper-small-screens-wrapper {
    padding: 0 15px 15px;
}

.navbar-search-bar-wrapper-small-screens {
    display: none;
}

@media (max-width: 48rem) {
    .navbar-search-bar-wrapper {
        display: none;
    }

    .navbar-search-bar-wrapper-small-screens {
        display: block;
    }
}
</style>
