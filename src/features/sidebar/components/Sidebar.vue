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
import SidebarExpandButton from './SidebarExpandButton.vue';

const props = defineProps({
    'expanded': {
        default: false,
        required: false,
        type: Boolean
    }
});
const emit = defineEmits(['toggleExpanded']);

const toggleSidebar = function toggleSidebar () {
    emit('toggleExpanded');
};
</script>

<template>
    <nav class="sidebar">
        <div class="sidebar-controls">
            <SidebarExpandButton @click="toggleSidebar" />
        </div>
        <div class="sidebar-content" v-if="props.expanded">
            <slot />
        </div>
    </nav>
</template>

<style scoped>
.sidebar {
    border-right: 1px solid var(--border);
}

.sidebar-controls {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 1em 20px;
    padding-bottom: 0;
    margin-bottom: 8px;
}

.sidebar-content {
    padding: 20px;
    padding-top: 0;
}
</style>