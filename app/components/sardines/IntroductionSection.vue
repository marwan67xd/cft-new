<script setup lang="ts">
import image1 from '~/assets/Sardines-Mackerel/70c749a7-9cbc-41f4-8d24-6065601b90a0.png'
import image2 from '~/assets/Sardines-Mackerel/ChatGPT Image Feb 18, 2026, 05_02_14 PM.png'
const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const imagesRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (textRef.value) {
            gsap.fromTo(textRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
          }
          if (imagesRef.value) {
            gsap.fromTo(imagesRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
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
    class="py-12 sm:py-16 lg:py-20 bg-white"
    aria-labelledby="intro-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 id="intro-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-6">
          {{ $t('sardinesMackerel.introduction.title') }}
        </h2>
        <div ref="textRef" class="space-y-4 mb-8">
          <p class="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {{ $t('sardinesMackerel.introduction.paragraph1') }}
          </p>
          <p class="text-base sm:text-lg text-gray-600 leading-relaxed">
            {{ $t('sardinesMackerel.introduction.paragraph2') }}
          </p>
        </div>
        <div ref="imagesRef" class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              :src="image1"
              alt="Sardines and Mackerel"
              class="w-full h-auto object-cover aspect-[4/3]"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              :src="image2"
              alt="Sardines and Mackerel products"
              class="w-full h-auto object-cover aspect-[4/3]"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
