<script setup lang="ts">
import tunaImage from '~/assets/home/de362f430d18264bb198efbe58f91583_757x757.png'
import sardinesImage from '~/assets/home/Sardines-on-toast-6.jpg'
import mackerelImage from '~/assets/home/fishmonger-near-me-hot-smoked-mackerel-fillets-1.jpg'

const { t } = useI18n()
const localePath = useLocalePath()

const products = computed(() => [
  {
    title: t('home.products.tunaTitle'),
    desc: t('home.products.tunaDesc'),
    image: tunaImage,
    href: localePath('/tuna'),
  },
  {
    title: t('home.products.sardinesTitle'),
    desc: t('home.products.sardinesDesc'),
    image: sardinesImage,
    href: localePath('/sardines'),
  },
  {
    title: t('home.products.mackerelTitle'),
    desc: t('home.products.mackerelDesc'),
    image: mackerelImage,
    href: localePath('/mackerel'),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: unknown, i: number) {
  if (el) (cardRefs.value as (HTMLElement | null)[])[i] = el as HTMLElement
}

const { run } = useScrollReveal(sectionRef)

run(({ reveal, revealHeader }) => {
  if (!sectionRef.value) return

  revealHeader(headingRef.value, subtitleRef.value, sectionRef.value)

  const cards = cardRefs.value.filter(Boolean)
  if (cards.length) {
    reveal(cards, {
      trigger: sectionRef.value,
      from: { y: 48, opacity: 0, scale: 0.96 },
      duration: 0.92,
      stagger: 0.14,
      delay: 0.15,
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
      <h2
        id="products-heading"
        ref="headingRef"
        class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4"
      >
        {{ $t('home.products.title') }}
      </h2>
      <p ref="subtitleRef" class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        {{ $t('home.products.subtitle') }}
      </p>

      <div class="grid md:grid-cols-3 gap-8">
        <article
          v-for="(product, i) in products"
          :key="product.title"
          :ref="(el) => setCardRef(el, i)"
          class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-ocean-950 mb-2">{{ product.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5">{{ product.desc }}</p>
            <NuxtLink
              v-if="product.href.startsWith('/')"
              :to="product.href"
              class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors group/link"
            >
              {{ $t('home.products.viewDetails') }}
              <span class="transition-transform group-hover/link:translate-x-1">→</span>
            </NuxtLink>
            <a
              v-else
              :href="product.href"
              class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors group/link"
            >
              {{ $t('home.products.viewDetails') }}
              <span class="transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
