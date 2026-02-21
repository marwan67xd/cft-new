<script setup lang="ts">
import heroBg1 from '~/assets/home/ChatGPT Image Feb 21, 2026, 01_25_45 AM.png'
import heroBg2 from '~/assets/home/8b39e93f-c5e8-43d1-a4bf-b405de8e001d.jpeg'

const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

const bgImages = [heroBg1, heroBg2]
const activeBg = ref(0)
let bgTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (import.meta.client && heroRef.value) {
    bgTimer = window.setInterval(() => {
      activeBg.value = (activeBg.value + 1) % bgImages.length
    }, 4500)

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (headlineRef.value) gsap.fromTo(headlineRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 })
        }, heroRef)
      })
    })
  }
})

onUnmounted(() => {
  if (bgTimer) window.clearInterval(bgTimer)
  bgTimer = null
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    aria-label="Hero"
  >
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <div
        v-for="(src, i) in bgImages"
        :key="src"
        class="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
        :class="activeBg === i ? 'opacity-100' : 'opacity-0'"
        :style="{ backgroundImage: `url('${src}')` }"
      />
    </div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="rounded-xl py-4 px-4 sm:py-5 sm:px-5 max-w-4xl mx-auto inline-block">
        <h1
          ref="headlineRef"
          class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight"
        >
          {{ $t('home.hero.title') }}
        </h1>
      </div>
    </div>
  </section>
</template>
