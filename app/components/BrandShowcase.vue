<script setup lang="ts">
/**
 * Brand Logo Showcase — horizontal auto-scroll, GSAP scroll-in.
 * Logos shown in original colors, no box/border. Pause scroll on hover.
 */

const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const marqueeRef = ref<HTMLElement | null>(null)

const brandPaths = [
  'WhatsApp Image 2026-02-28 at 12.04.29 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.29 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.29 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.31 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.32 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.32 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.35 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.36 AM.jpeg',
]

const brandLogos = computed(() =>
  brandPaths.map((name) => `/brans/${encodeURIComponent(name)}`)
)

// Duplicate for seamless loop
const brandLogosDoubled = computed(() => [...brandLogos.value, ...brandLogos.value])

let gsapCtx: { revert: () => void } | null = null
let scrollTween: { pause: () => void; play: () => void } | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return
  import('gsap').then(({ default: gsap }) => {
    import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)

      gsapCtx = gsap.context(() => {
        const cards = sectionRef.value?.querySelectorAll('[data-brand-card]')
        if (cards?.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 82%',
              },
            }
          )
        }

        // Horizontal auto-scroll (slow, smooth)
        if (trackRef.value) {
          const track = trackRef.value
          const width = track.scrollWidth / 2
          scrollTween = gsap.to(track, {
            x: -width,
            duration: width / 30,
            ease: 'none',
            repeat: -1,
          })
        }
      }, sectionRef.value)
    })
  })
})

function pauseScroll() {
  scrollTween?.pause()
}

function playScroll() {
  scrollTween?.play()
}

onUnmounted(() => {
  gsapCtx?.revert()
  scrollTween = null
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    aria-labelledby="brands-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="brands-heading"
        class="text-2xl sm:text-3xl lg:text-4xl font-bold text-ocean-950 text-center mb-3 tracking-tight"
      >
        {{ $t('home.brands.title') }}
      </h2>
      <p
        class="text-center max-w-2xl mx-auto mb-12 lg:mb-14 text-[#222222]"
        style="opacity: 0.7"
      >
        {{ $t('home.brands.subtitle') }}
      </p>

      <!-- Marquee wrapper: pause on hover -->
      <div
        ref="marqueeRef"
        class="w-full overflow-hidden"
        @mouseenter="pauseScroll"
        @mouseleave="playScroll"
      >
        <div
          ref="trackRef"
          class="flex gap-8 sm:gap-10 lg:gap-12 items-center will-change-transform"
          style="width: max-content;"
        >
          <div
            v-for="(logo, i) in brandLogosDoubled"
            :key="i"
            data-brand-card
            class="flex-shrink-0 flex items-center justify-center px-2"
          >
            <img
              :src="logo"
              :alt="`Brand ${(i % brandLogos.length) + 1}`"
              class="h-20 sm:h-24 lg:h-28 w-auto object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* صور البراندات تظهر بألوانها الأصلية دون أي فلتر */
</style>
