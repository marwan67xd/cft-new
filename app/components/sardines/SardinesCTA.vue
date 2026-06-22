<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const ctaRef = ref<HTMLElement | null>(null)

useSectionMotion(ctaRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="ctaRef"
    class="py-16 sm:py-20 lg:py-24 relative overflow-hidden text-white"
    aria-labelledby="cta-heading"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-ocean-700 via-ocean-600 to-ocean-800"
      aria-hidden="true"
    />

    <UiWaveBackground variant="ocean" position="full" height-class="h-full" fast />
    <UiWaveBackground variant="ocean" position="top" height-class="h-14 sm:h-20" fast />
    <UiWaveBackground variant="ocean" position="bottom" height-class="h-14 sm:h-20" fast />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 id="cta-heading" class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {{ $t('sardinesMackerel.cta.title') }}
      </h2>
      <p class="mt-4 text-lg text-ocean-100 max-w-xl mx-auto">
        {{ $t('sardinesMackerel.cta.subtitle') }}
      </p>
      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full max-w-lg sm:max-w-none mx-auto">
        <NuxtLink
          :to="localePath('/contact')"
          class="btn-cta px-8 py-4 rounded-xl bg-white text-ocean-700 font-semibold hover:bg-ocean-50 hover:shadow-xl hover:shadow-ocean-900/30 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-600"
        >
          {{ $t('sardinesMackerel.cta.requestQuotation') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/contact')"
          class="btn-cta px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-600"
        >
          {{ $t('sardinesMackerel.cta.contactSales') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
