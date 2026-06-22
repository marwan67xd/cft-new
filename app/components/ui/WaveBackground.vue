<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Color theme for the wave layers */
    variant?: 'hero' | 'ocean' | 'light' | 'footer' | 'dark' | 'dark-top' | 'dark-bottom'
    /** Where waves sit inside the parent */
    position?: 'bottom' | 'top' | 'full'
    /** Tailwind height class for the wave container */
    heightClass?: string
  }>(),
  {
    variant: 'hero',
    position: 'bottom',
    heightClass: 'h-28 sm:h-36 lg:h-44',
  },
)

const variantClasses: Record<string, string> = {
  hero: 'wave-bg--hero',
  ocean: 'wave-bg--ocean',
  light: 'wave-bg--light',
  footer: 'wave-bg--footer',
  dark: 'wave-bg--dark',
  'dark-top': 'wave-bg--dark-top',
  'dark-bottom': 'wave-bg--dark-bottom',
}

const positionClasses: Record<string, string> = {
  bottom: 'wave-bg--bottom',
  top: 'wave-bg--top',
  full: 'wave-bg--full',
}

/** Deep slow swell — long ocean rhythm */
const wavePathA =
  'M0,92 C240,52 480,132 720,92 C960,52 1200,132 1440,92 L1440,160 L0,160 Z'

/** Mid-depth layer — offset phase for parallax depth */
const wavePathB =
  'M0,76 C200,116 400,56 600,76 C800,96 1000,56 1200,76 C1320,86 1440,76 1440,76 L1440,160 L0,160 Z'

/** Surface ripples — shorter wavelength, gentle crests */
const wavePathC =
  'M0,108 C150,88 300,128 450,108 C600,88 750,128 900,108 C1050,98 1200,118 1350,108 C1400,103 1440,108 1440,108 L1440,160 L0,160 Z'
</script>

<template>
  <div
    class="wave-bg pointer-events-none select-none"
    :class="[variantClasses[variant], positionClasses[position], heightClass]"
    aria-hidden="true"
  >
    <div class="wave-bg__layer wave-bg__layer--1">
      <div class="wave-bg__track wave-bg__track--1">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path :d="wavePathA" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathA" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="wave-bg__layer wave-bg__layer--2">
      <div class="wave-bg__track wave-bg__track--2">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path :d="wavePathB" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathB" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="wave-bg__layer wave-bg__layer--3">
      <div class="wave-bg__track wave-bg__track--3">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path :d="wavePathC" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathC" fill="currentColor" />
        </svg>
      </div>
    </div>
  </div>
</template>
