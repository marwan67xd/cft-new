<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import heroBg from '~/assets/home/home-hero.jpg'

const localePath = useLocalePath()

const sectionRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const descRef = ref<HTMLElement | null>(null)
const btnsRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

const heroSlidesDesktop = [heroBg, '/images/cfi-facility.jpg'] as const
const heroSlidesMobile = [heroBg, '/images/cfi-facility.jpg'] as const
const activeSlide = ref(0)
let slideTimer: number | null = null
let gsapCtx: gsap.Context | null = null

function revealHeroIntroImmediately() {
  const targets = [titleRef.value, descRef.value, btnsRef.value, scrollRef.value].filter(
    (el): el is HTMLElement => el !== null,
  )

  if (targets.length) {
    gsap.set(targets, {
      autoAlpha: 1,
      opacity: 1,
      y: 0,
      clearProps: 'transform',
    })
  }

  if (bgRef.value) {
    gsap.set(bgRef.value, { scale: 1, clearProps: 'transform' })
  }
}

function runHeroIntro() {
  const titleEl = titleRef.value
  const descEl = descRef.value
  const btnsEl = btnsRef.value
  const scrollEl = scrollRef.value

  if (!sectionRef.value || !titleEl || !descEl || !btnsEl || !scrollEl) return

  gsap.set(titleEl, { y: 60, autoAlpha: 0 })
  gsap.set(descEl, { y: 48, autoAlpha: 0 })
  gsap.set(btnsEl, { y: 36, autoAlpha: 0 })
  gsap.set(scrollEl, { y: 20, autoAlpha: 0 })

  if (bgRef.value) {
    gsap.set(bgRef.value, { scale: 1.08, force3D: true })
  }

  gsapCtx?.revert()
  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: HOME_INTRO_EASE, duration: HOME_INTRO_DURATION },
      onComplete: revealHeroIntroImmediately,
    })

    if (bgRef.value) {
      tl.to(bgRef.value, {
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
        force3D: true,
      }, 0)
    }

    tl.fromTo(
      titleEl,
      { y: 60, autoAlpha: 0, immediateRender: true },
      { y: 0, autoAlpha: 1, ease: HOME_INTRO_EASE, duration: HOME_INTRO_DURATION },
    )
      .fromTo(
        descEl,
        { y: 48, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: HOME_INTRO_EASE, duration: HOME_INTRO_DURATION },
        '<0.1',
      )
      .fromTo(
        btnsEl,
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: HOME_INTRO_EASE, duration: HOME_INTRO_DURATION },
        '<0.2',
      )
      .fromTo(
        scrollEl,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: HOME_INTRO_EASE, duration: HOME_INTRO_DURATION },
        '<0.25',
      )
  }, sectionRef)
}

function onIntroStart() {
  runHeroIntro()
}

onMounted(() => {
  if (!import.meta.client) return

  slideTimer = window.setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlidesDesktop.length
  }, 4500)

  if (shouldPlayHomeIntro()) {
    window.addEventListener(HOME_INTRO_START_EVENT, onIntroStart, { once: true })
  } else {
    revealHeroIntroImmediately()
  }
})

onUnmounted(() => {
  window.removeEventListener(HOME_INTRO_START_EVENT, onIntroStart)
  gsapCtx?.revert()
  gsapCtx = null

  if (slideTimer) window.clearInterval(slideTimer)
})
</script>

<template>
  <section
    ref="sectionRef"
    data-motion-handled
    class="relative min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden"
    aria-label="Hero"
  >
    <div ref="bgRef" class="absolute inset-0 z-0" aria-hidden="true">
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

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center translate-y-6 sm:translate-y-8 md:translate-y-12">
      <div class="py-4 px-4 sm:py-5 sm:px-6 max-w-4xl mx-auto inline-block">
        <h1
          ref="titleRef"
          class="hero-title text-[clamp(1.85rem,8.8vw,4.75rem)] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,1)]"
        >
          {{ $t('home.hero.title') }}
        </h1>
        <p
          ref="descRef"
          class="hero-desc mt-5 text-white/90 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t('home.hero.subtitle') }}
        </p>
        <div
          ref="btnsRef"
          class="hero-btns mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
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
        <div ref="scrollRef" class="hero-scroll mt-8 flex justify-center">
          <span class="hero-scroll-hint inline-flex h-10 w-6 items-start justify-center rounded-full border border-white/60 p-1.5">
            <span class="h-2 w-2 rounded-full bg-white/90" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
