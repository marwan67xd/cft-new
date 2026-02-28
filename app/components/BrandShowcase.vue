<script setup lang="ts">
/**
 * Brand Logo Showcase — horizontal auto-scroll, GSAP scroll-in.
 * Logos shown in original colors, no box/border. Pause on hover. Drag with mouse.
 */

const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const marqueeRef = ref<HTMLElement | null>(null)

// Mouse drag state
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartScrollX = ref(0)

const brandPaths = [
  'WhatsApp Image 2026-02-28 at 12.04.29 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.29 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.29 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.30 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.31 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.31 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.31 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.31 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.32 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.32 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.33 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.34 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.35 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.35 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.35 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.36 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.36 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.36 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.36 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.37 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.37 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.38 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.38 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.38 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.38 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.39 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.39 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.39 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.39 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.40 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.40 AM (1).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.40 AM (2).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.40 AM (3).jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.41 AM.jpeg',
  'WhatsApp Image 2026-02-28 at 12.04.41 AM (1).jpeg',
]
// 43 صورة فريدة؛ تُعرض مكررة مرتين (86 عنصر) في الشريط لحركة حلقة سلسة

const brandLogos = computed(() =>
  brandPaths.map((name) => `/brans/${encodeURIComponent(name)}`)
)

// Duplicate for seamless loop
const brandLogosDoubled = computed(() => [...brandLogos.value, ...brandLogos.value])

let gsapCtx: { revert: () => void } | null = null
let scrollTween: { pause: () => void; play: () => void } | null = null
let gsapLib: { getProperty: (t: Element, p: string) => number; set: (t: Element, v: object) => void } | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return
  import('gsap').then(({ default: gsap }) => {
    gsapLib = gsap
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

        // Horizontal auto-scroll: يمر على 43 صورة ثم يعيد من البداية (حلقة سلسة)
        if (trackRef.value) {
          const track = trackRef.value
          const halfWidth = track.scrollWidth / 2
          scrollTween = gsap.to(track, {
            x: -halfWidth,
            duration: halfWidth / 30,
            ease: 'none',
            repeat: -1,
            onRepeat: () => gsap.set(track, { x: 0 }),
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

function onDragStart(e: MouseEvent) {
  if (!trackRef.value) return
  isDragging.value = true
  dragStartX.value = e.clientX
  if (gsapLib) {
    dragStartScrollX.value = gsapLib.getProperty(trackRef.value, 'x') as number
  } else {
    const style = getComputedStyle(trackRef.value)
    const m = style.transform.match(/matrix\(.*,\s*([-\d.]+)\s*\)/)
    dragStartScrollX.value = m ? parseFloat(m[1]) : 0
  }
  pauseScroll()
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value || !trackRef.value || !gsapLib) return
  const deltaX = e.clientX - dragStartX.value
  let newX = dragStartScrollX.value + deltaX
  const halfWidth = trackRef.value.scrollWidth / 2
  if (newX > 0) newX = 0
  if (newX < -halfWidth * 2) newX = -halfWidth * 2
  gsapLib.set(trackRef.value, { x: newX })
}

function onDragEnd() {
  if (!isDragging.value || !trackRef.value || !gsapLib) return
  isDragging.value = false
  const currentX = gsapLib.getProperty(trackRef.value, 'x') as number
  const halfWidth = trackRef.value.scrollWidth / 2
  const normalizedX = Math.max(-halfWidth, Math.min(0, ((currentX % halfWidth) + halfWidth) % halfWidth - halfWidth))
  scrollTween?.kill?.()
  import('gsap').then(({ default: gsap }) => {
    gsapLib?.set(trackRef.value!, { x: normalizedX })
    scrollTween = gsap.to(trackRef.value, {
      x: -halfWidth,
      duration: (halfWidth + normalizedX) / 30,
      ease: 'none',
      repeat: -1,
      onRepeat: () => gsap.set(trackRef.value, { x: 0 }),
    })
  })
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
  }
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

      <!-- Marquee wrapper: pause on hover, drag with mouse -->
      <div
        ref="marqueeRef"
        class="w-full overflow-hidden select-none"
        :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
        @mouseenter="pauseScroll"
        @mouseleave="() => { if (!isDragging.value) playScroll() }"
        @mousedown="onDragStart"
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
              class="brand-strip-img h-20 sm:h-24 lg:h-28 w-auto object-contain rounded-xl"
              loading="lazy"
              draggable="false"
              @dragstart.prevent
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* صور البراندات تظهر بألوانها الأصلية دون أي فلتر */
/* منع سحب الصور في المتصفح حتى يعمل سحب الشريط عند الضغط على الصور */
.brand-strip-img {
  -webkit-user-drag: none;
  user-drag: none;
  pointer-events: none;
}
</style>
