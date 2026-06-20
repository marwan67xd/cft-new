<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

const { run } = useScrollReveal(sectionRef)

run(({ reveal }) => {
  if (!sectionRef.value) return

  if (panelRef.value) {
    reveal(panelRef.value, {
      trigger: sectionRef.value,
      from: { y: 48, opacity: 0, scale: 0.96 },
      duration: 1,
      start: 'top 88%',
    })
  }

  if (headingRef.value) {
    reveal(headingRef.value, {
      trigger: sectionRef.value,
      from: { y: 28, opacity: 0 },
      duration: 0.85,
      delay: 0.1,
      start: 'top 88%',
    })
  }

  if (subtitleRef.value) {
    reveal(subtitleRef.value, {
      trigger: sectionRef.value,
      from: { y: 22, opacity: 0 },
      duration: 0.85,
      delay: 0.2,
      start: 'top 88%',
    })
  }

  if (buttonRef.value) {
    reveal(buttonRef.value, {
      trigger: sectionRef.value,
      from: { y: 18, opacity: 0, scale: 0.95 },
      duration: 0.8,
      delay: 0.32,
      start: 'top 88%',
    })
  }
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
        class="rounded-3xl overflow-hidden bg-gradient-to-r from-ocean-600 via-ocean-500 to-aqua-600 px-8 py-16 sm:px-12 sm:py-20 text-center shadow-xl"
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
          href="mailto:contact@example.com"
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-500"
        >
          {{ $t('home.cta.button') }}
        </a>
      </div>
    </div>
  </section>
</template>
