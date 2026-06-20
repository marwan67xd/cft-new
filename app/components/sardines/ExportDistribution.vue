<script setup lang="ts">
const { t } = useI18n()

const regions = computed(() => [
  t('sardinesMackerel.export.northAmerica'),
  t('sardinesMackerel.export.europeUK'),
  t('sardinesMackerel.export.eastAsia'),
  t('sardinesMackerel.export.middleEast'),
])

const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

useSectionMotion(sectionRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="export-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="leftRef">
          <h2 id="export-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            {{ $t('sardinesMackerel.export.title') }}
          </h2>
          <p class="mt-6 text-gray-600 leading-relaxed">
            {{ $t('sardinesMackerel.export.description') }}
          </p>
        </div>
        <div
          ref="mapRef"
          class="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-8 sm:p-10 shadow-card min-h-[220px] flex flex-col justify-center"
          aria-hidden="true"
        >
          <div class="relative rounded-xl bg-ocean-50/50 border border-ocean-100 p-6 sm:p-8 min-h-[180px] flex items-center justify-center">
            <svg
              class="absolute inset-0 w-full h-full opacity-10 text-ocean-600"
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M50 5 L90 25 L50 45 L10 25 Z M30 20 L50 30 L70 20 L50 10 Z"
              />
            </svg>
            <div class="relative grid grid-cols-2 gap-3 sm:gap-4">
              <span
                v-for="r in regions"
                :key="r"
                class="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white border border-ocean-100 text-ocean-800 text-sm font-medium shadow-sm"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-aqua-500 shrink-0" aria-hidden="true" />
                {{ r }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
