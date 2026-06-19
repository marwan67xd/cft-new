<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { events } = useExhibitions()

const eventCards = computed(() =>
  events.map((event) => ({
    id: event.id,
    name: event.name,
    location: event.location,
    date: event.date,
    description: event.summary,
    image: event.logo ?? event.gallery[0] ?? '',
    gallery: event.gallery,
  }))
)

const isGalleryOpen = ref(false)
const activeGallery = ref<string[]>([])
const activeGalleryTitle = ref('')

function openGallery(card: { name: string; gallery: string[] }) {
  if (!card.gallery?.length) return
  activeGallery.value = card.gallery
  activeGalleryTitle.value = card.name
  isGalleryOpen.value = true
}

function closeGallery() {
  isGalleryOpen.value = false
}

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (headingRef.value) {
            gsap.fromTo(headingRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' } })
          }
          if (cardsRef.value) {
            const cards = cardsRef.value.querySelectorAll('[data-event-card]')
            gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' } })
          }
        }, sectionRef)
      })
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="events-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="events-heading" ref="headingRef" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight text-center mb-4">
        {{ $t('exhibition.events.title') }}
      </h2>
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12 lg:mb-16">
        {{ $t('exhibition.events.subtitle') }}
      </p>

      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="event in eventCards"
          :key="event.id"
          data-event-card
          class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              width="600"
              height="375"
              loading="lazy"
            />
          </div>
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-xl font-bold tracking-tight text-navy">{{ event.name }}</h3>
            <p class="mt-1 text-sm font-medium text-ocean-600">{{ event.location }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ event.date }}</p>
            <p class="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{{ event.description }}</p>
            <!-- Events with gallery: View photos opens gallery slider -->
            <button
              v-if="event.gallery?.length"
              type="button"
              class="mt-4 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-2 border-ocean-600 text-ocean-600 font-medium hover:bg-ocean-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
              @click="openGallery(event)"
            >
              {{ $t('exhibition.events.viewPhotos') }}
            </button>
            <NuxtLink
              v-else
              :to="localePath('/contact')"
              class="mt-4 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-2 border-ocean-600 text-ocean-600 font-medium hover:bg-ocean-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
            >
              {{ $t('exhibition.events.learnMore') }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>

  <ExhibitionGallery
    :images="activeGallery"
    :title="activeGalleryTitle"
    :is-open="isGalleryOpen"
    @close="closeGallery"
  />
</template>
