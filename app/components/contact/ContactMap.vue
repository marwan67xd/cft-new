<script setup lang="ts">
const { t } = useI18n()

/** موقع الشركة على الخريطة — الرابط ومرجع التضمين في مكان واحد */
const CONTACT_MAP = {
  openInMapsLink: 'https://maps.app.goo.gl/ZdJShqiP7BSe65q19',
  embedPlaceQuery: 'Capital Food International Co.,Ltd. 91/7 The Pretium, Bangna - Trad Rd., Bangkeaw Bang Phli District, Samut Prakan 10540, Thailand',
} as const

const mapLink = CONTACT_MAP.openInMapsLink
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT_MAP.embedPlaceQuery)}&output=embed`

const sectionRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

useSectionMotion(sectionRef, { preset: 'standard' })
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-24 bg-white"
    aria-labelledby="map-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-ocean-600 bg-ocean-100 mb-4">
          {{ $t('contact.map.badge') }}
        </span>
        <h2 id="map-heading" class="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          {{ $t('contact.map.title') }}
        </h2>
        <p class="mt-3 text-gray-600 leading-relaxed">
          {{ $t('contact.map.subtitle') }}
        </p>
      </header>

      <div
        ref="mapRef"
        class="rounded-2xl overflow-hidden shadow-card border border-gray-100 aspect-[16/9] min-h-[280px] bg-gray-100 max-w-5xl mx-auto"
      >
        <iframe
          :src="mapUrl"
          title="Capital Food headquarters location"
          class="w-full h-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <p class="mt-4 text-center text-sm text-gray-500">
        <a :href="mapLink" target="_blank" rel="noopener noreferrer" class="text-ocean-600 hover:text-ocean-700 font-medium underline">
          {{ $t('contact.map.openInGoogleMaps') }}
        </a>
      </p>
    </div>
  </section>
</template>
