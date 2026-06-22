<script setup lang="ts">
type ViewMode = 'map' | 'globe'

type MarketLocation = {
  country: string
  city: string
  latitude: number
  longitude: number
}

type AmChartsWindow = Window & {
  am5?: any
  am5map?: any
  am5geodata_worldLow?: any
  am5themes_Animated?: any
  __amChartsReadyPromise__?: Promise<void>
}

const { t, te } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const mapHostRef = ref<HTMLElement | null>(null)
const viewMode = ref<ViewMode>('map')
const mapError = ref('')
const scriptsReady = ref(false)
const { reveal } = useScrollReveal()

const AMCHARTS_SCRIPTS = [
  { key: 'amcharts5-index', src: 'https://cdn.amcharts.com/lib/5/index.js' },
  { key: 'amcharts5-map', src: 'https://cdn.amcharts.com/lib/5/map.js' },
  { key: 'amcharts5-world-low', src: 'https://cdn.amcharts.com/lib/5/geodata/worldLow.js' },
  { key: 'amcharts5-animated-theme', src: 'https://cdn.amcharts.com/lib/5/themes/Animated.js' },
] as const

const ORIGIN: MarketLocation = {
  country: 'Malaysia',
  city: 'Kuala Lumpur',
  latitude: 3.139,
  longitude: 101.6869,
}

