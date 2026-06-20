<script setup lang="ts">
const { t } = useI18n()

const regionKeys = [
  { nameKey: 'exhibition.presence.regions.0.name', countKey: 'exhibition.presence.regions.0.count' },
  { nameKey: 'exhibition.presence.regions.1.name', countKey: 'exhibition.presence.regions.1.count' },
  { nameKey: 'exhibition.presence.regions.2.name', countKey: 'exhibition.presence.regions.2.count' },
  { nameKey: 'exhibition.presence.regions.3.name', countKey: 'exhibition.presence.regions.3.count' },
  { nameKey: 'exhibition.presence.regions.4.name', countKey: 'exhibition.presence.regions.4.count' },
]

const regions = computed<Array<{ name: string; count: string }>>(() =>
  regionKeys.map(({ nameKey, countKey }) => ({
    name: t(nameKey),
    count: t(countKey),
  }))
)

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

useSectionMotion(sectionRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="presence-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="presence-heading"
        ref="headingRef"
        class="text-3xl sm:text-4xl font-bold text-navy tracking-tight text-center mb-12 lg:mb-16"
      >
        {{ $t('exhibition.presence.title') }}
      </h2>
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        {{ $t('exhibition.presence.subtitle') }}
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
          ref="mapRef"
          class="relative rounded-2xl overflow-hidden bg-ocean-50 border border-ocean-100 p-8 sm:p-10 lg:p-12 min-h-[320px] flex items-center justify-center"
          aria-hidden="true"
        >
          <div class="absolute inset-0 flex items-center justify-center opacity-10">
            <svg
              class="w-full h-full max-w-md max-h-64 text-ocean-600"
              viewBox="0 0 200 100"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M100 10 L180 50 L100 90 L20 50 Z" />
              <path d="M100 30 L150 50 L100 70 L50 50 Z" />
              <circle cx="100" cy="50" r="8" fill="currentColor" />
              <circle cx="50" cy="30" r="4" fill="currentColor" />
              <circle cx="150" cy="30" r="4" fill="currentColor" />
              <circle cx="50" cy="70" r="4" fill="currentColor" />
              <circle cx="150" cy="70" r="4" fill="currentColor" />
            </svg>
          </div>
          <p class="relative text-ocean-800 font-semibold text-center text-lg">
            {{ $t('exhibition.presence.globalParticipation') }}
          </p>
        </div>

        <ul ref="listRef" class="space-y-4">
          <li
            v-for="region in regions"
            :key="region.name"
            data-region
            class="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-ocean-200 hover:shadow-card transition-all duration-300 group"
          >
            <span class="flex items-center gap-3">
              <span class="w-3 h-3 rounded-full bg-aqua-500 shrink-0 group-hover:scale-125 transition-transform" aria-hidden="true" />
              <span class="font-semibold text-navy">{{ region.name }}</span>
            </span>
            <span class="text-sm font-medium text-ocean-600">{{ region.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
