<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const ctaRef = ref<HTMLElement | null>(null)

useSectionMotion(ctaRef, { preset: 'cta' })
</script>

<template>
  <section
    ref="ctaRef"
    class="py-20 sm:py-24"
    aria-labelledby="about-cta-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ocean-600 via-ocean-500 to-aqua-600 px-8 py-16 sm:px-12 sm:py-20 text-center shadow-xl"
      >
        <div
          class="absolute inset-0 opacity-10"
          aria-hidden="true"
          style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
        />
        <div class="relative z-10">
          <h2 id="about-cta-heading" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {{ $t('companyProfile.cta.title') }}
          </h2>
          <p class="text-white/90 max-w-xl mx-auto mb-8">
            {{ $t('companyProfile.cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <NuxtLink
              :to="localePath('/#contact')"
              class="btn-cta px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-500"
            >
              {{ $t('companyProfile.cta.contactButton') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
