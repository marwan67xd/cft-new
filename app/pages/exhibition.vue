<script setup lang="ts">
import ExhibitionHero from '~/components/exhibition/ExhibitionHero.vue'
import EventsGrid from '~/components/exhibition/EventsGrid.vue'
import HighlightsSlider from '~/components/exhibition/HighlightsSlider.vue'
import CompanyPresence from '~/components/exhibition/CompanyPresence.vue'
import ExhibitionCTA from '~/components/exhibition/ExhibitionCTA.vue'

useHead({
  title: 'Our Exhibitions & Events | Capital Food | International Seafood',
  meta: [
    {
      name: 'description',
      content: 'Capital Food at international seafood trade shows and global events. Meet us at Seafood Expo, Gulfood, Anuga, and more. Join us or get in touch to collaborate.',
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
