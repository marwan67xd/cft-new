<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  { label: t('home.trustBar.internationalQuality'), icon: 'certificate' },
  { label: t('home.trustBar.exportReady'), icon: 'ship' },
  { label: t('home.trustBar.premiumSelection'), icon: 'star' },
  { label: t('home.trustBar.foodSafety'), icon: 'shield' },
])

const sectionRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

function setItemRef(el: unknown, i: number) {
  if (el) (itemRefs.value as (HTMLElement | null)[])[i] = el as HTMLElement
}

const { run } = useScrollReveal(sectionRef)

run(({ revealWhenCentered }) => {
  const els = itemRefs.value.filter(Boolean)
  if (!sectionRef.value || !els.length) return

  revealWhenCentered(els, {
    from: { y: 32, opacity: 0, scale: 0.96 },
    duration: 0.85,
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 bg-white border-b border-gray-100"
    aria-label="Trust indicators"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <li
          v-for="(item, i) in items"
          :key="item.label"
          :ref="(el) => setItemRef(el, i)"
          class="flex flex-col items-center text-center group"
        >
          <div
            class="w-14 h-14 rounded-xl bg-ocean-50 flex items-center justify-center text-ocean-600 mb-4 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-card"
            aria-hidden="true"
          >
            <svg
              v-if="item.icon === 'certificate'"
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <svg
              v-else-if="item.icon === 'ship'"
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0v-4m0 4h18m-9 0v-4m0 4v-4m0 4H3" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14l-2-8H7l-2 8z" />
            </svg>
            <svg
              v-else-if="item.icon === 'star'"
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg
              v-else
              class="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span class="text-gray-700 font-medium">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
