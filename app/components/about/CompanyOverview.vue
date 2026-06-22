<script setup lang="ts">
import profileImage from '~/assets/profile/ChatGPT Image Feb 18, 2026, 03_59_45 PM.png'
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const statsRowRef = ref<HTMLElement | null>(null)

const stats = computed(() => [
  { value: '12+', label: t('companyProfile.overview.yearsExperience'), number: 12 },
  { value: '65+', label: t('companyProfile.overview.exportCountries'), number: 65 },
  { value: '200+', label: t('companyProfile.overview.teamMembers'), number: 200 },
])

const displayedValues = ref<Record<string, number>>({})

const animateCounter = (label: string, target: number, duration: number = 1.5) => {
  const startValue = 0
  const startTime = Date.now()
  
  const updateCounter = () => {
    const elapsed = (Date.now() - startTime) / 1000
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart)
    
    displayedValues.value[label] = currentValue
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      displayedValues.value[label] = target
    }
  }
  
  updateCounter()
}

// Initialize displayedValues when stats are available
watch(() => stats.value, (newStats) => {
  newStats.forEach(stat => {
    if (!(stat.label in displayedValues.value)) {
      displayedValues.value[stat.label] = 0
    }
  })
}, { immediate: true })

useSectionMotion(sectionRef, {
  setup({ reveal, ScrollTrigger }) {
    let hasAnimated = false

    const startCounterAnimation = () => {
      if (hasAnimated) return
      hasAnimated = true
      stats.value.forEach((stat, index) => {
        setTimeout(() => {
          animateCounter(stat.label, stat.number, 1.5)
        }, index * 150)
      })
    }

    if (leftRef.value) {
      reveal(leftRef.value, {
        trigger: leftRef.value,
        start: SCROLL_REVEAL_START,
        from: getSplitRevealFrom('left'),
        duration: 0.95,
      })
    }
    if (rightRef.value) {
      reveal(rightRef.value, {
        trigger: rightRef.value,
        start: SCROLL_REVEAL_START,
        from: getSplitRevealFrom('right'),
        duration: 0.95,
        delay: 0.08,
      })
    }
    if (statsRowRef.value) {
      const children = statsRowRef.value.querySelectorAll('.stat-card')
      ScrollTrigger.create({
        trigger: sectionRef.value,
        start: SCROLL_REVEAL_START,
        onEnter: startCounterAnimation,
        once: true,
      })
      reveal(children, {
        trigger: sectionRef.value!,
        start: SCROLL_REVEAL_START,
        from: { y: getRevealY(16), opacity: 0 },
        duration: 0.5,
        stagger: 0.12,
      })
    }
  },
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
            {{ $t('companyProfile.overview.badge') }}
          </p>
          <h2 id="who-we-are-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight mb-6">
            {{ $t('companyProfile.overview.title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            {{ $t('companyProfile.overview.description') }}
          </p>
          <div ref="statsRowRef" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat-card rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4 text-center"
            >
              <span class="block text-2xl sm:text-3xl font-bold text-ocean-600">{{ displayedValues[stat.label] }}+</span>
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
