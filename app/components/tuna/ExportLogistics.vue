<script setup lang="ts">
const { t } = useI18n()

const bullets = computed(() => [
  t('tuna.export.countries'),
  t('tuna.export.trackedShipments'),
  t('tuna.export.fullExportDocs'),
  t('tuna.export.coldChain'),
]);

const sectionRef = ref<HTMLElement | null>(null);
const leftRef = ref<HTMLElement | null>(null);
const rightRef = ref<HTMLElement | null>(null);

let gsapCtx: { revert: () => void } | null = null;

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapCtx = gsap.context(() => {
          if (leftRef.value) {
            gsap.fromTo(
              leftRef.value,
              { opacity: 0, x: -24 },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
                scrollTrigger: { trigger: sectionRef.value, start: "top 82%" },
              },
            );
          }
          if (rightRef.value) {
            gsap.fromTo(
              rightRef.value,
              { opacity: 0, x: 24 },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
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
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="export-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <div ref="leftRef">
          <h2
            id="export-heading"
            class="text-3xl sm:text-4xl font-bold text-navy tracking-tight"
          >
            {{ $t('tuna.export.title') }}
          </h2>
          <p class="mt-6 text-gray-600 leading-relaxed">
            {{ $t('tuna.export.description') }}
          </p>
          <ul class="mt-8 space-y-4">
            <li
              v-for="bullet in bullets"
              :key="bullet"
              class="flex items-center gap-3 text-gray-700 font-medium"
            >
              <span
                class="flex-shrink-0 w-6 h-6 rounded-full bg-aqua-500/20 flex items-center justify-center text-aqua-600 text-sm"
                aria-hidden="true"
                >✓</span
              >
              {{ bullet }}
            </li>
          </ul>
        </div>
        <div ref="rightRef">
          <div class="rounded-2xl overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80"
              alt="Cargo ship for global export"
              class="w-full h-auto object-cover aspect-[4/3]"
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
