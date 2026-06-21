<script setup lang="ts">
import tunaImage from '~/assets/tuna/ChatGPT Image Feb 18, 2026, 04_26_05 PM.png'
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (imageRef.value) {
            gsap.fromTo(imageRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
          if (contentRef.value) {
            gsap.fromTo(contentRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
        }, sectionRef)
      })
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-white"
    aria-labelledby="intro-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="intro-heading"
        class="scroll-mt-24 text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-8 lg:mb-12 text-center"
      >
        {{ $t('tuna.introduction.title') }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="imageRef" class="order-2 lg:order-1">
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              :src="tunaImage"
              alt="Canned Tuna"
              class="w-full h-auto object-cover aspect-[4/3]"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
        <div ref="contentRef" class="order-1 lg:order-2">
          <div class="space-y-6 text-gray-600">
            <p class="text-lg sm:text-xl leading-relaxed">
              {{ $t('tuna.introduction.paragraph1') }}
            </p>
            <p class="text-base sm:text-lg leading-relaxed">
              {{ $t('tuna.introduction.paragraph2') }}
            </p>
            <p class="text-base sm:text-lg leading-relaxed">
              {{ $t('tuna.introduction.paragraph3') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
