<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value) || { code: 'en', name: 'English' }
)
</script>

<template>
  <div class="relative flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50/80 p-1">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
      :class="
        locale === loc.code
          ? 'bg-white text-ocean-600 shadow-sm'
          : 'text-gray-600 hover:text-ocean-600'
      "
    >
      {{ loc.name }}
    </NuxtLink>
  </div>
</template>
