<script setup lang="ts">
const { t } = useI18n()

interface FishSpecies {
  species: string
  sauces: string[]
}

interface PackingSpec {
  name: string
  canSize: string
  packingSize: string
  netWeight: string
  loadingQty: string
}

const fishSpecies = computed<FishSpecies[]>(() => [
  {
    species: t('sardinesMackerel.specifications.sardines'),
    sauces: [t('sardinesMackerel.specifications.inTomatoSauce'), t('sardinesMackerel.specifications.inBrine'), t('sardinesMackerel.specifications.inOil')],
  },
  {
    species: t('sardinesMackerel.specifications.mackerel'),
    sauces: [t('sardinesMackerel.specifications.inTomatoSauce'), t('sardinesMackerel.specifications.inBrine'), t('sardinesMackerel.specifications.inOil')],
  },
])

const packingSpecs: PackingSpec[] = [
  { name: 'Jitney Can', canSize: '202 x 308', packingSize: '50 x 155g', netWeight: '93g', loadingQty: '2,000' },
  { name: 'Jitney Can', canSize: '202 x 308', packingSize: '100 x 155g', netWeight: '90g', loadingQty: '1,000' },
  { name: 'Club Can', canSize: '104 x 60 x 29', packingSize: '50 x 125g', netWeight: '90g', loadingQty: '3,200' },
  { name: 'Tall Can', canSize: '300 x 407', packingSize: '24 x 425g', netWeight: '255g', loadingQty: '1,800' },
  { name: 'Oval Can', canSize: '500 x 304 x 103', packingSize: '24 x 215g', netWeight: '130g', loadingQty: '1,800' },
  { name: 'Oval Can', canSize: '605 x 405 x 108', packingSize: '24 x 425g', netWeight: '255g', loadingQty: '1,700' },
  { name: 'Can', canSize: '300 x 203', packingSize: '24 x 190g', netWeight: '120g', loadingQty: '3,600' },
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
            gsap.fromTo(headingRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.value, start: 'top 55%' } })
          }
          if (tablesRef.value) {
            gsap.fromTo(tablesRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: sectionRef.value, start: 'top 58%' } })
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
        class="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-6 text-center"
      >
        {{ $t('sardinesMackerel.specifications.title') }}
      </h2>

      <div ref="tablesRef" class="space-y-12">
        <!-- Fish Species Table -->
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
                      {{ $t('sardinesMackerel.specifications.fishSpecies') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('sardinesMackerel.specifications.kindOfSauce') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(fish, index) in fishSpecies"
                    :key="fish.species"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-semibold text-navy">{{ fish.species }}</div>
                    </td>
                    <td class="px-4 sm:px-6 py-4">
                      <div class="text-sm text-gray-700">
                        {{ fish.sauces.join(', ') }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Packing Specifications Table -->
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
                      {{ $t('sardinesMackerel.specifications.name') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('sardinesMackerel.specifications.cannedSize') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('sardinesMackerel.specifications.packingSize') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('sardinesMackerel.specifications.netWeight') }}
                    </th>
                    <th
                      scope="col"
                      class="px-4 sm:px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                    >
                      {{ $t('sardinesMackerel.specifications.loadingQty') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="(spec, index) in packingSpecs"
                    :key="`${spec.name}-${spec.canSize}-${index}`"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-navy">
                      {{ spec.name }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ spec.canSize }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ spec.packingSize }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ spec.netWeight }}
                    </td>
                    <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ spec.loadingQty }}
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
