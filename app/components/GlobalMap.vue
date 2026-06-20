<script setup lang="ts">
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const { run } = useScrollReveal(sectionRef)

run(({ reveal, revealHeader }) => {
  if (!sectionRef.value) return

  revealHeader(headingRef.value, subtitleRef.value, sectionRef.value)

  if (cardRef.value) {
    reveal(cardRef.value, {
      trigger: sectionRef.value,
      from: { y: 40, opacity: 0, scale: 0.97 },
      duration: 1,
      delay: 0.12,
    })
  }

  if (tooltipRef.value) {
    reveal(tooltipRef.value, {
      trigger: sectionRef.value,
      from: { y: 20, opacity: 0, scale: 0.94 },
      duration: 0.8,
      delay: 0.28,
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    id="global"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="global-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="global-heading"
        ref="headingRef"
        class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4"
      >
        {{ $t('home.global.title') }}
      </h2>
      <p ref="subtitleRef" class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        {{ $t('home.global.subtitle') }}
      </p>

      <div ref="cardRef" class="relative max-w-4xl mx-auto">
        <div class="aspect-[2/1] rounded-2xl overflow-hidden bg-ocean-100 shadow-card border border-ocean-200/50">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
            alt="World map - global presence"
            class="w-full h-full object-cover opacity-90"
            width="1200"
            height="600"
            loading="lazy"
          />
        </div>
        <div
          ref="tooltipRef"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl bg-white shadow-card border border-gray-100 text-center"
        >
          <p class="text-ocean-900 font-medium">{{ $t('home.global.tooltip') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
