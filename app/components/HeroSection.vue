<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const waveRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && heroRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (badgeRef.value) gsap.fromTo(badgeRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
          if (headlineRef.value) gsap.fromTo(headlineRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 })
          if (subRef.value) gsap.fromTo(subRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6 })
          if (ctaRef.value) gsap.fromTo(ctaRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9 })
          if (waveRef.value) {
            gsap.to(waveRef.value, {
              y: -15,
              scaleY: 1.02,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          }
        }, heroRef)
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
    ref="heroRef"
    class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    aria-label="Hero"
  >
    <!-- Ocean background with gradient overlay -->
    <div class="absolute inset-0 hero-ocean-bg" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-ocean-950/80 via-ocean-900/70 to-ocean-950/90"
      aria-hidden="true"
    />
    <!-- Moving tuna fish background -->
    <div
      class="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <!-- Tuna silhouette: torpedo body + lunate forked tail -->
      <svg
        class="absolute left-0 w-24 h-10 fish-swim"
        style="top: 15%; animation-duration: 16s; animation-delay: 0s; color: rgba(255,255,255,0.55);"
        viewBox="0 0 90 36"
        fill="currentColor"
      >
        <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
      </svg>
      <svg
        class="absolute left-0 w-20 h-8 fish-swim"
        style="top: 32%; animation-duration: 20s; animation-delay: 3s; color: rgba(255,255,255,0.5);"
        viewBox="0 0 90 36"
        fill="currentColor"
      >
        <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
      </svg>
      <svg
        class="absolute left-0 w-28 h-11 fish-swim"
        style="top: 52%; animation-duration: 18s; animation-delay: 6s; color: rgba(255,255,255,0.5);"
        viewBox="0 0 90 36"
        fill="currentColor"
      >
        <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
      </svg>
      <svg
        class="absolute left-0 w-22 h-9 fish-swim"
        style="top: 72%; animation-duration: 17s; animation-delay: 2s; color: rgba(255,255,255,0.55);"
        viewBox="0 0 90 36"
        fill="currentColor"
      >
        <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
      </svg>
      <!-- Tuna swimming left to right (flipped) -->
      <div
        class="absolute left-0 w-24 h-10 fish-swim-reverse"
        style="top: 25%; animation-duration: 19s; animation-delay: 4s; color: rgba(255,255,255,0.5);"
      >
        <svg class="w-full h-full scale-x-[-1]" viewBox="0 0 90 36" fill="currentColor">
          <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
        </svg>
      </div>
      <div
        class="absolute left-0 w-20 h-8 fish-swim-reverse"
        style="top: 45%; animation-duration: 21s; animation-delay: 8s; color: rgba(255,255,255,0.5);"
      >
        <svg class="w-full h-full scale-x-[-1]" viewBox="0 0 90 36" fill="currentColor">
          <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
        </svg>
      </div>
      <div
        class="absolute left-0 w-26 h-10 fish-swim-reverse"
        style="top: 65%; animation-duration: 17s; animation-delay: 1s; color: rgba(255,255,255,0.55);"
      >
        <svg class="w-full h-full scale-x-[-1]" viewBox="0 0 90 36" fill="currentColor">
          <path d="M0 18 C8 4 28 4 42 10 L58 14 L72 6 L80 18 L72 30 L58 22 C42 28 28 32 0 18 Z" />
        </svg>
      </div>
    </div>

    <!-- Soft wave / parallax layer -->
    <div
      ref="waveRef"
      class="absolute inset-0 opacity-20 z-[2]"
      aria-hidden="true"
    >
      <svg class="w-full h-full object-cover" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <path
          fill="currentColor"
          class="text-white"
          d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
        />
        <path
          fill="currentColor"
          class="text-white opacity-60"
          d="M0,250 Q300,150 600,250 T1200,250 L1200,400 L0,400 Z"
        />
      </svg>
    </div>

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p
        ref="badgeRef"
        class="inline-block px-4 py-1.5 rounded-full text-aqua-400 text-sm font-medium tracking-wider border border-aqua-500/40 mb-6"
      >
        GLOBAL EXPORT PARTNER
      </p>
      <h1
        ref="headlineRef"
        class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight"
      >
        Capital Food International
      </h1>
      <p
        ref="subRef"
        class="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
      >
        High-quality tuna, sardines, and mackerel prepared to meet international food standards.
      </p>
      <div
        ref="ctaRef"
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="#products"
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-aqua-500 text-white font-medium hover:bg-aqua-600 transition-colors focus:outline-none focus:ring-2 focus:ring-aqua-400 focus:ring-offset-2 focus:ring-offset-ocean-900"
        >
          Explore Products
        </a>
        <a
          href="#"
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/60 text-white font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ocean-900"
        >
          Download Profile
        </a>
      </div>
    </div>
  </section>
</template>
