<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const products = [
  {
    titleKey: 'products.premiumTuna',
    descKey: 'products.premiumTunaDesc',
    image: '/canned-tuna-product.jpg',
    href: '/tuna',
  },
  {
    titleKey: 'products.qualitySardines',
    descKey: 'products.qualitySardinesDesc',
    image: '/sardines-sea-only.jpg',
    href: '/sardines',
  },
  {
    titleKey: 'products.mackerelFillets',
    descKey: 'products.mackerelFilletsDesc',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    href: '/mackerel',
  },
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
          if (els.length) gsap.fromTo(
            els,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              scrollTrigger: { trigger: sectionRef.value, start: 'top 82%' },
            }
          )
        })
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    id="products"
    class="py-20 sm:py-28 bg-white"
    aria-labelledby="products-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="products-heading" class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4">
        {{ t('products.heading') }}
      </h2>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        {{ t('products.subheading') }}
      </p>

      <div class="grid md:grid-cols-3 gap-8">
        <article
          v-for="(product, i) in products"
          :key="product.titleKey"
          :ref="(el) => setCardRef(el, i)"
          class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="t(product.titleKey)"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-ocean-950 mb-2">{{ t(product.titleKey) }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5">{{ t(product.descKey) }}</p>
            <NuxtLink
              v-if="product.href.startsWith('/')"
              :to="localePath(product.href)"
              class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors group/link"
            >
              {{ t('products.viewDetails') }}
              <span class="transition-transform group-hover/link:translate-x-1">→</span>
            </NuxtLink>
            <a
              v-else
              :href="product.href"
              class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors group/link"
            >
              {{ t('products.viewDetails') }}
              <span class="transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