const DESTINATIONS: MarketLocation[] = [
  { country: 'Japan', city: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { country: 'Myanmar', city: 'Naypyidaw', latitude: 19.7633, longitude: 96.0785 },
  { country: 'Singapore', city: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { country: 'UAE', city: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773 },
  { country: 'Qatar', city: 'Doha', latitude: 25.2854, longitude: 51.531 },
  { country: 'Saudi Arabia', city: 'Riyadh', latitude: 24.7136, longitude: 46.6753 },
  { country: 'Bahrain', city: 'Manama', latitude: 26.2285, longitude: 50.586 },
  { country: 'Syria', city: 'Damascus', latitude: 33.5138, longitude: 36.2765 },
  { country: 'Egypt', city: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
  { country: 'Libya', city: 'Tripoli', latitude: 32.8872, longitude: 13.1913 },
  { country: 'Algeria', city: 'Algiers', latitude: 36.7538, longitude: 3.0588 },
  { country: 'Mali', city: 'Bamako', latitude: 12.6392, longitude: -8.0029 },
  { country: 'Ukraine', city: 'Kyiv', latitude: 50.4501, longitude: 30.5234 },
  { country: 'Serbia', city: 'Belgrade', latitude: 44.7866, longitude: 20.4489 },
  { country: 'Kosovo', city: 'Pristina', latitude: 42.6629, longitude: 21.1655 },
  { country: 'Austria', city: 'Vienna', latitude: 48.2082, longitude: 16.3738 },
  { country: 'Germany', city: 'Berlin', latitude: 52.52, longitude: 13.405 },
  { country: 'Albania', city: 'Tirana', latitude: 41.3275, longitude: 19.8187 },
  { country: 'New Zealand', city: 'Wellington', latitude: -41.2865, longitude: 174.7762 },
] as const

const sectionTitle = computed(() =>
  te('home.global.title')
    ? t('home.global.title')
    : 'Active in International Markets',
)

const sectionSubtitle = computed(() =>
  te('home.global.subtitle')
    ? t('home.global.subtitle')
    : 'Supplying canned tuna, sardines, and mackerel to distribution partners across regional and international markets.',
)

const sectionFootnote = computed(() =>
  te('home.global.tooltip')
    ? t('home.global.tooltip')
    : 'Originating in Kuala Lumpur with 19 active destination markets.',
)

useHead({
  script: AMCHARTS_SCRIPTS.map(script => ({
    key: script.key,
    src: script.src,
    defer: true,
    tagPosition: 'head',
  })),
})

let chartRoot: any | null = null
let componentDisposed = false

function toggleViewMode() {
  viewMode.value = viewMode.value === 'map' ? 'globe' : 'map'
}

function disposeChart() {
  chartRoot?.dispose()
  chartRoot = null
}

function toRadians(value: number) {
  return (value * Math.PI) / 180
}

function getDistanceKm(origin: MarketLocation, destination: MarketLocation) {
  const earthRadiusKm = 6371
  const latitudeDelta = toRadians(destination.latitude - origin.latitude)
  const longitudeDelta = toRadians(destination.longitude - origin.longitude)
  const startLatitude = toRadians(origin.latitude)
  const endLatitude = toRadians(destination.latitude)

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2

  return earthRadiusKm * (2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)))
}

function getRouteDuration(destination: MarketLocation) {
  const distanceKm = getDistanceKm(ORIGIN, destination)
  return Math.round(Math.max(1800, Math.min(5200, distanceKm * 0.24 + 1100)))
}

async function waitForAmCharts() {
  if (!import.meta.client) return

  const amChartsWindow = window as AmChartsWindow
  if (
    amChartsWindow.am5 &&
    amChartsWindow.am5map &&
    amChartsWindow.am5geodata_worldLow &&
    amChartsWindow.am5themes_Animated
  ) {
    return
  }

  if (!amChartsWindow.__amChartsReadyPromise__) {
    amChartsWindow.__amChartsReadyPromise__ = new Promise((resolve, reject) => {
      let attempts = 0
      const maxAttempts = 180

      const poll = () => {
        if (
          amChartsWindow.am5 &&
          amChartsWindow.am5map &&
          amChartsWindow.am5geodata_worldLow &&
          amChartsWindow.am5themes_Animated
        ) {
          resolve()
          return
        }

        attempts += 1
        if (attempts >= maxAttempts) {
          reject(new Error('amCharts 5 CDN assets did not finish loading in time.'))
          return
        }

        window.setTimeout(poll, 100)
      }

      poll()
    })
  }

  await amChartsWindow.__amChartsReadyPromise__
}

function initializeMap() {
  if (!import.meta.client || !mapHostRef.value) return

  const amChartsWindow = window as AmChartsWindow
  const { am5, am5map, am5geodata_worldLow, am5themes_Animated } = amChartsWindow
  if (!am5 || !am5map || !am5geodata_worldLow || !am5themes_Animated) return

  disposeChart()

  am5.ready(() => {
    if (componentDisposed || !mapHostRef.value) return

    const root = am5.Root.new(mapHostRef.value)
    chartRoot = root

    root.setThemes([am5themes_Animated.new(root)])

    const isGlobeView = viewMode.value === 'globe'
    const chart = root.container.children.push(am5map.MapChart.new(root, {
      projection: isGlobeView ? am5map.geoOrthographic() : am5map.geoMercator(),
      panX: isGlobeView ? 'rotateX' : 'translateX',
      panY: isGlobeView ? 'rotateY' : 'translateY',
      wheelY: 'zoom',
      wheelX: 'none',
      pinchZoom: true,
      maxZoomLevel: isGlobeView ? 8 : 32,
      homeGeoPoint: { latitude: 22, longitude: 78 },
      homeZoomLevel: isGlobeView ? 1.9 : 1.35,
    }))

    const background = chart.chartContainer.children.unshift(am5.Rectangle.new(root, {
      width: am5.p100,
      height: am5.p100,
      fill: am5.color(0x081b2c),
      fillOpacity: 1,
    }))
    background.toBack()

    const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ['AQ'],
    }))

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x14324a),
      stroke: am5.color(0x305673),
      strokeOpacity: 0.45,
      strokeWidth: 0.8,
      tooltipText: '{name}',
    })

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x1d4e68),
    })

    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}))
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0xd9e3ea),
      strokeOpacity: 0.09,
      strokeDasharray: [2, 4],
    })

    const visibleRoutesSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
    visibleRoutesSeries.mapLines.template.setAll({
      stroke: am5.color(0xd4af37),
      strokeOpacity: 0.36,
      strokeWidth: 1.5,
      lineJoin: 'round',
      lineCap: 'round',
    })

    const trajectorySeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
    trajectorySeries.mapLines.template.setAll({
      strokeOpacity: 0,
      strokeWidth: 0,
    })

    const movingBulletSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
    movingBulletSeries.bullets.push(() => {
      const bullet = am5.Circle.new(root, {
        radius: 4,
        fill: am5.color(0xffffff),
        stroke: am5.color(0xd4af37),
        strokeWidth: 1.5,
      })

      bullet.animate({
        key: 'scale',
        from: 0.9,
        to: 1.25,
        duration: 900,
        loops: Infinity,
        easing: am5.ease.inOut(am5.ease.cubic),
      })

      bullet.animate({
        key: 'opacity',
        from: 0.85,
        to: 0.45,
        duration: 900,
        loops: Infinity,
        easing: am5.ease.inOut(am5.ease.cubic),
      })

      return am5.Bullet.new(root, { sprite: bullet })
    })

    const destinationSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
    destinationSeries.bullets.push((_root: any, _series: any, dataItem: any) => {
      const marker = am5.Container.new(root, {
        tooltipText: dataItem.dataContext?.label ?? '',
      })

      marker.children.push(am5.Circle.new(root, {
        radius: 11,
        fill: am5.color(0xd4af37),
        fillOpacity: 0.18,
        strokeOpacity: 0,
      }))

      marker.children.push(am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xd4af37),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
      }))

      return am5.Bullet.new(root, { sprite: marker })
    })

    const originSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
    originSeries.bullets.push(() => {
      const marker = am5.Container.new(root, {
        tooltipText: `${ORIGIN.city}, ${ORIGIN.country}`,
      })

      const pulse = marker.children.push(am5.Circle.new(root, {
        radius: 14,
        fill: am5.color(0x2dd4bf),
        fillOpacity: 0.2,
        strokeOpacity: 0,
      }))

      pulse.animate({
        key: 'scale',
        from: 0.8,
        to: 1.35,
        duration: 1400,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic),
      })

      pulse.animate({
        key: 'opacity',
        from: 0.5,
        to: 0,
        duration: 1400,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic),
      })

      marker.children.push(am5.Circle.new(root, {
        radius: 6,
        fill: am5.color(0x2dd4bf),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
      }))

      return am5.Bullet.new(root, { sprite: marker })
    })

    originSeries.data.setAll([
      {
        geometry: {
          type: 'Point',
          coordinates: [ORIGIN.longitude, ORIGIN.latitude],
        },
      },
    ])

    destinationSeries.data.setAll(
      DESTINATIONS.map(destination => ({
        label: `${destination.country} · ${destination.city}`,
        geometry: {
          type: 'Point',
          coordinates: [destination.longitude, destination.latitude],
        },
      })),
    )

    DESTINATIONS.forEach((destination) => {
      const coordinates = [
        [ORIGIN.longitude, ORIGIN.latitude],
        [destination.longitude, destination.latitude],
      ]

      visibleRoutesSeries.data.push({
        geometry: {
          type: 'LineString',
          coordinates,
        },
      })

      const routeDataItem = trajectorySeries.pushDataItem({
        geometry: {
          type: 'LineString',
          coordinates,
        },
      })

      const bulletDataItem = movingBulletSeries.pushDataItem({
        lineDataItem: routeDataItem,
        positionOnLine: 0,
        autoRotate: false,
      })

      bulletDataItem.animate({
        key: 'positionOnLine',
        from: 0,
        to: 1,
        duration: getRouteDuration(destination),
        loops: Infinity,
        easing: am5.ease.linear,
      })
    })

    window.setTimeout(() => {
      if (!componentDisposed && chartRoot === root) {
        chart.goHome()
      }
    }, 180)
  })
}

