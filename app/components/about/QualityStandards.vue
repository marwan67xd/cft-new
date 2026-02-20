<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const badgesRef = ref<HTMLElement | null>(null)

const certs = ['ISO 22000', 'HACCP', 'GMP', 'FDA']

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(leftRef.value, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        gsap.fromTo(rightRef.value, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' } })
        if (badgesRef.value) {
          const badges = badgesRef.value.querySelectorAll('.cert-badge')
          gsap.fromTo(badges, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' } })
        }
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-20 sm:py-28 bg-ocean-950 text-white"
    aria-labelledby="quality-standards-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div ref="leftRef">
          <h2 id="quality-standards-heading" class="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            {{ $t('companyProfile.qualityStandards.title') }}
          </h2>
          <p class="text-gray-300 leading-relaxed mb-8">
            {{ $t('companyProfile.qualityStandards.description') }}
          </p>
          <div ref="badgesRef" class="flex flex-wrap gap-4">
            <span
              v-for="c in certs"
              :key="c"
              class="cert-badge inline-flex items-center px-5 py-2.5 rounded-xl bg-white/10 text-sm font-semibold border border-white/20"
            >
              {{ c }}
            </span>
          </div>
        </div>
        <div ref="rightRef" class="relative">
          <div class="rounded-2xl overflow-hidden bg-ocean-800 aspect-[4/3] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80"
              alt="Packaged seafood product"
              class="w-full h-full object-cover"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
          <div
            class="absolute -bottom-4 left-6 right-6 sm:left-8 px-5 py-3 rounded-xl bg-aqua-500 text-white font-semibold text-sm shadow-lg text-center"
          >
            {{ $t('companyProfile.qualityStandards.traceability') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
