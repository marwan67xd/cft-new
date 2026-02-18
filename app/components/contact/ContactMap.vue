<script setup lang="ts">
const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.988674319!2d-122.4194156846815!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1234567890'
const mapLink = 'https://www.google.com/maps'

const sectionRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (mapRef.value) {
            gsap.fromTo(mapRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
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
    aria-labelledby="map-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-ocean-600 bg-ocean-100 mb-4">
          Location
        </span>
        <h2 id="map-heading" class="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Our Headquarters
        </h2>
        <p class="mt-3 text-gray-600 leading-relaxed">
          Find us on the map or get directions. We welcome visits by appointment.
        </p>
      </header>

      <div
        ref="mapRef"
        class="rounded-2xl overflow-hidden shadow-card border border-gray-100 aspect-[16/9] min-h-[280px] bg-gray-100 max-w-5xl mx-auto"
      >
        <iframe
          :src="mapUrl"
          title="Capital Food headquarters location"
          class="w-full h-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <p class="mt-4 text-center text-sm text-gray-500">
        <a :href="mapLink" target="_blank" rel="noopener noreferrer" class="text-ocean-600 hover:text-ocean-700 font-medium underline">
          Open in Google Maps
        </a>
      </p>
    </div>
  </section>
</template>
