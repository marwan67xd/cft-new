<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const itemsRef = ref<HTMLElement | null>(null)

const milestones = [
  { year: '2014', title: 'Company Founded' },
  { year: '2016', title: 'Production Expansion' },
  { year: '2019', title: 'Market Growth' },
  { year: '2024', title: 'Continued Development' },
]

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        if (lineRef.value) {
          gsap.fromTo(lineRef.value, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out', transformOrigin: 'left center', scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
        }
        if (itemsRef.value) {
          const dots = itemsRef.value.querySelectorAll('.timeline-dot')
          const labels = itemsRef.value.querySelectorAll('.timeline-label')
          gsap.fromTo(dots, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' } })
          gsap.fromTo(labels, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 0.2, scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' } })
        }
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="journey-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="journey-heading"
        class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center tracking-tight mb-12 sm:mb-16"
      >
        Our Journey
      </h2>
      <div ref="itemsRef" class="relative max-w-4xl mx-auto">
        <!-- Horizontal line -->
        <div
          ref="lineRef"
          class="absolute top-6 left-0 right-0 h-0.5 bg-ocean-200 origin-left hidden sm:block"
          aria-hidden="true"
        />
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 relative">
          <article
            v-for="m in milestones"
            :key="m.year"
            class="flex flex-col items-center text-center"
          >
            <div
              class="timeline-dot w-12 h-12 rounded-full bg-ocean-600 flex items-center justify-center text-white font-bold text-sm shrink-0 relative z-10 mb-4"
            >
              {{ m.year }}
            </div>
            <div class="timeline-label">
              <span class="font-semibold text-ocean-950">{{ m.title }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
