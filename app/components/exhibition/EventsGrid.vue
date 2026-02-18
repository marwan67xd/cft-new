<script setup lang="ts">
interface ExhibitionEvent {
  id: string
  name: string
  location: string
  date: string
  year?: string
  description: string
  image: string
  upcoming?: boolean
}

const events: ExhibitionEvent[] = [
  {
    id: '1',
    name: 'Seafood Expo Global',
    location: 'Barcelona, Spain',
    date: 'April 2025',
    description: 'The world’s largest seafood trade event. Meet our team at the Capital Food booth for premium tuna, sardines, and mackerel.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: true,
  },
  {
    id: '2',
    name: 'Gulfood',
    location: 'Dubai, UAE',
    date: 'February 2025',
    description: 'Leading food & beverage exhibition in the Middle East. Connect with us for export opportunities and private label solutions.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: true,
  },
  {
    id: '3',
    name: 'Anuga',
    location: 'Cologne, Germany',
    date: 'October 2024',
    year: '2024',
    description: 'Premier trade fair for food and beverages. We showcased our full range of export-grade seafood products.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: false,
  },
  {
    id: '4',
    name: 'SIAL Paris',
    location: 'Paris, France',
    date: 'October 2024',
    year: '2024',
    description: 'International food products exhibition. Capital Food presented sustainable sourcing and quality certifications.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: false,
  },
  {
    id: '5',
    name: 'Boston Seafood Show',
    location: 'Boston, USA',
    date: 'March 2024',
    year: '2024',
    description: 'North America’s largest seafood event. We met distributors and retailers from across the Americas.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: false,
  },
  {
    id: '6',
    name: 'Seafood Expo Asia',
    location: 'Singapore',
    date: 'September 2024',
    year: '2024',
    description: 'Key Asian seafood trade show. Strengthening partnerships across Asia-Pacific and Oceania.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    upcoming: false,
  },
]

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
        Upcoming & Past Events
      </h2>
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12 lg:mb-16">
        Meet Capital Food at the world’s leading seafood and food trade exhibitions.
      </p>

      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="event in events"
          :key="event.id"
          data-event-card
          class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              width="600"
              height="375"
              loading="lazy"
            />
            <span
              v-if="event.upcoming"
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-aqua-500 text-white"
            >
              Upcoming
            </span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-xl font-bold tracking-tight text-navy">{{ event.name }}</h3>
            <p class="mt-1 text-sm font-medium text-ocean-600">{{ event.location }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ event.date }}</p>
            <p class="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{{ event.description }}</p>
            <NuxtLink
              :to="'/contact'"
              class="mt-4 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-2 border-ocean-600 text-ocean-600 font-medium hover:bg-ocean-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
            >
              Learn More
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
