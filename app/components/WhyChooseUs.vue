<script setup lang="ts">
import homeImage from '~/assets/home/ChatGPT Image Feb 18, 2026, 03_51_24 PM.png'
const { t } = useI18n()

const features = computed(() => [
  t('home.whyChoose.premiumQuality'),
  t('home.whyChoose.globalStandards'),
  t('home.whyChoose.reliableSupply'),
  t('home.whyChoose.strategicPartnerships'),
])

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const imageInnerRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  import('gsap').then(({ default: gsap }) => {
    import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)

      gsapCtx = gsap.context(() => {
        const trigger = sectionRef.value!
        const start = SCROLL_REVEAL_START

        if (headingRef.value) {
          gsap.fromTo(
            headingRef.value,
            { opacity: 0, x: -48 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger, start, once: true },
            },
          )
        }

        const items = listRef.value?.querySelectorAll('.why-item')
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, x: -36 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: { trigger, start, once: true },
            },
          )

          gsap.fromTo(
            listRef.value!.querySelectorAll('.why-item-icon'),
            { scale: 0, rotate: -120 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.55,
              stagger: 0.14,
              delay: 0.08,
              ease: 'back.out(2)',
              scrollTrigger: { trigger, start, once: true },
            },
          )
        }

        if (imageRef.value) {
          gsap.fromTo(
            imageRef.value,
            { opacity: 0, x: 60, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger, start, once: true },
            },
          )
        }

        const img = imageInnerRef.value
        if (img) {
          gsap.to(img, {
            y: -10,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      }, sectionRef)
    })
  })
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="why-section relative py-24 sm:py-32 text-white overflow-hidden"
    aria-labelledby="why-heading"
  >
    <div class="ocean-section-bg absolute inset-0" aria-hidden="true" />

    <UiWaveBackground variant="dark" position="full" height-class="h-full" fast />
    <UiWaveBackground variant="dark-top" position="top" height-class="h-16 sm:h-24 lg:h-28" fast />
    <UiWaveBackground variant="dark-bottom" position="bottom" height-class="h-16 sm:h-24 lg:h-28" fast />

    <div class="float-orb float-orb--1" aria-hidden="true" />
    <div class="float-orb float-orb--2" aria-hidden="true" />
    <div class="float-orb float-orb--3" aria-hidden="true" />

    <div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref="listRef" class="space-y-6">
          <div class="why-animate">
            <h2 id="why-heading" ref="headingRef" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              {{ $t('home.whyChoose.title') }}
            </h2>
            <div class="why-heading-line h-1 w-20 rounded-full bg-gradient-to-r from-aqua-400 to-ocean-400" />
          </div>

          <ul class="space-y-3 sm:space-y-4 mt-8">
            <li
              v-for="(f, i) in features"
              :key="f"
              class="why-item why-animate group flex items-center gap-4 rounded-2xl px-4 py-3.5 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-aqua-400/30 hover:shadow-[0_8px_32px_rgba(45,212,191,0.12)] transition-all duration-300"
            >
              <span
                class="why-item-icon shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-aqua-500/30 to-ocean-600/30 flex items-center justify-center text-aqua-300 ring-1 ring-aqua-400/40 group-hover:scale-110 group-hover:ring-aqua-300/60 transition-all duration-300"
                aria-hidden="true"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="flex-1 text-base sm:text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                {{ f }}
              </span>
              <span class="text-aqua-400/40 text-sm font-bold tabular-nums group-hover:text-aqua-300/70 transition-colors">
                0{{ i + 1 }}
              </span>
            </li>
          </ul>
        </div>

        <div ref="imageRef" class="relative why-animate">
          <div class="why-image-glow absolute -inset-4 rounded-3xl bg-gradient-to-br from-aqua-500/30 via-ocean-500/20 to-transparent blur-2xl" aria-hidden="true" />
          <div class="why-image-frame relative p-[2px] rounded-2xl bg-gradient-to-br from-aqua-400/60 via-white/20 to-ocean-500/60">
            <div
              ref="imageInnerRef"
              class="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-ocean-900 shadow-2xl"
            >
              <img
                :src="homeImage"
                alt="Premium seafood products"
                class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                width="800"
                height="600"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ocean-950/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-animate {
  opacity: 0;
}

.why-heading-line {
  animation: whyLineGrow 1.2s ease-out 0.4s both;
}

.why-image-glow {
  animation: whyGlowPulse 4s ease-in-out infinite;
}

.why-image-frame {
  animation: whyFrameShimmer 6s ease-in-out infinite;
}

@keyframes whyLineGrow {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 5rem;
    opacity: 1;
  }
}

@keyframes whyGlowPulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.97);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.03);
  }
}

@keyframes whyFrameShimmer {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .why-animate {
    opacity: 1;
  }

  .why-heading-line,
  .why-image-glow,
  .why-image-frame {
    animation: none;
  }
}
</style>
