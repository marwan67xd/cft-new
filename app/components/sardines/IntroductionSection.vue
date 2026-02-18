<script setup lang="ts">
const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (textRef.value) {
            gsap.fromTo(textRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 88%' } })
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
    class="py-12 sm:py-16 lg:py-20 bg-white"
    aria-labelledby="intro-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 id="intro-heading" class="sr-only">
          Sardines and mackerel quality and sourcing
        </h2>
        <p
          ref="textRef"
          class="text-lg sm:text-xl text-gray-600 leading-relaxed"
        >
          Our sardines and mackerel are sourced with care and processed to the highest standards. We emphasize freshness, careful processing, and full compliance with global food safety and export requirements.
        </p>
      </div>
    </div>
  </section>
</template>
