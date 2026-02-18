<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (textRef.value) {
            gsap.fromTo(textRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
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
    class="py-12 sm:py-16 lg:py-20 bg-white"
    aria-labelledby="intro-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 id="intro-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-6 text-center">
          TUNA
        </h2>
        <div ref="textRef" class="space-y-6 text-gray-600">
          <p class="text-lg sm:text-xl leading-relaxed">
            We serve CANNED TUNA the tasty meal from the sea. Tuna is one of the popular commercial fishes. It is the oily fish, contained a high amount of Vitamin D and good source of Omega-3 fatty acids suitable for infants, children, men and woman.
          </p>
          <p class="text-base sm:text-lg leading-relaxed">
            We are exporter for canned tuna (light meat tuna /Bonito Tuna, Skipjack Tuna and white meat Tuna / Yellow fin and Tonggol tuna) in variety of recipes such as vegetable Oil, Brine, Brine and Oil etc.
          </p>
          <p class="text-base sm:text-lg leading-relaxed">
            It's absolutely that our Canned Tuna is also enrich of Protein, low in Fat and Calories. It is the excellent source of essential Omega-3 Fatty Acids which help to lower blood pressure and cholesterol as the products are produced under strictly control to ensure the freshness and meet the world standards of sanitation and hygienic…
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
