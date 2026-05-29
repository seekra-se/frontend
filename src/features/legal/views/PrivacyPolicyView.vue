```vue
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
import { useI18n } from 'vue-i18n';

// 1. ALLE Sprachen importieren (Verhindert den ReferenceError)
import de from '@/legal/privacy/de.md?raw';
import en from '@/legal/privacy/en.md?raw';
import fr from '@/legal/privacy/fr.md?raw';
import es from '@/legal/privacy/es.md?raw';
import it from '@/legal/privacy/it.md?raw';
import pt from '@/legal/privacy/pt.md?raw';

const { locale } = useI18n();

const content = computed(() => {
  const map = {
    de,
    en,
    fr,
    es,
    it,
    pt
  };

  // Falls eine Sprache mal nicht existiert, nutzen wir 'de' oder 'en' als Fallback
  return map[locale.value] || de;
});
</script>

<template>
  <main class="privacy-policy-content main-content-padding">
    <h1>{{ $t('legal.privacy.title') }}</h1>

    <div class="markdown-body">{{ content }}</div>
  </main>
</template>

<style scoped>
.privacy-policy-content {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
}

/* Sorgt dafür, dass die Zeilenumbrüche aus den .md Dateien erhalten bleiben */
.markdown-body {
  white-space: pre-wrap;
  font-family: inherit;
  line-height: 1.6;
}
</style>