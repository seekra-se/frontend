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
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const normalizeSelectedValue = function normalizeSelectedValue (value) {
    if (props.setting.allowMultiple) {
        if (Array.isArray(value)) {
            return value;
        }

        if (value === undefined || value === null) {
            return [];
        }

        return [value];
    }

    if (Array.isArray(value)) {
        return value[0] ?? null;
    }

    return value ?? null;
};

const props = defineProps({
    setting: {
        required: true
    },
    path: {
        required: true
    },
});

const store = useSettingsStore();

const optionType = computed(() => props.setting.allowMultiple ? 'checkbox' : 'radio');
const selected = ref(normalizeSelectedValue(store.get(props.path) ?? props.setting.default));

watch(selected, (newValue, oldValue) => {
    store.set(props.path, newValue);
});
</script>

<template>
    <div>
        {{ t(props.setting.i18n) }}
        <ul class="options-list">
            <li v-for="option in props.setting.options" :key="option.name">
                <label class="option">
                    <input
                        :type="optionType"
                        :name="props.path"
                        :value="option.name"
                        class="option-input"
                        v-model="selected"
                    >
                    <div class="option-check-mark-wrapper">
                        <Icon class="option-check-mark" name="check-mark" size="1em" />
                    </div>
                    {{ t(option.i18n) }}
                </label>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.options-list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 0.5em;
}

.option {
    --padding-x: 0.7em;
    padding: 0.3em var(--padding-x);
    margin-top: 0.2em;
    width: calc(100% - 2 * var(--padding-x));
    border-radius: 0.8em;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    background-color: var(--light-bg);

    user-select: none;
    -moz-user-select: none;
}

.option:hover {
    background-color: var(--light-hover);
}

.option-input {
    appearance: none;
    display: none;
}

.option-check-mark-wrapper {
    width: 1em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.option-check-mark {
    visibility: hidden;
}

.option-input:checked + .option-check-mark-wrapper .option-check-mark {
    visibility: visible;
}
</style>