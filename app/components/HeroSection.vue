<script setup lang="ts">
import heroBg from '~/assets/home/home-hero.png'

const heroRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const localePath = useLocalePath()

const heroSlidesDesktop = [heroBg, '/images/cfi-facility.png'] as const
const heroSlidesMobile = [heroBg, '/images/cfi-facility.png'] as const
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
          if (subtitleRef.value) gsap.fromTo(subtitleRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.55 })
          if (ctaRef.value) gsap.fromTo(ctaRef.value, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7 })
        }, heroRef)
      })
    })

    // Simple auto slideshow
    slideTimer = window.setInterval(() => {
      activeSlide.value = (activeSlide.value + 1) % heroSlidesDesktop.length
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
        v-for="(slide, i) in heroSlidesDesktop"
        :key="`desktop-${slide}`"
        class="hero-slide absolute inset-0 hidden bg-center bg-cover md:block"
        :class="{ 'is-active': i === activeSlide }"
        :style="{ backgroundImage: `url('${slide}')` }"
      />
      <div
        v-for="(slide, i) in heroSlidesMobile"
        :key="`mobile-${slide}`"
        class="hero-slide absolute inset-0 md:hidden"
        :class="{ 'is-active': i === activeSlide }"
        :style="{
          backgroundImage: `url('${slide}')`,
          backgroundSize: 'cover',
          backgroundPosition: i === 0 ? 'center 30%' : 'center center',
        }"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/60" />
      <div class="hero-glow absolute -top-20 -left-20 h-64 w-64 rounded-full bg-aqua-400/20 blur-3xl" />
      <div class="hero-glow hero-glow-delay absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-ocean-300/20 blur-3xl" />
    </div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 sm:mt-6 md:-mt-44 lg:-mt-52">
      <div class="py-4 px-4 sm:py-5 sm:px-6 max-w-4xl mx-auto inline-block">
        <p class="mb-4 text-aqua-200 font-semibold tracking-[0.14em] uppercase text-xs sm:text-sm">
          {{ $t('home.hero.badge') }}
        </p>
        <h1
          ref="headlineRef"
          class="text-[clamp(1.85rem,8.8vw,4.75rem)] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,1)]"
        >
          {{ $t('home.hero.title') }}
        </h1>
        <p
          ref="subtitleRef"
          class="mt-5 text-white/90 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t('home.hero.subtitle') }}
        </p>
        <div ref="ctaRef" class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            :to="localePath('/tuna')"
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-aqua-500 text-ocean-950 font-semibold hover:bg-aqua-400 transition-colors"
          >
            {{ $t('home.hero.exploreProducts') }}
          </NuxtLink>
          <a
            href="/CFI-company-profile.pdf"
            download="CFI-company-profile.pdf"
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/60 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            {{ $t('home.hero.downloadProfile') }}
          </a>
        </div>
        <div class="mt-8 flex justify-center">
          <span class="hero-scroll-hint inline-flex h-10 w-6 items-start justify-center rounded-full border border-white/60 p-1.5">
            <span class="h-2 w-2 rounded-full bg-white/90" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
