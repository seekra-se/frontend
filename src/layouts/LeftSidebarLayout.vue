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
import Sidebar from '@/features/sidebar/components/Sidebar.vue';
import SidebarExpandButton from '@/features/sidebar/components/SidebarExpandButton.vue';
import { ref } from 'vue';

const props = defineProps({
    'expanded': {
        default: false,
        required: false,
        type: Boolean
    }
});

const expanded = ref(props.expanded);

const toggleSidebar = function toggleSidebar() {
    expanded.value = !expanded.value;
};
</script>

<template>
    <div class="layout-container" :class="{ expanded }">
        <div class="sidebar-expand-button-container">
            <SidebarExpandButton class="sidebar-expand-button" @click="toggleSidebar" />
        </div>
        <Sidebar @toggle-expanded="toggleSidebar" :expanded="expanded" class="sidebar">
            <slot name="sidebar" :toggleSidebar="toggleSidebar" />
        </Sidebar>
        <main class="main-content">
            <slot :toggleSidebar="toggleSidebar" />
        </main>
    </div>
</template>

<style scoped>
.layout-container {
    display: grid;
    grid-template-columns: calc(32px + 2em) 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "sidebar-expand sidebar-expand"
        "sidebar main-content";
    border-top: 1px solid var(--border);
}

.layout-container.expanded {
    grid-template-columns: min(24%, 280px) 1fr;
}

.sidebar-expand-button-container {
    grid-area: sidebar-expand;
    display: none;
}

.sidebar {
    grid-area: sidebar;
}

@media (max-width: 48rem) {
    .layout-container {
        grid-template-columns: 0 1fr;
    }

    .layout-container.expanded {
        grid-template-columns: 1fr 0;
    }

    .layout-container:not(.expanded) .sidebar-expand-button-container {
        justify-content: end;
        display: block;
        padding: 20px;
    }

    .layout-container:not(.expanded) .main-content {
        padding-top: 0;
    }

    .layout-container.expanded .main-content {
        display: none;
    }
}

.main-content {
    grid-area: main-content;
    padding: 20px;
}
</style>
