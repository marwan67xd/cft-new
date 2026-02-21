<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const heroRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const breadcrumbRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && heroRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (bgRef.value) {
            gsap.to(bgRef.value, {
              y: '15%',
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.value,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            })
          }
          if (breadcrumbRef.value) {
            gsap.fromTo(breadcrumbRef.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
          }
          if (titleRef.value) {
            gsap.fromTo(titleRef.value, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.35 })
          }
          if (subtitleRef.value) {
            gsap.fromTo(subtitleRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55 })
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
    class="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    aria-label="About us"
  >
    <!-- Full-width background: seafood/ocean with dark overlay -->
    <div
      ref="bgRef"
      class="absolute inset-0 about-hero-bg bg-cover bg-center"
      aria-hidden="true"
    >
      <img
        src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=1920&q=80"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-40"
        width="1920"
        height="1080"
        fetchpriority="high"
      />
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/85 to-navy-dark/95"
      aria-hidden="true"
    />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <nav ref="breadcrumbRef" class="mb-6" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2 text-sm text-gray-300">
          <li>
            <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('companyProfile.hero.breadcrumbHome') }}</NuxtLink>
          </li>
          <li class="text-gray-500" aria-hidden="true">→</li>
          <li class="text-white font-medium" aria-current="page">{{ $t('companyProfile.hero.breadcrumbProfile') }}</li>
        </ol>
      </nav>
      <h1
        ref="titleRef"
        class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl"
      >
        {{ $t('companyProfile.hero.title') }}
      </h1>
      <p
        ref="subtitleRef"
        class="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed"
      >
        {{ $t('companyProfile.hero.subtitle') }}
      </p>
    </div>
  </section>
</template>
