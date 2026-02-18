<script setup lang="ts">
interface Highlight {
  id: string
  title: string
  location: string
  year: string
  achievement: string
  image: string
}

const highlights: Highlight[] = [
  {
    id: '1',
    title: 'Seafood Expo Global',
    location: 'Barcelona',
    year: '2024',
    achievement: 'Largest booth presence to date; 500+ qualified leads.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  },
  {
    id: '2',
    title: 'Gulfood',
    location: 'Dubai',
    year: '2024',
    achievement: 'Featured in regional media; new distribution agreements signed.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  },
  {
    id: '3',
    title: 'Anuga',
    location: 'Cologne',
    year: '2024',
    achievement: 'Premium tuna and sardines range highlighted; EU buyers engaged.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  },
]

const currentIndex = ref(0)
const sectionRef = ref<HTMLElement | null>(null)
const slideRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

const goTo = (index: number) => {
  currentIndex.value = ((index % highlights.length) + highlights.length) % highlights.length
}

const next = () => {
  goTo(currentIndex.value + 1)
}

const prev = () => {
  goTo(currentIndex.value - 1)
}

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          gsap.fromTo(sectionRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
        }, sectionRef)
      })
    })
  }
  intervalId = setInterval(next, 6000)
})

onUnmounted(() => {
  gsapCtx?.revert()
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-gray-50 overflow-hidden"
    aria-labelledby="highlights-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="highlights-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight text-center mb-12 lg:mb-16">
        Exhibition Highlights
      </h2>

      <div class="relative max-w-4xl mx-auto">
        <div class="relative rounded-2xl overflow-hidden shadow-card aspect-[16/9] min-h-[280px] bg-gray-200">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition duration-500 ease-in"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-8"
          >
            <div
              :key="highlights[currentIndex]?.id"
              ref="slideRef"
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
              <div class="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 lg:p-12">
                <h3 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">{{ highlights[currentIndex]?.title }}</h3>
                <p class="mt-1 text-ocean-200">{{ highlights[currentIndex]?.location }} · {{ highlights[currentIndex]?.year }}</p>
                <p class="mt-4 text-gray-200 max-w-xl">{{ highlights[currentIndex]?.achievement }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <button
          type="button"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 z-10"
          aria-label="Previous slide"
          @click="prev"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-navy hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 z-10"
          aria-label="Next slide"
          @click="next"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, i) in highlights"
            :key="i"
            type="button"
            class="w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
            :class="i === currentIndex ? 'bg-ocean-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'"
            :aria-label="`Go to slide ${i + 1}`"
            @click="goTo(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
