<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const heroRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const breadcrumbRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)

usePageHeroMotion({ heroRef, bgRef, breadcrumbRef, titleRef, subtitleRef })
</script>

<template>
  <section
    ref="heroRef"
    data-motion-handled
    class="page-hero"
    aria-label="Contact"
  >
    <div
      ref="bgRef"
      class="absolute inset-0 about-hero-bg bg-cover bg-center"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy/75 to-navy-dark/90"
      aria-hidden="true"
    />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <nav ref="breadcrumbRef" class="mb-4 sm:mb-6" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-2 text-sm text-gray-300">
          <li>
            <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('contact.hero.breadcrumbHome') }}</NuxtLink>
          </li>
          <li class="text-gray-500" aria-hidden="true">→</li>
          <li class="text-white font-medium" aria-current="page">{{ $t('contact.hero.breadcrumbContact') }}</li>
        </ol>
      </nav>
      <h1
        ref="titleRef"
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl"
      >
        {{ $t('contact.hero.title') }}
      </h1>
      <p
        ref="subtitleRef"
        class="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed"
      >
        {{ $t('contact.hero.subtitle') }}
      </p>
    </div>
  </section>
</template>
