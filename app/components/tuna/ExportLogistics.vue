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

useSectionMotion(sectionRef, { preset: 'cards' })
;
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
