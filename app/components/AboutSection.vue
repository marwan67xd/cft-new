<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(leftRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
        gsap.fromTo(rightRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
      })
    })
  }
})

const highlights = [
  { title: 'Sustainable practices', desc: 'Responsible sourcing and eco-friendly operations.' },
  { title: 'Traceable sourcing', desc: 'Full supply chain transparency from ocean to table.' },
]
</script>

<template>
  <section
    ref="sectionRef"
    id="quality"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="leftRef" class="relative">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-ocean-100 shadow-card">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80"
              alt="Seafood processing facility"
              class="w-full h-full object-cover"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
          <div
            class="absolute -bottom-4 left-6 right-6 sm:left-8 sm:right-auto px-5 py-3 rounded-xl bg-white shadow-card border border-gray-100"
          >
            <span class="text-ocean-600 font-semibold">25+ Years Excellence</span>
          </div>
        </div>

        <div ref="rightRef">
          <p class="text-aqua-600 font-medium text-sm tracking-wider uppercase mb-4">
            About Us
          </p>
          <h2 id="about-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 tracking-tight mb-6">
            Excellence in Seafood Supply
          </h2>
          <p class="text-gray-600 leading-relaxed mb-8">
            For over two decades we have been committed to delivering premium seafood to tables across the globe. Our dedication to quality, international standards, and reliable sourcing has made us a trusted partner for retailers and distributors worldwide.
          </p>
          <ul class="space-y-4">
            <li
              v-for="h in highlights"
              :key="h.title"
              class="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
            >
              <span class="shrink-0 w-10 h-10 rounded-lg bg-aqua-50 flex items-center justify-center text-aqua-600" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <h3 class="font-semibold text-ocean-900">{{ h.title }}</h3>
                <p class="text-sm text-gray-600 mt-0.5">{{ h.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
