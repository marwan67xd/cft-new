<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const { t } = useI18n()
const pageRef = ref<HTMLElement | null>(null)
const navbarRef = ref<{ headerRef: HTMLElement | null } | null>(null)
let gsapCtx: gsap.Context | null = null

useHead({
  title: () => t('home.meta.title'),
  meta: [
    { name: 'description', content: () => t('home.meta.description') },
  ],
})

function resolveHeaderEl(): HTMLElement | null {
  return navbarRef.value?.headerRef
    ?? pageRef.value?.querySelector<HTMLElement>('.main-header')
    ?? document.querySelector<HTMLElement>('.main-header')
}

function revealHeaderImmediately() {
  const headerEl = resolveHeaderEl()

  if (headerEl) {
    gsap.set(headerEl, {
      autoAlpha: 1,
      y: 0,
      clearProps: 'transform',
    })
  }
}

function runHeaderIntro() {
  if (!pageRef.value) return

  const headerEl = resolveHeaderEl()
  if (!headerEl) return

  const headerStartY = -headerEl.offsetHeight

  gsap.set(headerEl, {
    y: headerStartY,
    autoAlpha: 0,
    force3D: true,
  })

  dispatchHomeIntroStart()

  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      headerEl,
      { y: headerStartY, autoAlpha: 0, immediateRender: true },
      {
        y: 0,
        autoAlpha: 1,
        ease: HOME_INTRO_EASE,
        duration: HOME_INTRO_DURATION,
        force3D: true,
        onComplete: () => {
          markHomeIntroPlayed()
          revealHeaderImmediately()
        },
      },
    )
  }, pageRef)
}

onMounted(async () => {
  if (!import.meta.client || !pageRef.value) return

  await nextTick()
  await nextTick()

  if (shouldPlayHomeIntro()) {
    runHeaderIntro()
  } else {
    revealHeaderImmediately()
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
  gsapCtx = null
})
</script>

<template>
  <div ref="pageRef" class="min-h-screen bg-white font-sans">
    <Navbar ref="navbarRef" />
    <main>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ProductCards />
      <WhyChooseUs />
      <GlobalMap />
      <BrandShowcase />
      <Exhibitions />
      <CTASection />
      <Footer />
    </main>
  </div>
</template>
