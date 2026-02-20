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

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(leftRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        gsap.fromTo(rightRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        gsap.fromTo(mapRef.value, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
      })
    })
  }
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
