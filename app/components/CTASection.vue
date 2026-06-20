<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

const { run } = useScrollReveal(sectionRef)

run(({ revealWhenCentered }) => {
  if (!sectionRef.value) return

  const targets = [panelRef.value, headingRef.value, subtitleRef.value, buttonRef.value].filter(
    (el): el is HTMLElement => el !== null,
  )

  revealWhenCentered(targets, {
    start: SCROLL_REVEAL_START_CENTER,
    from: { y: 32, opacity: 0, scale: 0.96 },
    duration: 0.95,
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    id="contact"
    class="py-20 sm:py-24"
    aria-labelledby="cta-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref="panelRef"
        class="rounded-3xl overflow-hidden bg-gradient-to-r from-ocean-600 via-ocean-500 to-aqua-600 px-6 py-12 sm:px-12 sm:py-20 text-center shadow-xl"
      >
        <h2
          id="cta-heading"
          ref="headingRef"
          class="text-2xl sm:text-3xl font-bold text-white mb-4"
        >
          {{ $t('home.cta.title') }}
        </h2>
        <p ref="subtitleRef" class="text-white/90 max-w-xl mx-auto mb-8">
          {{ $t('home.cta.subtitle') }}
        </p>
        <a
          ref="buttonRef"
          href="mailto:adelbkk@cfi-capitalfood.com"
          class="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-500 w-full sm:w-auto"
        >
          {{ $t('home.cta.button') }}
        </a>
      </div>
    </div>
  </section>
</template>
