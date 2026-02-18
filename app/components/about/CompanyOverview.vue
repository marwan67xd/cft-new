<script setup lang="ts">
import profileImage from '~/assets/profile/ChatGPT Image Feb 18, 2026, 03_59_45 PM.png'

const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const statsRowRef = ref<HTMLElement | null>(null)

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '45+', label: 'Export Countries' },
  { value: '200+', label: 'Team Members' },
]

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(leftRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        gsap.fromTo(rightRef.value, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        if (statsRowRef.value) {
          const children = statsRowRef.value.querySelectorAll('.stat-card')
          gsap.fromTo(children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' } })
        }
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-white"
    aria-labelledby="who-we-are-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref="leftRef">
          <p class="text-aqua-600 font-semibold text-sm tracking-wider uppercase mb-4">
            Who We Are
          </p>
          <h2 id="who-we-are-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight mb-6">
            A Legacy of Excellence in Global Seafood Export
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            Capital Food has been a trusted name in premium seafood for over three decades. We combine traditional expertise with modern food safety and quality systems to deliver products that meet the highest international standards. Our commitment to sustainable sourcing and operational excellence has made us a preferred partner for retailers and distributors worldwide.
          </p>
          <div ref="statsRowRef" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat-card rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4 text-center"
            >
              <span class="block text-2xl sm:text-3xl font-bold text-ocean-600">{{ stat.value }}</span>
              <span class="text-sm font-medium text-gray-600">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div ref="rightRef" class="relative">
          <div class="rounded-2xl overflow-hidden shadow-card-hover bg-ocean-100 aspect-[4/3]">
            <img
              :src="profileImage"
              alt="Seafood processing facility"
              class="w-full h-full object-cover"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
