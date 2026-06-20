<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const itemsRef = ref<HTMLElement | null>(null)

const milestones = computed(() => [
  { year: '2014', title: t('companyProfile.timeline.founded') },
  { year: '2016', title: t('companyProfile.timeline.expansion') },
  { year: '2019', title: t('companyProfile.timeline.growth') },
  { year: '2024', title: t('companyProfile.timeline.development') },
])

useSectionMotion(sectionRef, {
  setup({ reveal, gsap }) {
    if (lineRef.value) {
      gsap.fromTo(lineRef.value, {
        scaleX: 0,
        force3D: true,
      }, {
        scaleX: 1,
        duration: 1.1,
        ease: SCROLL_REVEAL_EASE,
        transformOrigin: 'left center',
        force3D: true,
        scrollTrigger: { trigger: sectionRef.value, start: SCROLL_REVEAL_START, once: true },
      })
    }
    if (itemsRef.value) {
      const dots = itemsRef.value.querySelectorAll('.timeline-dot')
      const labels = itemsRef.value.querySelectorAll('.timeline-label')
      reveal(dots, {
        trigger: sectionRef.value!,
        from: { scale: 0, opacity: 0 },
        duration: 0.7,
        stagger: 0.15,
        start: SCROLL_REVEAL_START,
      })
      reveal(labels, {
        trigger: sectionRef.value!,
        from: { y: 16, opacity: 0 },
        duration: 0.75,
        stagger: 0.15,
        delay: 0.2,
        start: SCROLL_REVEAL_START,
      })
    }
  },
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
        {{ $t('companyProfile.timeline.title') }}
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
