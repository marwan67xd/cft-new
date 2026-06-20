<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

const features = computed(() => [
  { label: t('companyProfile.productionExport.sustainableSourcing'), icon: true },
  { label: t('companyProfile.productionExport.advancedColdChain'), icon: true },
  { label: t('companyProfile.productionExport.agileLogistics'), icon: true },
])

const regions = computed(() => [
  t('companyProfile.productionExport.northAmerica'),
  t('companyProfile.productionExport.europeUK'),
  t('companyProfile.productionExport.eastAsia'),
  t('companyProfile.productionExport.middleEast'),
])

useSectionMotion(sectionRef, {
  setup({ reveal }) {
    if (leftRef.value) {
      reveal(leftRef.value, {
        trigger: sectionRef.value!,
        from: getSplitRevealFrom('left'),
        duration: 0.95,
      })
    }
    if (rightRef.value) {
      reveal(rightRef.value, {
        trigger: sectionRef.value!,
        from: getSplitRevealFrom('right'),
        duration: 0.95,
        delay: 0.08,
      })
    }
    if (mapRef.value) {
      reveal(mapRef.value, {
        trigger: sectionRef.value!,
        from: { scale: 0.96, opacity: 0 },
        duration: 0.9,
        delay: 0.14,
      })
    }
  },
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-white"
    aria-labelledby="production-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div ref="leftRef">
          <h2 id="production-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight mb-6">
            {{ $t('companyProfile.productionExport.productionTitle') }}
          </h2>
          <ul class="space-y-4">
            <li
              v-for="f in features"
              :key="f.label"
              class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <span class="shrink-0 w-10 h-10 rounded-lg bg-aqua-50 flex items-center justify-center text-aqua-600" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="font-medium text-gray-800">{{ f.label }}</span>
            </li>
          </ul>
        </div>
        <div ref="rightRef">
          <h2 class="text-2xl sm:text-3xl font-bold text-ocean-950 tracking-tight mb-6">
            {{ $t('companyProfile.productionExport.exportTitle') }}
          </h2>
          <div
            ref="mapRef"
            class="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-8 sm:p-10 shadow-card min-h-[280px] flex flex-col justify-center"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <span
                v-for="r in regions"
                :key="r"
                class="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-ocean-800 font-medium"
              >
                <span class="w-2 h-2 rounded-full bg-aqua-500" aria-hidden="true" />
                {{ r }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
