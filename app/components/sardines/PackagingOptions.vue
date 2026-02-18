<script setup lang="ts">
const items = [
  { label: 'Multiple can sizes', description: 'From retail to food service formats' },
  { label: 'Bulk packaging options', description: 'Industrial and wholesale' },
  { label: 'Private label production', description: 'Your brand, our quality' },
  { label: 'Custom branding availability', description: 'Flexible packaging and labels' },
]

const sectionRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (cardsRef.value) {
            const cards = cardsRef.value.querySelectorAll('[data-pack-card]')
            gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
        }, sectionRef)
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
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="packaging-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="packaging-heading" class="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-10 text-center">
        Packaging Options
      </h2>
      <div ref="cardsRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <div
          v-for="item in items"
          :key="item.label"
          data-pack-card
          class="rounded-2xl bg-gray-50 p-6 lg:p-8 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
        >
          <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-ocean-100 flex items-center justify-center text-ocean-600 mx-auto mb-4">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="font-bold text-navy">{{ item.label }}</h3>
          <p class="mt-2 text-sm text-gray-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
