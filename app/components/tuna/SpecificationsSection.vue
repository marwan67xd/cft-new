<script setup lang="ts">
const { t } = useI18n()

interface TunaSpecies {
  species: string
  meatType: string
  oils: string[]
  packTypes: string[]
}

interface PackingSize {
  packingSize: string
  netWeight: string
  drainedWeight: string
  loadingQty: string
}

const tunaSpecies: TunaSpecies[] = [
  {
    species: 'Tongol Tuna',
    meatType: t('tuna.specifications.whiteMeat'),
    oils: ['Olive Oil', 'Sunflower oil', 'Soya bean oil', 'Brine'],
    packTypes: ['Solid', 'Chunk', 'Flakes', 'Shedded'],
  },
  {
    species: 'Yellowfin Tuna',
    meatType: t('tuna.specifications.whiteMeat'),
    oils: ['Olive Oil', 'Sunflower oil', 'Soya bean oil', 'Brine'],
    packTypes: ['Solid', 'Chunk', 'Flakes', 'Shedded'],
  },
  {
    species: 'Skipjack Tuna',
    meatType: t('tuna.specifications.lightMeat'),
    oils: ['Olive Oil', 'Sunflower oil', 'Soya bean oil', 'Brine'],
    packTypes: ['Solid', 'Chunk', 'Flakes', 'Shedded'],
  },
  {
    species: 'Bonito Tuna',
    meatType: t('tuna.specifications.whiteMeat'),
    oils: ['Olive Oil', 'Sunflower oil', 'Soya bean oil', 'Brine'],
    packTypes: ['Solid', 'Chunk', 'Flakes', 'Shedded'],
  },
]

const packingSizes: PackingSize[] = [
  { packingSize: '48 x 80g', netWeight: '80g', drainedWeight: '56g', loadingQty: '3,400' },
  { packingSize: '48 x 95g', netWeight: '95g', drainedWeight: '67g', loadingQty: '3,400' },
  { packingSize: '48 x 140g', netWeight: '140g', drainedWeight: '98g', loadingQty: '2,200' },
  { packingSize: '48 x 150g', netWeight: '150g', drainedWeight: '105g', loadingQty: '2,200' },
  { packingSize: '48 x 160g', netWeight: '160g', drainedWeight: '112g', loadingQty: '2,200' },
  { packingSize: '48 x 170g', netWeight: '170g', drainedWeight: '120g', loadingQty: '1,800' },
  { packingSize: '48 x 185g', netWeight: '185g', drainedWeight: '130g', loadingQty: '1,800' },
  { packingSize: '48 x 200g', netWeight: '200g', drainedWeight: '140g', loadingQty: '1,750' },
  { packingSize: '24 x 400g', netWeight: '400g', drainedWeight: '280g', loadingQty: '1,800' },
  { packingSize: '12 x 1000g', netWeight: '1000g', drainedWeight: '700g', loadingQty: '1,350' },
  { packingSize: '6 x 1850g', netWeight: '1850g', drainedWeight: '1350g', loadingQty: '1,700' },
]

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const tablesRef = ref<HTMLElement | null>(null)

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
          if (tablesRef.value) {
            gsap.fromTo(tablesRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } })
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
    aria-labelledby="specifications-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        id="specifications-heading"
        ref="headingRef"
        class="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-12 lg:mb-16 text-center"
      >
        {{ $t('tuna.specifications.title') }}
      </h2>

      <div ref="tablesRef" class="space-y-12">
        <!-- Tuna Species Table -->
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-navy">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.tunaSpecies') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.oilBrine') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.packIn') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(species, index) in tunaSpecies"
                    :key="species.species"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-semibold text-navy">{{ species.species }}</div>
                      <div class="text-xs text-gray-500">({{ species.meatType }})</div>
                    </td>
                    <td class="px-4 sm:px-6 py-4">
                      <div class="text-sm text-gray-700">
                        {{ species.oils.join(', ') }}
                      </div>
                    </td>
                    <td class="px-4 sm:px-6 py-4">
                      <div class="text-sm text-gray-700">
                        {{ species.packTypes.join(', ') }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Packing Sizes Table -->
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-navy">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.packingSize') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.netWeight') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.drainedWeight') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('tuna.specifications.loadingQty') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(size, index) in packingSizes"
                    :key="size.packingSize"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-navy">
                      {{ size.packingSize }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ size.netWeight }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ size.drainedWeight }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ size.loadingQty }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
