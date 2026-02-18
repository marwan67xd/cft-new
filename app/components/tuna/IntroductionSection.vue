<script setup lang="ts">
import tunaImage from '~/assets/tuna/ChatGPT Image Feb 18, 2026, 04_26_05 PM.png'

const sectionRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (imageRef.value) {
            gsap.fromTo(imageRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
          if (contentRef.value) {
            gsap.fromTo(contentRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
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
      <h2 id="intro-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-8 lg:mb-12 text-center">
        TUNA
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="imageRef" class="order-2 lg:order-1">
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              :src="tunaImage"
              alt="Canned Tuna"
              class="w-full h-auto object-cover aspect-[4/3]"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
        <div ref="contentRef" class="order-1 lg:order-2">
          <div class="space-y-6 text-gray-600">
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
    </div>
  </section>
</template>
