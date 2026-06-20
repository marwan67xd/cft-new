<script setup lang="ts">
const { t } = useI18n()
const { events } = useExhibitions()

const highlights = computed(() =>
  events.map((event) => ({
    id: event.id,
    title: event.name,
    location: event.location.includes(event.country) ? event.location : `${event.location}, ${event.country}`,
    year: event.date,
    achievement: event.summary,
    image: event.gallery[1] ?? event.gallery[0] ?? '',
  })),
)

const currentIndex = ref(0)
const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const slideViewportRef = ref<HTMLElement | null>(null)
const currentSlideRef = ref<HTMLElement | null>(null)
const nextSlideRef = ref<HTMLElement | null>(null)

const isAnimating = ref(false)
const touchStartX = ref(0)
const touchDeltaX = ref(0)
const prefersReducedMotion = ref(false)

let intervalId: ReturnType<typeof setInterval> | null = null

const SLIDE_DURATION = 0.85
const SLIDE_EASE = 'power3.inOut'

function wrapIndex(index: number): number {
  const len = highlights.value.length || 1
  return ((index % len) + len) % len
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function startAutoplay() {
  stopAutoplay()
  if (prefersReducedMotion.value || highlights.value.length <= 1) return
  intervalId = setInterval(() => goTo(currentIndex.value + 1), 6000)
}

function runSlideTransition(toIndex: number, direction: number) {
  if (!import.meta.client || isAnimating.value) return

  const fromIndex = currentIndex.value
  if (toIndex === fromIndex) return

  if (prefersReducedMotion.value) {
    currentIndex.value = toIndex
    return
  }

  void import('gsap').then(({ default: gsap }) => {
    const currentEl = currentSlideRef.value
    const nextEl = nextSlideRef.value
    if (!currentEl || !nextEl) {
      currentIndex.value = toIndex
      return
    }

    isAnimating.value = true
    const offset = direction > 0 ? 72 : -72

    const nextImg = nextEl.querySelector('img')
    if (nextImg) nextImg.src = highlights.value[toIndex]?.image ?? ''

    gsap.set(nextEl, { autoAlpha: 0, x: offset, scale: 0.97, force3D: true })
    nextEl.style.zIndex = '10'
    currentEl.style.zIndex = '5'

    gsap.timeline({
      onComplete: () => {
        currentIndex.value = toIndex
        gsap.set(nextEl, { clearProps: 'all' })
        gsap.set(currentEl, { clearProps: 'all' })
        nextEl.style.zIndex = ''
        currentEl.style.zIndex = ''
        isAnimating.value = false
      },
    })
      .to(currentEl, {
        autoAlpha: 0,
        x: -offset,
        scale: 0.97,
        duration: SLIDE_DURATION,
        ease: SLIDE_EASE,
        force3D: true,
      }, 0)
      .to(nextEl, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: SLIDE_DURATION,
        ease: SLIDE_EASE,
        force3D: true,
      }, 0)
  })
}

function goTo(index: number) {
  const next = wrapIndex(index)
  if (next === currentIndex.value) return
  const direction = next > currentIndex.value ? 1 : -1
  runSlideTransition(next, direction)
}

const next = () => goTo(currentIndex.value + 1)
const prev = () => goTo(currentIndex.value - 1)

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0]?.clientX ?? 0
  touchDeltaX.value = 0
  stopAutoplay()
}

function onTouchMove(e: TouchEvent) {
  const x = e.touches[0]?.clientX ?? 0
  touchDeltaX.value = x - touchStartX.value
}

function onTouchEnd() {
  if (Math.abs(touchDeltaX.value) > 48) {
    if (touchDeltaX.value < 0) next()
    else prev()
  }
  startAutoplay()
}

useSectionMotion(sectionRef, {
  headingRef,
})

onMounted(() => {
  if (!import.meta.client) return
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startAutoplay()
})

watch(highlights, () => {
  currentIndex.value = 0
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-gray-50 overflow-hidden"
    aria-labelledby="highlights-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="highlights-heading"
        ref="headingRef"
        class="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tracking-tight text-center mb-10 sm:mb-12 lg:mb-16"
      >
        {{ $t('exhibition.highlights.title') }}
      </h2>

      <div class="relative max-w-4xl mx-auto">
        <div
          v-if="highlights.length"
          ref="slideViewportRef"
          class="relative rounded-2xl overflow-hidden shadow-card aspect-[16/9] min-h-[220px] sm:min-h-[280px] bg-gray-200 touch-pan-y"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
        >
          <div
            ref="currentSlideRef"
            class="absolute inset-0"
          >
            <img
              :src="highlights[currentIndex]?.image"
              :alt="highlights[currentIndex]?.title"
              class="absolute inset-0 w-full h-full object-cover"
              width="1200"
              height="675"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy/60 to-transparent" />
            <div class="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {{ highlights[currentIndex]?.title }}
              </h3>
              <p class="mt-1 text-sm sm:text-base text-ocean-200">
                {{ highlights[currentIndex]?.location }} · {{ highlights[currentIndex]?.year }}
              </p>
              <p class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-200 max-w-xl line-clamp-3 sm:line-clamp-none">
                {{ highlights[currentIndex]?.achievement }}
              </p>
            </div>
          </div>

          <div
            ref="nextSlideRef"
            class="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <img
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
              width="1200"
              height="675"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy/60 to-transparent" />
          </div>
        </div>
        <div v-else class="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          {{ $t('common.loading') }}
        </div>

        <button
          v-if="highlights.length > 1"
          type="button"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 z-10"
          :aria-label="$t('exhibition.highlights.previousSlide')"
          @click="prev"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="highlights.length > 1"
          type="button"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 z-10"
          :aria-label="$t('exhibition.highlights.nextSlide')"
          @click="next"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-if="highlights.length > 1" class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, i) in highlights"
            :key="i"
            type="button"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
            :class="i === currentIndex ? 'bg-ocean-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'"
            :aria-label="`${$t('exhibition.highlights.goToSlide')} ${i + 1}`"
            @click="goTo(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