async function mountChart() {
  if (!import.meta.client) return

  mapError.value = ''

  try {
    await waitForAmCharts()
    scriptsReady.value = true
    await nextTick()
    initializeMap()
  } catch (error) {
    mapError.value = error instanceof Error
      ? error.message
      : 'Interactive map failed to load.'
  }
}

watch(viewMode, async () => {
  if (!import.meta.client || !scriptsReady.value) return
  await nextTick()
  initializeMap()
})

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  nextTick(() => {
    reveal(headingRef.value, { trigger: sectionRef.value, y: 20 })
    reveal(cardRef.value, { trigger: sectionRef.value, y: 30, duration: 0.7 })
  })

  void mountChart()
})

onBeforeUnmount(() => {
  componentDisposed = true
  disposeChart()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="global"
    class="py-20 sm:py-28 bg-gray-50"
    aria-labelledby="global-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="global-heading" ref="headingRef" class="text-3xl sm:text-4xl font-bold text-ocean-950 text-center mb-4">
        {{ sectionTitle }}
      </h2>
      <p class="text-gray-600 text-center max-w-3xl mx-auto mb-14">
        {{ sectionSubtitle }}
      </p>

      <div ref="cardRef" class="max-w-6xl mx-auto">
        <ClientOnly>
          <div class="relative overflow-hidden rounded-[28px] border border-ocean-200/40 bg-[#081b2c] shadow-[0_30px_80px_-32px_rgba(15,42,57,0.55)]">
            <div class="absolute left-4 top-4 z-20">
              <button
                type="button"
                class="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/90 px-3 py-2 text-sm font-medium text-ocean-950 shadow-lg backdrop-blur-md transition hover:bg-white"
                :aria-pressed="viewMode === 'globe'"
                aria-label="Toggle between flat map and 3D globe"
                @click="toggleViewMode"
              >
                <span class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ocean-700">
                  View
                </span>
                <span class="relative flex h-7 w-24 items-center rounded-full bg-ocean-950/10 p-1">
                  <span
                    class="absolute left-1 top-1 h-5 w-[calc(50%-0.25rem)] rounded-full bg-ocean-950 transition-transform duration-300"
                    :class="viewMode === 'globe' ? 'translate-x-[calc(100%+0.25rem)]' : 'translate-x-0'"
                  />
                  <span class="relative z-10 flex w-full items-center text-[10px] font-semibold uppercase tracking-[0.18em]">
                    <span :class="viewMode === 'map' ? 'text-white' : 'text-ocean-700'" class="flex-1 text-center">
                      Map
                    </span>
                    <span :class="viewMode === 'globe' ? 'text-white' : 'text-ocean-700'" class="flex-1 text-center">
                      Globe
                    </span>
                  </span>
                </span>
              </button>
            </div>

            <div
              v-if="mapError"
              class="absolute inset-0 z-10 flex items-center justify-center bg-[#081b2c]/90 px-6 text-center text-sm text-white/80"
            >
              {{ mapError }}
            </div>

            <div ref="mapHostRef" class="h-[550px] w-full" />
          </div>

          <template #fallback>
            <div class="h-[550px] w-full rounded-[28px] border border-ocean-200/40 bg-gradient-to-br from-ocean-950 via-ocean-900 to-[#081b2c] shadow-[0_30px_80px_-32px_rgba(15,42,57,0.55)]" />
          </template>
        </ClientOnly>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-ocean-900">
          <span class="rounded-full border border-ocean-200 bg-white px-4 py-2 shadow-sm">
            {{ sectionFootnote }}
          </span>
          <span class="rounded-full border border-ocean-200 bg-white px-4 py-2 shadow-sm">
            Malaysia origin with premium distance-based route timing
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
