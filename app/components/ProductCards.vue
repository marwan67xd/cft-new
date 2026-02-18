<script setup lang="ts">
const products = [
  {
    title: 'Premium Tuna',
    description: 'High-quality canned tuna produced under strict food industry standards. Ideal for retail and distribution markets.',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
    href: '#',
  },
  {
    title: 'Quality Sardines',
    description: 'Nutritious sardines processed to consistent quality levels for consumer and commercial use.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
    href: '#',
  },
  {
    title: 'Mackerel Fillets',
    description: 'Canned mackerel fillets prepared according to international production norms, offering reliable and versatile supply.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    href: '#',
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
        Product Range
      </h2>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-14">
        Our core offerings meet the highest international standards for quality and safety.
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
            <p class="text-gray-600 text-sm leading-relaxed mb-5">{{ product.description }}</p>
            <a
              :href="product.href"
              class="inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-aqua-600 transition-colors group/link"
            >
              View Details
              <span class="transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
