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
import Switch from './Switch.vue';
import SettingsInput from './SettingsInput.vue';

import { useI18n } from 'vue-i18n';
import { getSectionHeadingLevel } from '../utils/getSectionHeadingLevel.js';

const { t } = useI18n();

const props = defineProps({
    setting: {
        required: true
    },
    path: {
        required: true
    },
});
</script>

<template>
    <div>
        <div role="heading" :aria-level="getSectionHeadingLevel(props.path)" class="section-heading">
            {{ t(props.setting.i18n) }}
        </div>
        <div
            v-for="setting in props.setting.content"
            class="setting"
        >
            <Switch
                v-if="setting.type === 'bool'"
                :setting="setting"
                :path="`${props.path}.${setting.name}`"
            />
            <SettingsInput
                v-if="setting.type === 'string' || setting.type === 'number'"
                :setting="setting"
                :path="`${props.path}.${setting.name}`"
            />
        </div>
    </div>
</template>

<style scoped>
.setting {
    margin-bottom: 1.2em;
}

.section-heading {
    --size: 1.2em;
    font-size: var(--size);
    margin-bottom: calc(var(--size) - 0.2em);
}

.section-heading[aria-level="2"] {
    --size: 1.8em;
}

.section-heading[aria-level="3"] {
    --size: 1.6em;
}

.section-heading[aria-level="4"] {
    --size: 1.4em;
}
</style>