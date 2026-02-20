<script setup lang="ts">
const { locale, locales } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find((l: any) => l.code === locale.value)
})

watch(locale, (newLocale) => {
  const localeConfig = locales.value.find((l: any) => l.code === newLocale)
  if (localeConfig) {
    useHead({
      htmlAttrs: {
        dir: localeConfig.dir || 'ltr',
        lang: newLocale
      }
    })
  }
}, { immediate: true })

useHead(() => ({
  htmlAttrs: { 
    dir: currentLocale.value?.dir || 'ltr', 
    lang: locale.value || 'en' 
  },
}))
</script>

<template>
  <div :dir="currentLocale?.dir || 'ltr'">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
