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
import { ref } from 'vue';

const props = defineProps({
    'expanded': {
        default: false,
        required: false,
        type: Boolean
    }
});

const expanded = ref(props.expanded);

const toggleExpanded = function toggleExpanded () {
    expanded.value = !expanded.value;
};
</script>

<template>
    <div class="layout-container" :class="{ expanded }">
        <Sidebar @toggle-expanded="toggleExpanded" :expanded="expanded">
            <slot name="sidebar" />
        </Sidebar>
        <main class="main-content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout-container {
    display: grid;
    grid-template-columns: 72px 1fr;
    border-top: 1px solid var(--border);
}

.layout-container.expanded {
    grid-template-columns: min(24%, 280px) 1fr;
}

@media (max-width: 48rem) {
    .layout-container {
        grid-template-columns: 0 1fr;
    }

    .layout-container.expanded {
        grid-template-columns: 1fr 0;
    }
}

.main-content {
    padding: 20px;
}
</style>