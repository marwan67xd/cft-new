<script setup lang="ts">
const categories = [
  {
    title: "Sardines",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    alt: "Sardines",
  },
  {
    title: "Mackerel",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=800&q=80",
    alt: "Mackerel",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);

useSectionMotion(sectionRef, { preset: 'cards' })
;
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-gray-50"
    aria-labelledby="related-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="related-heading"
        ref="headingRef"
        class="text-center text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-12 lg:mb-16"
      >
        Explore Other Categories
      </h2>
      <div
        ref="cardsRef"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        <NuxtLink
          v-for="cat in categories"
          :key="cat.title"
          :to="cat.href"
          data-related-card
          class="group relative block rounded-2xl overflow-hidden aspect-[16/9] min-h-[220px] bg-gray-200 shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          <img
            :src="cat.image"
            :alt="cat.alt"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width="800"
            height="450"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-transparent"
          />
          <div class="absolute inset-0 flex items-end p-8">
            <h3
              class="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            >
              {{ cat.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
