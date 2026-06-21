<script setup lang="ts">
/**
 * Advanced interactive image gallery with GSAP.
 * Fullscreen overlay, smooth crossfade transitions, infinite loop.
 */

interface Props {
  images: string[]
  title: string
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const overlayRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const viewportRef = ref<HTMLElement | null>(null)
const currentImgRef = ref<HTMLElement | null>(null)
const nextImgRef = ref<HTMLElement | null>(null)

const activeIndex = ref(0)
const isAnimating = ref(false)
const dragStartX = ref(0)
const dragStartIndex = ref(0)
const hasDragged = ref(false)

const DURATION = 1
const EASE = 'power2.inOut'

const len = computed(() => props.images.length || 0)

function wrapIndex(i: number): number {
  if (len.value === 0) return 0
  return ((i % len.value) + len.value) % len.value
}

function goTo(index: number) {
  if (len.value === 0 || isAnimating.value) return
  const next = wrapIndex(index)
  if (next === activeIndex.value) return
  const direction = next > activeIndex.value ? 1 : -1
  isAnimating.value = true
  const prevIdx = activeIndex.value
  nextTick(() => runCrossfade(prevIdx, next, direction))
}

function goNext() {
  goTo(activeIndex.value + 1)
}

function goPrev() {
  goTo(activeIndex.value - 1)
}

function runCrossfade(fromIdx: number, toIdx: number, direction: number) {
  if (!import.meta.client) {
    activeIndex.value = toIdx
    isAnimating.value = false
    return
  }
  import('gsap').then(({ default: gsap }) => {
    const currentEl = currentImgRef.value
    const nextEl = nextImgRef.value
    if (!currentEl || !nextEl) {
      activeIndex.value = toIdx
      isAnimating.value = false
      return
    }

    // Set next image source
    const nextImg = props.images[toIdx]
    const nextImgEl = nextEl.querySelector('img')
    if (nextImgEl) nextImgEl.src = nextImg

    // Position next image (from left or right based on direction)
    const offset = direction > 0 ? 80 : -80
    gsap.set(nextEl, { opacity: 0, x: offset, scale: 0.96 })
    nextEl.style.zIndex = '10'
    currentEl.style.zIndex = '5'

    const tl = gsap.timeline({
      onComplete: () => {
        activeIndex.value = toIdx
        gsap.set(nextEl, { clearProps: 'all' })
        gsap.set(currentEl, { clearProps: 'all' })
        nextEl.style.zIndex = ''
        currentEl.style.zIndex = ''
        isAnimating.value = false
      },
    })

    tl.to(
      currentEl,
      {
        opacity: 0,
        x: -offset,
        scale: 0.96,
        duration: DURATION,
        ease: EASE,
      },
      0
    ).to(
      nextEl,
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: DURATION,
        ease: EASE,
      },
      0
    )
  })
}

function close() {
  if (!import.meta.client) {
    emit('close')
    return
  }
  import('gsap').then(({ default: gsap }) => {
    gsap.to(contentRef.value, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' })
    gsap.to(overlayRef.value, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => emit('close'),
    })
  })
}

watch(
  () => props.isOpen,
  (open) => {
    if (!open) return
    activeIndex.value = 0
    nextTick(() => {
      if (!import.meta.client) return
      import('gsap').then(({ default: gsap }) => {
        gsap.set(overlayRef.value, { opacity: 0 })
        gsap.set(contentRef.value, { opacity: 0, y: 40 })
        gsap.to(overlayRef.value, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        gsap.to(contentRef.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 })
      })
    })
  }
)

function onPointerDown(e: PointerEvent) {
  if (len.value <= 1) return
  dragStartX.value = e.clientX
  dragStartIndex.value = activeIndex.value
  hasDragged.value = false
  viewportRef.value?.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (hasDragged.value) return
  const dx = e.clientX - dragStartX.value
  if (Math.abs(dx) > 80) {
    hasDragged.value = true
    goTo(dragStartIndex.value + (dx > 0 ? -1 : 1))
  }
}

function onPointerUp() {
  hasDragged.value = false
}

function onWheel(e: WheelEvent) {
  if (!props.isOpen || len.value <= 1) return
  e.preventDefault()
  const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY
  if (delta > 0) goNext()
  else if (delta < 0) goPrev()
}

function onKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') goPrev()
  if (e.key === 'ArrowRight') goNext()
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="overlayRef"
      class="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
      :style="{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @wheel.prevent="onWheel"
    >
      <button
        type="button"
        class="absolute top-6 right-6 z-[80] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
        @click="close"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div ref="contentRef" class="relative w-full h-full flex flex-col items-center justify-center px-4 py-20">
        <h2 class="text-xl sm:text-2xl font-semibold text-white mb-8 text-center">
          {{ title }}
        </h2>

        <div
          ref="viewportRef"
          class="relative w-full max-w-5xl h-[50vh] min-h-[280px] max-h-[480px] flex items-center justify-center overflow-hidden touch-none"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
          @pointercancel="onPointerUp"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <!-- Current image layer -->
            <div
              ref="currentImgRef"
              class="absolute flex items-center justify-center w-full h-full"
            >
              <img
                :src="images[activeIndex]"
                :alt="`${title} photo ${activeIndex + 1}`"
                class="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none rounded-xl"
                draggable="false"
                loading="lazy"
              />
            </div>
            <!-- Next image layer (for crossfade) -->
            <div
              ref="nextImgRef"
              class="absolute flex items-center justify-center w-full h-full opacity-0"
            >
              <img
                :src="images[0]"
                alt=""
                class="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none rounded-xl"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
            @click="goPrev"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="text-white/70 text-sm min-w-[4rem] text-center">
            {{ activeIndex + 1 }} / {{ len }}
          </span>
          <button
            type="button"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
            @click="goNext"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div class="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            type="button"
            class="h-14 w-20 rounded-lg overflow-hidden border-2 transition-all shrink-0"
            :class="idx === activeIndex ? 'border-aqua-400 ring-2 ring-aqua-400/50' : 'border-white/30 hover:border-white/50'"
            @click="goTo(idx)"
          >
            <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="h-full w-full object-cover" loading="lazy" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
