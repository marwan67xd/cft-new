<script setup lang="ts">
const { t } = useI18n()
const ctaRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && ctaRef.value) {
    nextTick(() => {
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          gsap.fromTo(ctaRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: ctaRef.value, start: 'top 55%' } })
        })
      })
    })
  }
})
</script>

<template>
  <section
    ref="ctaRef"
    id="contact"
    class="py-20 sm:py-24"
    aria-labelledby="cta-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ocean-600 via-ocean-500 to-aqua-600 px-8 py-16 sm:px-12 sm:py-20 text-center shadow-xl"
      >
        <UiWaveBackground variant="ocean" position="full" height-class="h-full" />
        <div class="relative z-10">
          <h2 id="cta-heading" class="text-2xl sm:text-3xl font-bold text-white mb-4">
            {{ $t('home.cta.title') }}
          </h2>
          <p class="text-white/90 max-w-xl mx-auto mb-8">
            {{ $t('home.cta.subtitle') }}
          </p>
          <a
            href="mailto:contact@example.com"
            class="btn-dynamic inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-500"
          >
            {{ $t('home.cta.button') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
