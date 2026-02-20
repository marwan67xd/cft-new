<script setup lang="ts">
import seafoodImage from '~/assets/profile/snack-25-11-63-tuna-olive-oil.jpg'
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(leftRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
        gsap.fromTo(rightRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
      })
    })
  }
})

const highlights = computed(() => [
  { title: t('home.about.sustainableTitle'), desc: t('home.about.sustainableDesc') },
  { title: t('home.about.traceabilityTitle'), desc: t('home.about.traceabilityDesc') },
])
</script>

<template>
  <section
    ref="sectionRef"
    id="quality"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="leftRef" class="relative">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-ocean-100 shadow-card">
            <img
              :src="seafoodImage"
              alt="Premium seafood products - Tuna with olive oil"
              class="w-full h-full object-cover"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
          <div
            class="absolute -bottom-4 left-6 right-6 sm:left-8 sm:right-auto px-5 py-3 rounded-xl bg-white shadow-card border border-gray-100"
          >
            <span class="text-ocean-600 font-semibold">{{ $t('home.about.yearsExcellence') }}</span>
          </div>
        </div>

        <div ref="rightRef">
          <p class="text-aqua-600 font-medium text-sm tracking-wider uppercase mb-4">
            {{ $t('home.about.badge') }}
          </p>
          <h2 id="about-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight mb-6">
            {{ $t('home.about.title') }}
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            {{ $t('home.about.description') }}
          </p>
          <div class="mb-8 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <h3 class="font-semibold text-ocean-900 mb-3">{{ $t('home.about.commitmentTitle') }}</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <span class="text-aqua-600 mt-1">•</span>
                <span>{{ $t('home.about.quality1') }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-aqua-600 mt-1">•</span>
                <span>{{ $t('home.about.quality2') }}</span>
              </li>
            </ul>
          </div>
          <ul class="space-y-4">
            <li
              v-for="h in highlights"
              :key="h.title"
              class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
            >
              <span class="shrink-0 w-10 h-10 rounded-lg bg-aqua-50 flex items-center justify-center text-aqua-600" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <h3 class="font-semibold text-ocean-900">{{ h.title }}</h3>
                <p class="text-sm text-gray-600 mt-0.5">{{ h.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
