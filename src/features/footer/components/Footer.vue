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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const startYear = 2026
const currentYear = new Date().getFullYear()

const copyrightPeriod =
    startYear === currentYear
        ? `${currentYear}`
        : `${startYear}-${currentYear}`


</script>

<template>
    <footer class="global-footer">
        <div class="footer-segment">
            <RouterLink to="settings" class="link">
                {{ t('preferences.settings') }}
            </RouterLink>
        </div>
        <div class="footer-segment">
            <div class="copyright-note">
                &copy; {{ copyrightPeriod }} Seekra
            </div>
        </div>
    </footer>
</template>

<style scoped>
.global-footer {
    --padding-y: 16px;
}

.footer-segment {
    padding: var(--padding-y);
    background-color: var(--light-bg);
    border-top: 1px solid var(--border);
}

.global-footer a {
    color: var(--dark);
}

.copyright-note {
    display: flex;
    justify-content: center;
}
</style>