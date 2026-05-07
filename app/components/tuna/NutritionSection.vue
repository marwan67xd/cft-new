<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  { label: t('tuna.nutrition.highProtein'), icon: "protein" },
  { label: t('tuna.nutrition.richOmega3'), icon: "omega" },
  { label: t('tuna.nutrition.globalCuisine'), icon: "cuisine" },
  { label: t('tuna.nutrition.pureHealthy'), icon: "pure" },
]);

const sectionRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const iconsRef = ref<HTMLElement | null>(null);

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
          if (iconsRef.value) {
            const icons = iconsRef.value.querySelectorAll(
              "[data-nutrition-item]",
            );
            gsap.fromTo(
              icons,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
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
    class="py-16 sm:py-20 lg:py-24 bg-navy text-white"
    aria-labelledby="nutrition-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="nutrition-heading"
        ref="headingRef"
        class="text-center text-3xl sm:text-4xl font-bold tracking-tight mb-12 lg:mb-16"
      >
        {{ $t('tuna.nutrition.title') }}
      </h2>
      <div
        ref="iconsRef"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="item in items"
          :key="item.label"
          data-nutrition-item
          class="rounded-2xl bg-navy-light/50 backdrop-blur p-6 text-center border border-white/10 hover:border-aqua-500/30 transition-colors"
        >
          <div
            class="w-14 h-14 rounded-xl bg-aqua-500/20 flex items-center justify-center text-aqua-400 mx-auto mb-4"
          >
            <svg
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <span class="font-semibold text-white">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
