<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const visionRef = ref<HTMLElement | null>(null)
const missionRef = ref<HTMLElement | null>(null)

useSectionMotion(sectionRef, {
  setup({ reveal }) {
    if (visionRef.value) {
      reveal(visionRef.value, {
        trigger: sectionRef.value!,
        from: getSplitRevealFrom('left'),
        duration: 0.95,
      })
    }
    if (missionRef.value) {
      reveal(missionRef.value, {
        trigger: sectionRef.value!,
        from: getSplitRevealFrom('right'),
        duration: 0.95,
        delay: 0.1,
      })
    }
  },
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-0"
    aria-labelledby="mission-vision-heading"
  >
    <div class="grid md:grid-cols-2 min-h-0 md:min-h-[320px] lg:min-h-[360px]">
      <!-- Left: Vision (dark blue) -->
      <div
        ref="visionRef"
        class="flex flex-col justify-center px-8 py-16 sm:px-12 sm:py-20 bg-navy-dark text-white"
      >
        <div class="max-w-lg mx-auto w-full">
          <div
            class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105 hover:bg-white/15"
            aria-hidden="true"
          >
            <svg class="w-6 h-6 text-aqua-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 id="mission-vision-heading" class="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {{ $t('companyProfile.missionVision.visionTitle') }}
          </h2>
          <p class="text-gray-300 leading-relaxed">
            {{ $t('companyProfile.missionVision.visionDesc') }}
          </p>
        </div>
      </div>
      <!-- Right: Mission (teal/aqua) -->
      <div
        ref="missionRef"
        class="flex flex-col justify-center px-8 py-16 sm:px-12 sm:py-20 bg-gradient-to-br from-ocean-600 to-aqua-600 text-white"
      >
        <div class="max-w-lg mx-auto w-full">
          <div
            class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105 hover:bg-white/25"
            aria-hidden="true"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {{ $t('companyProfile.missionVision.missionTitle') }}
          </h2>
          <p class="text-white/95 leading-relaxed">
            {{ $t('companyProfile.missionVision.missionDesc') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
