<script setup lang="ts">
interface Product {
  title: string
  description: string
  packaging: string
  image: string
  category: 'sardines' | 'mackerel'
}

const sardinesOptions: Product[] = [
  {
    title: 'Sardines in Tomato Sauce',
    description: 'Classic sardines in rich tomato sauce. Ideal for snacks, sandwiches, and Mediterranean dishes.',
    packaging: '48x125g, 24x425g',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
    category: 'sardines',
  },
  {
    title: 'Sardines in Sunflower Oil',
    description: 'Premium sardines in refined sunflower oil. Mild flavor, versatile for salads and cooking.',
    packaging: '48x125g, 24x185g, 12x425g',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
    category: 'sardines',
  },
  {
    title: 'Sardines in Olive Oil',
    description: 'Select sardines in extra virgin olive oil. Rich taste for gourmet and health-conscious markets.',
    packaging: '48x125g, 24x185g, 12x425g',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80',
    category: 'sardines',
  },
  {
    title: 'Sardines in Brine',
    description: 'Light sardines in natural brine. Low fat, high protein—perfect for dietary and retail.',
    packaging: '48x125g, 24x185g',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
    category: 'sardines',
  },
]

const mackerelOptions: Product[] = [
  {
    title: 'Mackerel in Tomato Sauce',
    description: 'Firm mackerel in tomato sauce. Popular format for retail and food service across regions.',
    packaging: '24x425g, 12x1kg',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80',
    category: 'mackerel',
  },
  {
    title: 'Mackerel in Oil',
    description: 'Mackerel in sunflower or olive oil. Rich in Omega-3, suitable for salads and hot dishes.',
    packaging: '24x185g, 12x425g',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80',
    category: 'mackerel',
  },
  {
    title: 'Mackerel Fillets',
    description: 'Skinless, boneless mackerel fillets. Premium option for retail and food service.',
    packaging: '24x125g, 12x425g',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80',
    category: 'mackerel',
  },
  {
    title: 'Mackerel in Brine',
    description: 'Light mackerel in natural brine. High protein, low fat—ideal for health-focused consumers.',
    packaging: '24x185g, 12x425g',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80',
    category: 'mackerel',
  },
]

const products = [...sardinesOptions, ...mackerelOptions]

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)

let gsapCtx: { revert: () => void } | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        gsapCtx = gsap.context(() => {
          if (headingRef.value) {
            gsap.fromTo(headingRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' } })
          }
          const cards = sectionRef.value?.querySelectorAll('[data-product-card]')
          if (cards?.length) {
            gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' } })
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
    aria-labelledby="products-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="products-heading" ref="headingRef" class="text-3xl sm:text-4xl font-bold text-navy tracking-tight text-center mb-12 lg:mb-16">
        Product Variants
      </h2>

      <div class="mb-12">
        <h3 class="text-xl sm:text-2xl font-bold text-ocean-700 mb-6">Sardines Options</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <article
            v-for="product in sardinesOptions"
            :key="product.title"
            data-product-card
            class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width="600"
                height="450"
                loading="lazy"
              />
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h4 class="text-lg font-bold tracking-tight text-navy">{{ product.title }}</h4>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{{ product.description }}</p>
              <p class="mt-3 text-xs font-medium text-ocean-600">{{ product.packaging }}</p>
              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-2 border-ocean-600 text-ocean-600 font-medium hover:bg-ocean-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
              >
                Request Details
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>

      <div>
        <h3 class="text-xl sm:text-2xl font-bold text-ocean-700 mb-6">Mackerel Options</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <article
            v-for="product in mackerelOptions"
            :key="product.title"
            data-product-card
            class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width="600"
                height="450"
                loading="lazy"
              />
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h4 class="text-lg font-bold tracking-tight text-navy">{{ product.title }}</h4>
              <p class="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{{ product.description }}</p>
              <p class="mt-3 text-xs font-medium text-ocean-600">{{ product.packaging }}</p>
              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-2 border-ocean-600 text-ocean-600 font-medium hover:bg-ocean-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
              >
                Request Details
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
