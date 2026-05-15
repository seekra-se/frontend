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
import { inject } from 'vue';
const isDark = inject('isDark');
</script>
<template>
    <nav class="global-nav">
        <RouterLink to="/" class="link button link">
            <span id="logo">Seekra</span>
        </RouterLink>
        <ul class="right-links">
        </ul>
    </nav>
</template>

<style scoped>
.global-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
}

.global-nav .right-links {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.global-nav .right-links a {
    text-decoration: none;
    color: #000;
}

.global-nav .right-links a:hover{
    text-decoration: underline;
}
</style>