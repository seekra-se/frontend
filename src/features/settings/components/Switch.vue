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
import { useSettingsStore } from '../stores/settingsStore';
import { ref, useId, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    setting: {
        required: true
    },
    path: {
        required: true
    }
});

const labelId = useId();
const switchId = useId();

const store = useSettingsStore();

const enabled = ref(null);
watch(store, (newStore) => {
    enabled.value = newStore.get(props.path);
});
// set value after registering watcher to avoid immediate value change
enabled.value = store.get(props.path) ?? props.setting.default;

const toggle = function toggle () {
    enabled.value = !enabled.value;
    store.set(props.path, enabled.value);
};
</script>

<template>
    <div class="switch-container" @click="toggle">
        <label :for="switchId" :id="labelId" class="switch-label">
            {{ t(props.setting.i18n) }}
        </label>
        <div
            class="switch-wrapper"
            :class="{ enabled }"
            :title="t('settings.switch.title')"
            :aria-label="t('settings.switch.ariaLabel')"
            :aria-labelledby="labelId"
        >
            <div class="switch-point"></div>
        </div>
    </div>
</template>

<style scoped>
.switch-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    cursor: pointer;
}

.switch-label {
    cursor: inherit;
}

.switch-wrapper {
    --point-size: 0.9em;
    --padding: 2px;
    --transition-duration: 0.2s;
    background-color: var(--light-bg);
    outline: 1px solid var(--border);
    width: calc(2 * var(--point-size));
    padding: var(--padding);
    border-radius: calc(0.5 * var(--point-size) + var(--padding));
    transition: background-color var(--transition-duration) ease;
}

.switch-point {
    height: var(--point-size);
    width: var(--point-size);
    background-color: var(--border);
    border-radius: calc(0.5 * var(--point-size));
    margin-left: 0;
    transition: margin-left var(--transition-duration) ease;
}

.switch-wrapper.enabled {
    background-color: var(--primary-color);
}

.switch-wrapper.enabled .switch-point {
    margin-left: var(--point-size);
}
</style>
