<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

const values = computed(() => [
  {
    title: t('companyProfile.coreValues.qualityExcellence.title'),
    desc: t('companyProfile.coreValues.qualityExcellence.desc'),
    icon: 'quality',
  },
  {
    title: t('companyProfile.coreValues.integrity.title'),
    desc: t('companyProfile.coreValues.integrity.desc'),
    icon: 'integrity',
  },
  {
    title: t('companyProfile.coreValues.foodSafety.title'),
    desc: t('companyProfile.coreValues.foodSafety.desc'),
    icon: 'safety',
  },
  {
    title: t('companyProfile.coreValues.customerPartnership.title'),
    desc: t('companyProfile.coreValues.customerPartnership.desc'),
    icon: 'partnership',
  },
  {
    title: t('companyProfile.coreValues.continuousImprovement.title'),
    desc: t('companyProfile.coreValues.continuousImprovement.desc'),
    icon: 'improvement',
  },
])

useSectionMotion(sectionRef, {
  preset: 'cards',
  headingRef: titleRef,
  cardsContainerRef: cardsRef,
  cardsSelector: '.value-card',
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="core-values-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        ref="titleRef"
        id="core-values-heading"
        class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center tracking-tight mb-12 sm:mb-16"
      >
        {{ $t('companyProfile.coreValues.title') }}
      </h2>
      <div
        ref="cardsRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8"
      >
        <article
          v-for="v in values"
          :key="v.title"
          class="value-card group rounded-2xl bg-white border border-gray-100 p-6 sm:p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div
            class="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center text-ocean-600 mb-5 transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <svg v-if="v.icon === 'quality'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <svg v-else-if="v.icon === 'integrity'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg v-else-if="v.icon === 'safety'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <svg v-else-if="v.icon === 'partnership'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-ocean-950 mb-2">{{ v.title }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{{ v.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
