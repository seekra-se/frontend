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
import { useSettingsPage } from '../composables/useSettingsPage';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { goToSettingsPage } = useSettingsPage();

const props = defineProps({
    target: {
        required: true,
        type: String
    },
    displayName: {
        required: true,
        type: String
    }
});

const followLink = function followLink () {
    goToSettingsPage(props.target);
};
</script>

<template>
    <button
        class="settings-button button settings-page-link"
        :title="props.displayName"
        :aria-label="t('settings.pages.link.ariaLabel', { page: props.displayName })"
        @click="followLink"
    >
        {{ props.displayName }}
        <Icon name="chevron-right" size="1em" />
    </button>
</template>

<style scoped src="./SettingsButton.css"></style>
<style scoped>
.settings-page-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
