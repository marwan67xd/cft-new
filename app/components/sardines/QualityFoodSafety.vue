<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    label: t('sardinesMackerel.quality.hygienicProcessing.label'),
    badge: t('sardinesMackerel.quality.hygienicProcessing.badge'),
  },
  {
    label: t('sardinesMackerel.quality.internationalCompliance.label'),
    badge: t('sardinesMackerel.quality.internationalCompliance.badge'),
  },
  {
    label: t('sardinesMackerel.quality.qualityInspection.label'),
    badge: t('sardinesMackerel.quality.qualityInspection.badge'),
  },
  {
    label: t('sardinesMackerel.quality.exportReady.label'),
    badge: t('sardinesMackerel.quality.exportReady.badge'),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

useSectionMotion(sectionRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-gray-50"
    aria-labelledby="quality-safety-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="quality-safety-heading"
        ref="headingRef"
        class="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-10 text-center"
      >
        {{ $t('sardinesMackerel.quality.title') }}
      </h2>
      <div
        ref="cardsRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="item in items"
          :key="item.label"
          data-safety-card
          class="rounded-2xl bg-white border border-gray-100 p-6 text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
        >
          <span
            class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-ocean-600 bg-ocean-100 mb-3"
          >
            {{ item.badge }}
          </span>
          <div class="w-12 h-12 rounded-xl bg-aqua-100 flex items-center justify-center text-aqua-600 mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-700 leading-snug">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
