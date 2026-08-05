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
import { getLegalNotice } from '../services/fetchLegalContent';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const legalNoticeHtml = ref(null);
onMounted(async () => {
    legalNoticeHtml.value = await getLegalNotice();
});
</script>

<template>
    <div class="main-content-padding legal-notice-container">
        <header class="header">
            <h1>
                {{ t('legal.notice.title') }}
            </h1>
        </header>
        <main>
            <div class="legal-notice" v-html="legalNoticeHtml"></div>
        </main>
    </div>
</template>

<style scoped>
.header h1 {
    margin-top: 0;
}
</style>
