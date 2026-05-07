<script setup lang="ts">
import ExhibitionHero from '~/components/exhibition/ExhibitionHero.vue'
import EventsGrid from '~/components/exhibition/EventsGrid.vue'
import HighlightsSlider from '~/components/exhibition/HighlightsSlider.vue'
import CompanyPresence from '~/components/exhibition/CompanyPresence.vue'
import ExhibitionCTA from '~/components/exhibition/ExhibitionCTA.vue'

const { t } = useI18n()

useHead({
  title: () => t('exhibition.meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('exhibition.meta.description'),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <ExhibitionHero />
      <EventsGrid />
      <HighlightsSlider />
      <CompanyPresence />
      <ExhibitionCTA />
      <Footer />
    </main>
  </div>
</template>
