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
          <h2 id="mission-vision-heading" class="text-2xl sm:text-3xl font-bold mb-4">
            {{ $t('companyProfile.missionVision.visionTitle') }}
          </h2>
          <p class="text-gray-300 leading-relaxed">
            {{ $t('companyProfile.missionVision.visionText') }}
          </p>
        </div>
      </div>

      <!-- Right: Mission (light) -->
      <div
        ref="missionRef"
        class="flex flex-col justify-center px-8 py-16 sm:px-12 sm:py-20 bg-gray-50"
      >
        <div class="max-w-lg mx-auto w-full">
          <h2 class="text-2xl sm:text-3xl font-bold text-ocean-950 mb-4">
            {{ $t('companyProfile.missionVision.missionTitle') }}
          </h2>
          <p class="text-gray-600 leading-relaxed">
            {{ $t('companyProfile.missionVision.missionText') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
