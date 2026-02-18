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
        <h2 id="intro-heading" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-6">
          SARDINES / MACKEREL
        </h2>
        <p
          ref="textRef"
          class="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6"
        >
          Sardines / Mackerel are known as well as in the processing of canned fish.
        </p>
        <p class="text-base sm:text-lg text-gray-600 leading-relaxed">
          Popular product: SARDINES / MACKEREL IN TOMATO SAUCE, SARDINES / MACKEREL IN OIL WITH CHILI. Sardines / Mackerel are known as well as in the processing of canned fish in various sauces such as tomato sauce, oil, or brine. Or dishes such as grilled or smoked. Which sardines nutrition than milk or 3 times with fish of 100 grams of various nutrients like Omega 3 to 200 mg, which is sufficient for the needs of the human body each week. It also contains phosphorus, copper, magnesium alloy, iron, manganese, lycopene and vitamin B
        </p>
      </div>
    </div>
  </section>
</template>
