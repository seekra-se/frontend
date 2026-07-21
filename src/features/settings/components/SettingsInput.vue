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
import Icon from '@/features/icons/components/Icon.vue';

import { useSettingsStore } from '../stores/settingsStore';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    setting: {
        required: true
    },
    path: {
        required: true
    },
});

const store = useSettingsStore();

const inputModel = defineModel();
inputModel.value = store.get(props.path);

const inputClass = computed(() => ({
        number: 'number',
        string: 'text'
    }[props.setting.type]
));

const hasChanged = computed(() =>
    inputModel.value !== store.get(props.path)
);

const apply = function apply () {
    store.set(props.path, inputModel.value);
};
</script>

<template>
    <div class="input-setting-container">
        <div>
            {{ t(props.setting.i18n) }}
        </div>
        <form
            @submit.prevent="apply"
            class="input-container"
            :class="{ 'done-button-shown': hasChanged }"
        >
            <input
                :type="inputClass"
                v-model="inputModel"
                class="input"
            />
            <button class="done-button button" type="submit">
                <Icon name="check-mark" />
            </button>
        </form>
    </div>
</template>

<style scoped>
.input-setting-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.input-container {
    width: 50%;
    white-space: nowrap;
}

.input {
    width: calc(100% - 2 * var(--input-padding));
    display: inline;
    vertical-align: middle;
    --input-height: 24px;
}

.input-container.done-button-shown .input {
    width: calc(100% - 3.5 * var(--input-padding) - 26px - 0.75 * var(--input-height) + 1.5px);
}

.done-button {
    border: 1px solid var(--border);
    min-height: var(--input-height);
    padding: var(--input-padding);
    margin-left: calc(0.5 * var(--input-padding) + 0.25 * var(--input-height) + 0.5px);
    display: none;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--input-padding) + 13px);
    font-size: 1em;
    font-family: inherit;
}

.input-container.done-button-shown .done-button {
    display: inline-flex;
}
</style>