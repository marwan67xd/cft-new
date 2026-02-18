<script setup lang="ts">
const events = [
  { name: 'Gulfood 2024', location: 'Dubai', country: 'UAE' },
  { name: 'SIAL Paris', location: 'France', country: 'France' },
  { name: 'FoodEx Japan', location: 'Tokyo', country: 'Japan' },
]

const sectionRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: unknown, i: number) {
  if (el) (cardRefs.value as (HTMLElement | null)[])[i] = el as HTMLElement
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
        Exhibitions
      </h2>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        Meet us at the world's leading food and seafood trade shows.
      </p>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(event, i) in events"
          :key="event.name"
          :ref="(el) => setCardRef(el, i)"
          class="group rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
              :alt="event.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-ocean-950">{{ event.name }} — {{ event.location }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ event.country }}</p>
          </div>
        </article>
      </div>

      <div class="text-center">
        <a
          href="#"
          class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors"
        >
          View All Events
          <span>→</span>
        </a>
      </div>
    </div>
  </section>
</template>
