<script setup lang="ts">
import type { ExhibitionEvent } from '~/composables/useExhibitions'

const { t } = useI18n()
const localePath = useLocalePath()
const { events } = useExhibitions()

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const footerLinkRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: unknown, i: number) {
  if (el) (cardRefs.value as (HTMLElement | null)[])[i] = el as HTMLElement
}

const isGalleryOpen = ref(false)
const activeGallery = ref<string[]>([])
const activeGalleryTitle = ref('')

function openGallery(event: ExhibitionEvent) {
  if (!event.gallery?.length) return
  activeGallery.value = event.gallery
  activeGalleryTitle.value = event.name
  isGalleryOpen.value = true
}

function closeGallery() {
  isGalleryOpen.value = false
}

const { run } = useScrollReveal(sectionRef)

run(({ reveal, revealHeader }) => {
  if (!sectionRef.value) return

  revealHeader(headingRef.value, subtitleRef.value, sectionRef.value)

  const els = cardRefs.value.filter(Boolean)
  if (els.length) {
    reveal(els, {
      trigger: sectionRef.value,
      from: { y: 40, opacity: 0, scale: 0.97 },
      duration: 0.88,
      stagger: 0.1,
      delay: 0.14,
    })
  }

  if (footerLinkRef.value) {
    reveal(footerLinkRef.value, {
      trigger: sectionRef.value,
      from: { y: 20, opacity: 0 },
      duration: 0.8,
      delay: 0.35,
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
      <h2
        id="exhibitions-heading"
        ref="headingRef"
        class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4"
      >
        {{ $t('home.exhibitions.title') }}
      </h2>
      <p ref="subtitleRef" class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        {{ $t('home.exhibitions.subtitle') }}
      </p>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(event, i) in events"
          :key="event.id"
          :ref="(el) => setCardRef(el, i)"
          class="group rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <template v-if="event.gallery?.length">
              <button
                type="button"
                class="grid grid-cols-2 grid-rows-2 w-full h-full"
                :aria-label="`${event.name} — ${$t('exhibition.events.viewPhotos')}`"
                @click="openGallery(event)"
              >
                <img
                  v-for="(img, idx) in event.gallery.slice(0, 4)"
                  :key="idx"
                  :src="img"
                  :alt="`${event.name} photo ${idx + 1}`"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width="300"
                  height="225"
                  loading="lazy"
                />
              </button>
            </template>
            <template v-else-if="event.logo">
              <img
                :src="event.logo"
                :alt="event.name"
                class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                width="400"
                height="300"
                loading="lazy"
              />
            </template>
            <template v-else>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                :alt="event.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width="600"
                height="450"
                loading="lazy"
              />
            </template>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-ocean-950">
              {{ event.name }} — {{ event.location }}
            </h3>
            <p class="text-gray-600 text-sm mt-1">{{ event.country }}</p>
            <p
              v-if="event.date"
              class="text-xs font-medium text-ocean-600 mt-1"
            >
              {{ event.date }}
            </p>
            <p v-if="event.summary" class="text-sm text-gray-600 mt-2">
              {{ event.summary }}
            </p>
            <div class="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                v-if="event.gallery?.length"
                type="button"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-ocean-600 text-white text-sm font-medium hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 transition-colors"
                @click="openGallery(event)"
              >
                {{ $t('exhibition.events.viewPhotos') }}
              </button>
              <NuxtLink
                :to="localePath('/exhibition')"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 transition-colors"
              >
                {{ $t('home.exhibitions.viewAllEvents') }}
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div ref="footerLinkRef" class="text-center">
        <NuxtLink
          :to="localePath('/exhibition')"
          class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors"
        >
          {{ $t('home.exhibitions.viewAllEvents') }}
          <span class="transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </div>
    </div>

    <ExhibitionGallery
      :images="activeGallery"
      :title="activeGalleryTitle"
      :is-open="isGalleryOpen"
      @close="closeGallery"
    />
  </section>
</template>
