<script setup lang="ts">
import ContactHero from '~/components/contact/ContactHero.vue'
import ContactSection from '~/components/contact/ContactSection.vue'
import ContactMap from '~/components/contact/ContactMap.vue'
import ContactCTA from '~/components/contact/ContactCTA.vue'

const { t } = useI18n()

useHead({
  title: () => t('contact.meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('contact.meta.description'),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <ContactHero />
      <ContactSection />
      <ContactMap />
      <ContactCTA />
      <Footer />
    </main>
  </div>
</template>
