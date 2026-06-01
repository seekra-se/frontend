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
import { computed } from 'vue';
import { ensureUnit } from '@/utils/cssDimensions';

const props = defineProps({
    name: {
        required: true,
        type: String
    },
    size: {
        type: [Number, String],
        default: 24
    }
})

const icons = import.meta.glob('@/assets/icons/*.svg', {
    eager: true,
    import: 'default'
})

const Icon = computed(() => icons[`/src/assets/icons/${props.name}.svg`])

const size = computed(() => ensureUnit(props.size))
</script>

<template>
    <div class="icon-container">
        <img :src="Icon" :style="{ height: `${size}`, width: `${size}` }" />
    </div>
</template>

<style scoped>
.icon-container {
    display: flex;
    align-items: center;
    filter: var(--invert);
}
</style>