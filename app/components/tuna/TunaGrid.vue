<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface TunaProduct {
  title: string;
  description: string;
  packaging: string;
  image: string;
  custom?: boolean;
}

const products = computed<TunaProduct[]>(() => [
  {
    title: t('tuna.collection.sunflowerOil.title'),
    description: t('tuna.collection.sunflowerOil.description'),
    packaging: t('tuna.collection.sunflowerOil.packaging'),
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
  },
  {
    title: t('tuna.collection.oliveOil.title'),
    description: t('tuna.collection.oliveOil.description'),
    packaging: t('tuna.collection.oliveOil.packaging'),
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80",
  },
  {
    title: t('tuna.collection.brine.title'),
    description: t('tuna.collection.brine.description'),
    packaging: t('tuna.collection.brine.packaging'),
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
  },
  {
    title: t('tuna.collection.chunks.title'),
    description: t('tuna.collection.chunks.description'),
    packaging: t('tuna.collection.chunks.packaging'),
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e261b9?w=600&q=80",
  },
  {
    title: t('tuna.collection.flakes.title'),
    description: t('tuna.collection.flakes.description'),
    packaging: t('tuna.collection.flakes.packaging'),
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
  },
  {
    title: t('tuna.collection.custom.title'),
    description: t('tuna.collection.custom.description'),
    packaging: t('tuna.collection.custom.packaging'),
    image: "",
    custom: true,
  },
]);

const sectionRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const subRef = ref<HTMLElement | null>(null);
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
                scrollTrigger: { trigger: sectionRef.value, start: "top 55%" },
              },
            );
          }
          if (subRef.value) {
            gsap.fromTo(
              subRef.value,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1,
                scrollTrigger: { trigger: sectionRef.value, start: "top 55%" },
              },
            );
          }
          if (cardsRef.value) {
            const cards = cardsRef.value.querySelectorAll("[data-tuna-card]");
            gsap.fromTo(
              cards,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                scrollTrigger: { trigger: sectionRef.value, start: "top 58%" },
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
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="collection-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
        <h2
          id="collection-heading"
          ref="headingRef"
          class="text-3xl sm:text-4xl font-bold text-navy tracking-tight"
        >
          {{ $t('tuna.collection.title') }}
        </h2>
        <p ref="subRef" class="mt-4 text-gray-600 leading-relaxed">
          {{ $t('tuna.collection.subtitle') }}
        </p>
      </header>

      <div
        ref="cardsRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <article
          v-for="(product, i) in products"
          :key="product.title"
          data-tuna-card
          class="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
          :class="
            product.custom ? 'bg-navy text-white border-0 lg:col-span-1' : ''
          "
        >
          <div
            v-if="!product.custom"
            class="relative aspect-[4/3] overflow-hidden bg-gray-100"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
          <div
            v-else
            class="relative aspect-[4/3] flex items-center justify-center bg-navy-dark"
          >
            <span class="text-4xl font-bold text-white/20">Custom</span>
          </div>
          <div
            class="p-6 flex flex-col flex-1"
            :class="product.custom ? 'flex-1' : ''"
          >
            <h3
              class="text-xl font-bold tracking-tight"
              :class="product.custom ? 'text-white' : 'text-navy'"
            >
              {{ product.title }}
            </h3>
            <p
              class="mt-2 text-sm leading-relaxed flex-1"
              :class="product.custom ? 'text-gray-300' : 'text-gray-600'"
            >
              {{ product.description }}
            </p>
            <p
              v-if="!product.custom"
              class="mt-3 text-xs font-medium text-ocean-600"
            >
              {{ product.packaging }}
            </p>
            <div class="mt-4">
              <NuxtLink
                v-if="product.custom"
                :to="localePath('/#contact')"
                class="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-aqua-500 text-white font-semibold hover:bg-aqua-600 transition-colors focus:outline-none focus:ring-2 focus:ring-aqua-400 focus:ring-offset-2 focus:ring-offset-navy"
              >
                {{ $t('tuna.collection.custom.button') }}
              </NuxtLink>
              <span
                v-else
                class="inline-flex items-center gap-1 text-sm font-medium text-ocean-600 group-hover:text-ocean-700 transition-colors"
              >
                {{ $t('tuna.collection.custom.details') }}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
