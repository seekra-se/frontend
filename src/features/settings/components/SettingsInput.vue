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

import { computed, ref, useId, watch } from 'vue';
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

const inputModel = ref(store.get(props.path) ?? props.setting.default);
let oldInputValue = inputModel.value;

const doneButtonInitial = ref(true);

const inputId = useId();
const inputLabelId = useId();

const inputType = computed(() => ({
        number: 'number',
        string: 'text'
    }[props.setting.type]
));

const hasChanged = computed(() =>
    inputModel.value !== store.get(props.path)
);

watch(store, (newValue) => {
    const newInputValue = newValue.get(props.path);
    if (inputModel.value === oldInputValue) {
        inputModel.value = newInputValue;
        oldInputValue = newInputValue;
    };
});

watch(inputModel, () => {
    doneButtonInitial.value = false;
});

const apply = function apply () {
    store.set(props.path, inputModel.value);
};
</script>

<template>
    <div class="input-setting-container">
        <label :for="inputId" :id="inputLabelId">
            {{ t(props.setting.i18n) }}
        </label>
        <form
            @submit.prevent="apply"
            class="input-container"
            :class="{ 'done-button-shown': hasChanged }"
        >
            <input
                :type="inputType"
                :id="inputId"
                :aria-labelledby="inputLabelId"
                v-model="inputModel"
                class="input"
            />
            <button
                ref="doneButton"
                class="done-button button"
                :class="{ initial: doneButtonInitial }"
                type="submit"
                :title="t('settings.input.done.title')"
                :aria-label="t('settings.input.done.ariaLabel')"
            >
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
    position: relative;
    width: 50%;
    white-space: nowrap;
    --total-animation-duration: 0.3s;
}

.input {
    box-sizing: border-box;
    width: 100%;
    height: calc(var(--input-height) + 2 * var(--input-padding-y));
    display: inline;
    vertical-align: middle;
    --input-height: 24px;
    transition: width calc(var(--total-animation-duration) / 3);
}

.input-container:not(.done-button-shown) .input {
    transition-delay: calc((2 / 3) * var(--total-animation-duration));
}

.input-container.done-button-shown .input {
    width: calc(100% - 1.5 * var(--input-padding) - 26px - 0.75 * var(--input-height) + 1.5px);
}

.done-button {
    position: absolute;
    right: 0;
    top: 50%;
    border: 1px solid var(--border);
    min-height: var(--input-height);
    padding: var(--input-padding);
    transform: translateY(-50%) scale(0);
    transform-origin: center;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--input-padding) + 13px);
    font-size: 1em;
    font-family: inherit;
}

.done-button:not(.initial) {
    animation: done-button-disappear var(--total-animation-duration);
}

.input-container.done-button-shown .done-button {
    animation: done-button-appear var(--total-animation-duration);
    display: inline-flex;
    transform: translateY(-50%) scale(1);
}

@keyframes done-button-appear {
    0% {
        transform: translateY(-50%) scale(0);
    }
    10% {
        transform: translateY(-50%) scale(0);
    }
    95% {
        transform: translateY(-50%) scale(1.05);
    }
    100% {
        transform: translateY(-50%) scale(1);
    }
}

@keyframes done-button-disappear {
    0% {
        transform: translateY(-50%) scale(1);
    }
    100% {
        transform: translateY(-50%) scale(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    @keyframes done-button-appear {
        0% {
            transform: translateY(-50%) scale(1);
            opacity: 0;
        }
        10% {
            transform: translateY(-50%) scale(1);
            opacity: 0;
        }
        100% {
            transform: translateY(-50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes done-button-disappear {
        0% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50%) scale(1);
        }
    }
}
</style>