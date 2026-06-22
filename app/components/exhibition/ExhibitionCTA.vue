<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const ctaRef = ref<HTMLElement | null>(null)

useSectionMotion(ctaRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="ctaRef"
    class="relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
    aria-labelledby="cta-heading"
  >
    <div class="ocean-section-bg" aria-hidden="true" />

    <UiWaveBackground variant="dark" position="full" height-class="h-full" fast />
    <UiWaveBackground variant="dark-top" position="top" height-class="h-16 sm:h-24 lg:h-28" fast />
    <UiWaveBackground variant="dark-bottom" position="bottom" height-class="h-16 sm:h-24 lg:h-28" fast />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 id="cta-heading" class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {{ $t('exhibition.cta.title') }}
      </h2>
      <p class="mt-4 text-lg text-ocean-100 max-w-xl mx-auto">
        {{ $t('exhibition.cta.subtitle') }}
      </p>
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-lg sm:max-w-none mx-auto">
        <NuxtLink
          :to="localePath('/contact')"
          class="btn-cta px-8 py-4 rounded-xl bg-white text-ocean-700 font-semibold hover:bg-ocean-50 hover:shadow-xl hover:shadow-ocean-900/30 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-600"
        >
          {{ $t('exhibition.cta.contactUs') }}
        </NuxtLink>
        <a
          href="#events-heading"
          class="btn-cta px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-600"
        >
          {{ $t('exhibition.cta.viewUpcomingEvents') }}
        </a>
      </div>
    </div>
  </section>
</template>
