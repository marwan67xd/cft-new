<script setup lang="ts">
import heroBg from '~/assets/home/home-hero.png'

const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)

const heroSlides = [heroBg, '/images/cfi-facility.png'] as const
const activeSlide = ref(0)
let slideTimer: number | null = null

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && heroRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (headlineRef.value) gsap.fromTo(headlineRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 })
        }, heroRef)
      })
    })

    // Simple auto slideshow
    slideTimer = window.setInterval(() => {
      activeSlide.value = (activeSlide.value + 1) % heroSlides.length
    }, 4500)
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
  if (slideTimer) window.clearInterval(slideTimer)
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden"
    aria-label="Hero"
  >
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <div
        v-for="(slide, i) in heroSlides"
        :key="slide"
        class="hero-slide absolute inset-0 bg-center bg-cover"
        :class="{ 'is-active': i === activeSlide }"
        :style="{ backgroundImage: `url('${slide}')` }"
      />
      <div class="absolute inset-0 bg-black/40" />
    </div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-36 md:-mt-44 lg:-mt-52">
      <div class="py-4 px-4 sm:py-5 sm:px-6 max-w-4xl mx-auto inline-block">
        <h1
          ref="headlineRef"
          class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,1)]"
        >
          {{ $t('home.hero.title') }}
        </h1>
      </div>
    </div>
  </section>
</template>
