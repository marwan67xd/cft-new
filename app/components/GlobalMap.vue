<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    nextTick(() => {
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          if (cardRef.value) {
            gsap.fromTo(cardRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
          if (tooltipRef.value) {
            gsap.fromTo(tooltipRef.value, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
        })
      })
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
      <h2 id="global-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4">
        Active in International Markets
      </h2>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        Supplying canned tuna, sardines, and mackerel to distribution partners across regional and international markets.
      </p>

      <div ref="cardRef" class="relative max-w-4xl mx-auto">
        <div class="aspect-[2/1] rounded-2xl overflow-hidden bg-ocean-100 shadow-card border border-ocean-200/50">
          <!-- World map placeholder - use SVG or image -->
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
          <p class="text-ocean-900 font-medium">Supplying premium seafood worldwide.</p>
        </div>
      </div>
    </div>
  </section>
</template>
