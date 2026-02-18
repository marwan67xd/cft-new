<script setup lang="ts">
const packagingItems = [
  { label: "Retail Packs", icon: "retail" },
  { label: "Bulk Industrial", icon: "bulk" },
  { label: "Private Label", icon: "label" },
  { label: "Institutional Packs", icon: "institutional" },
];

const trustItems = [
  { label: "ISO Certified", icon: "iso" },
  { label: "HACCP", icon: "haccp" },
  { label: "EU Standards", icon: "eu" },
  { label: "FDA Registered", icon: "fda" },
];

const sectionRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);

let gsapCtx: { revert: () => void } | null = null;

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapCtx = gsap.context(() => {
          if (cardsRef.value) {
            const cards = cardsRef.value.querySelectorAll("[data-pack-card]");
            gsap.fromTo(
              cards,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                scrollTrigger: { trigger: sectionRef.value, start: "top 82%" },
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
    aria-labelledby="packaging-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Packaging Solutions -->
        <div>
          <h2
            id="packaging-heading"
            class="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-8"
          >
            Packaging Solutions
          </h2>
          <div ref="cardsRef" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="item in packagingItems"
              :key="item.label"
              data-pack-card
              class="rounded-xl bg-white p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
            >
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center text-ocean-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span class="font-semibold text-gray-800">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Trust & Safety -->
        <div>
          <h2
            class="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-8"
          >
            Trust & Safety
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="item in trustItems"
              :key="item.label"
              data-pack-card
              class="rounded-xl bg-white p-6 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
            >
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-aqua-100 flex items-center justify-center text-aqua-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span class="font-semibold text-gray-800">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
