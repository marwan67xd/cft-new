<script setup lang="ts">
defineProps<{ scrolled?: boolean }>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentLocale = computed(() => {
  return locales.value.find((l: any) => l.code === locale.value)
})

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  const path = switchLocalePath(newLocale)
  if (path) {
    router.push(path)
  }
}

const languageLabel = computed(() => {
  return locale.value === 'en' ? 'AR' : 'EN'
})
</script>

<template>
  <button
    @click="toggleLanguage"
    :aria-label="`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`"
    class="inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-xs uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
    :class="scrolled === false
      ? 'bg-white/10 hover:bg-white/20 border border-white/50 hover:border-sky-400 text-white hover:text-sky-400'
      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-ocean-300 text-gray-700 hover:text-ocean-700 shadow-sm hover:shadow'"
    title="Switch language"
  >
    {{ languageLabel }}
  </button>
</template>
