<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface ExhibitionCard {
  name: string
  location: string
  country: string
  date?: string
  summary?: string
  gallery?: string[]
}

const gulfoodGallery: string[] = [
  '/images/gulfood-1.jpeg',
  '/images/gulfood-2.jpeg',
  '/images/gulfood-3.jpeg',
  '/images/gulfood-4.jpeg',
]

const saudiFoodGallery: string[] = [
  '/images/saudi-1.jpeg',
  '/images/saudi-2.jpeg',
  '/images/saudi-3.jpeg',
  '/images/saudi-4.jpeg',
]

const turkeyGallery: string[] = [
  '/images/turkey-1.jpeg',
  '/images/turkey-2.jpeg',
  '/images/turkey-3.jpeg',
  '/images/turkey-4.jpeg',
]

const events: ExhibitionCard[] = [
  {
    name: 'Gulfood',
    location: 'Dubai',
    country: 'UAE',
    date: '2026',
    summary: 'Capital Food International participated in Gulfood Dubai 2026, connecting with global partners.',
    gallery: gulfoodGallery,
  },
  {
    name: 'The Saudi Food Show',
    location: 'Riyadh',
    country: 'Saudi Arabia',
    date: '2026',
    summary: 'Capital Food International participated in The Saudi Food Show in Riyadh 2026, presenting our premium canned seafood products.',
    gallery: saudiFoodGallery,
  },
  {
    name: 'TÜYAP Fair Center',
    location: 'Istanbul, Turkey',
    country: 'Turkey',
    date: '2026',
    summary: 'Capital Food International participated at TÜYAP Fair Center in Istanbul 2026, showcasing our canned tuna and seafood range.',
    gallery: turkeyGallery,
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: unknown, i: number) {
  if (el) (cardRefs.value as (HTMLElement | null)[])[i] = el as HTMLElement
}

const isGalleryOpen = ref(false)
const activeGallery = ref<string[]>([])
const activeGalleryTitle = ref('')
const activeImageIndex = ref(0)

function openGallery(event: ExhibitionCard) {
  if (!event.gallery || !event.gallery.length) return
  activeGallery.value = event.gallery
  activeGalleryTitle.value = event.name
  activeImageIndex.value = 0
  isGalleryOpen.value = true
}

function closeGallery() {
  isGalleryOpen.value = false
}

function showNextImage() {
  const gallery = activeGallery.value
  if (!gallery.length) return
  activeImageIndex.value = (activeImageIndex.value + 1) % gallery.length
}

function showPrevImage() {
  const gallery = activeGallery.value
  if (!gallery.length) return
  activeImageIndex.value = (activeImageIndex.value - 1 + gallery.length) % gallery.length
}

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    nextTick(() => {
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          const els = cardRefs.value.filter(Boolean)
          if (els.length) {
            gsap.fromTo(
              els,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' },
              }
            )
          }
        })
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    id="exhibitions"
    class="py-20 sm:py-28 bg-white"
    aria-labelledby="exhibitions-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="exhibitions-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4">
        {{ $t('home.exhibitions.title') }}
      </h2>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        {{ $t('home.exhibitions.subtitle') }}
      </p>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(event, i) in events"
          :key="event.name"
          :ref="(el) => setCardRef(el, i)"
          class="group rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <template v-if="event.gallery?.length">
              <div class="grid grid-cols-2 grid-rows-2 w-full h-full">
                <img
                  v-for="(img, idx) in event.gallery"
                  :key="idx"
                  :src="img"
                  :alt="`${event.name} photo ${idx + 1}`"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width="300"
                  height="225"
                  loading="lazy"
                />
              </div>
            </template>
            <template v-else>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                :alt="event.name"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width="600"
                height="450"
                loading="lazy"
              />
            </template>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-ocean-950">{{ event.name }} — {{ event.location }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ event.country }}</p>
            <p v-if="event.date" class="text-xs font-medium text-ocean-600 mt-1">
              {{ event.date }}
            </p>
            <p v-if="event.summary" class="text-sm text-gray-600 mt-2">
              {{ event.summary }}
            </p>
            <button
              v-if="event.gallery?.length"
              type="button"
              class="mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-ocean-600 text-white text-sm font-medium hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
              @click="openGallery(event)"
            >
              View photos
            </button>
          </div>
        </article>
      </div>

      <div class="text-center">
        <NuxtLink
          :to="localePath('/exhibition')"
          class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors"
        >
          {{ $t('home.exhibitions.viewAllEvents') }}
          <span>→</span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="isGalleryOpen"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <button
          type="button"
          class="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
          aria-label="Close gallery"
          @click="closeGallery"
        >
          ✕
        </button>

        <div class="relative bg-black">
          <div class="aspect-[16/9] w-full">
            <img
              v-if="activeGallery.length"
              :src="activeGallery[activeImageIndex]"
              :alt="`${activeGalleryTitle} photo ${activeImageIndex + 1}`"
              class="w-full h-full object-contain bg-black"
              loading="lazy"
            />

            <button
              type="button"
              class="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 hover:bg-white"
              aria-label="Previous image"
              @click="showPrevImage"
            >
              ‹
            </button>
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 hover:bg-white"
              aria-label="Next image"
              @click="showNextImage"
            >
              ›
            </button>
          </div>
        </div>

        <div class="bg-gray-900 px-4 py-3 border-t border-gray-800">
          <h3 class="text-white font-semibold text-sm sm:text-base">
            {{ activeGalleryTitle }}
          </h3>
          <div class="mt-3 flex justify-center gap-2">
            <button
              v-for="(img, idx) in activeGallery"
              :key="idx"
              type="button"
              class="h-12 w-16 rounded-md overflow-hidden border transition-all"
              :class="idx === activeImageIndex ? 'border-aqua-400 ring-2 ring-aqua-400' : 'border-transparent opacity-70 hover:opacity-100'"
              @click="activeImageIndex = idx"
            >
              <img :src="img" :alt="`${activeGalleryTitle} thumbnail ${idx + 1}`" class="h-full w-full object-cover" loading="lazy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
