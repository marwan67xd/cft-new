<script setup lang="ts">
import tunaImage from '~/assets/profile/snack-25-11-63-tuna-olive-oil.jpg'

const links = [
  {
    title: "Tuna Products",
    href: "/tuna",
    image: tunaImage,
    alt: "Tuna Products",
  },
  {
    title: "Company Profile",
    href: "/company-profile",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=800&q=80",
    alt: "Company Profile",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);

let gsapCtx: { revert: () => void } | null = null;

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapCtx = gsap.context(() => {
          if (headingRef.value) {
            gsap.fromTo(
              headingRef.value,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                scrollTrigger: { trigger: sectionRef.value, start: "top 85%" },
              },
            );
          }
          if (cardsRef.value) {
            const cards = cardsRef.value.querySelectorAll(
              "[data-related-card]",
            );
            gsap.fromTo(
              cards,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.15,
                scrollTrigger: { trigger: sectionRef.value, start: "top 80%" },
              },
            );
          }
        }, sectionRef);
      });
    });
  }
});

onUnmounted(() => {
  gsapCtx?.revert();
});
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
        class="text-center text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4"
      >
        Related Products
      </h2>
      <p class="text-center text-gray-600 max-w-xl mx-auto mb-12 lg:mb-16">
        Explore more of our premium seafood and company profile.
      </p>
      <div
        ref="cardsRef"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.title"
          :to="link.href"
          data-related-card
          class="group relative block rounded-2xl overflow-hidden aspect-[16/9] min-h-[220px] bg-gray-200 shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          <img
            :src="link.image"
            :alt="link.alt"
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
              {{ link.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
