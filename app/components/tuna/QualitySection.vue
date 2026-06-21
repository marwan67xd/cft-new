<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (imageRef.value) {
            gsap.fromTo(imageRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
          }
          if (contentRef.value) {
            gsap.fromTo(contentRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
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
    class="py-16 sm:py-20 lg:py-24 bg-gray-50"
    aria-labelledby="quality-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="imageRef" class="order-2 lg:order-1">
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=800&q=80"
              alt="Tuna processing line"
              class="w-full h-auto object-cover aspect-[4/3]"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
        <div ref="contentRef" class="order-1 lg:order-2">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-ocean-600 bg-ocean-100 mb-4">
            Excellence in Sourcing
          </span>
          <h2 id="quality-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Freshness & Quality Control
          </h2>
          <ul class="mt-6 space-y-4 text-gray-600">
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600" aria-hidden="true">✓</span>
              <span>HACCP & ISO certified facilities</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600" aria-hidden="true">✓</span>
              <span>Sustainable pole & line fishing options</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600" aria-hidden="true">✓</span>
              <span>Strict cold-chain integrity</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
