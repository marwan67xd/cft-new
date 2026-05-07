<script setup lang="ts">
import homeImage from '~/assets/home/ChatGPT Image Feb 18, 2026, 03_51_24 PM.png'
const { t } = useI18n()

const features = computed(() => [
  t('home.whyChoose.premiumQuality'),
  t('home.whyChoose.globalStandards'),
  t('home.whyChoose.reliableSupply'),
  t('home.whyChoose.strategicPartnerships'),
])

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    nextTick(() => {
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          const items = listRef.value?.querySelectorAll('.why-item')
          if (items?.length) {
            gsap.fromTo(
              items,
              { opacity: 0, x: -24 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.12,
                scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' },
              }
            )
          }
          if (imageRef.value) {
            gsap.fromTo(imageRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' } })
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
    class="py-20 sm:py-28 bg-ocean-950 text-white"
    aria-labelledby="why-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref="listRef" class="space-y-6">
          <h2 id="why-heading" class="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            {{ $t('home.whyChoose.title') }}
          </h2>
          <ul class="space-y-4">
            <li
              v-for="f in features"
              :key="f"
              class="why-item flex items-center gap-4"
            >
              <span class="shrink-0 w-10 h-10 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-400" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="text-lg font-medium">{{ f }}</span>
            </li>
          </ul>
        </div>
        <div ref="imageRef" class="relative">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-ocean-900 shadow-2xl">
            <img
              :src="homeImage"
              alt="Premium seafood products"
              class="w-full h-full object-cover"
              width="800"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
