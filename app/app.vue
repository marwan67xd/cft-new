<script setup lang="ts">
const i18nHead = useLocaleHead({ dir: true, lang: true })
useHead(() => ({
  htmlAttrs: i18nHead.value?.htmlAttrs ?? { dir: 'ltr', lang: 'en' },
}))
</script>

<template>
  <div :dir="$i18n.locale.value === 'ar' ? 'rtl' : 'ltr'">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
