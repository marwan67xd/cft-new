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

const wavePathA =
  'M0,64 C360,20 720,108 1080,64 C1260,42 1380,52 1440,64 L1440,120 L0,120 Z'
const wavePathB =
  'M0,48 C320,96 640,16 960,48 C1120,64 1280,56 1440,48 L1440,120 L0,120 Z'
const wavePathC =
  'M0,72 C240,32 480,88 720,72 C960,56 1200,32 1440,72 L1440,120 L0,120 Z'
</script>

<template>
  <div
    class="wave-bg pointer-events-none select-none"
    :class="[variantClasses[variant], positionClasses[position], heightClass]"
    aria-hidden="true"
  >
    <div class="wave-bg__layer wave-bg__layer--1">
      <div class="wave-bg__track wave-bg__track--1">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path :d="wavePathA" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathA" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="wave-bg__layer wave-bg__layer--2">
      <div class="wave-bg__track wave-bg__track--2">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path :d="wavePathB" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathB" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="wave-bg__layer wave-bg__layer--3">
      <div class="wave-bg__track wave-bg__track--3">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path :d="wavePathC" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path :d="wavePathC" fill="currentColor" />
        </svg>
      </div>
    </div>
  </div>
</template>
