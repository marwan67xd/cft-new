<script setup lang="ts">
const { t } = useI18n()
const ctaRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && ctaRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          gsap.fromTo(ctaRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: ctaRef.value, start: 'top 90%' } })
        }, ctaRef)
      })
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="ctaRef"
    class="py-16 sm:py-20 lg:py-24"
    aria-labelledby="cta-heading"
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
          <h2 id="cta-heading" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {{ $t('contact.cta.title') }}
          </h2>
          <p class="text-white/90 max-w-xl mx-auto mb-6">
            {{ $t('contact.cta.subtitle') }}
          </p>
          <div class="mb-8 space-y-2">
            <p class="text-white font-semibold mb-2">{{ $t('contact.cta.haveQuestions') }}</p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="tel:+66925411454" class="text-white hover:text-gray-100 font-medium">+66 925411454</a>
              <span class="text-white/60">|</span>
              <a href="tel:+66847217966" class="text-white hover:text-gray-100 font-medium">+66 847217966</a>
            </div>
          </div>
          <NuxtLink
            to="#form-heading"
            class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold hover:bg-gray-50 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-500"
          >
            {{ $t('contact.cta.sendInquiry') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
