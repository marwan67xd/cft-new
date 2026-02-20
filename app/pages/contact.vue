<script setup lang="ts">
import ContactHero from '~/components/contact/ContactHero.vue'
import ContactSection from '~/components/contact/ContactSection.vue'
import ContactMap from '~/components/contact/ContactMap.vue'
import ContactCTA from '~/components/contact/ContactCTA.vue'

useHead({
  title: 'Contact Us | Get in Touch | Capital Food',
  meta: [
    {
      name: 'description',
      content: 'Reach Capital Food for inquiries, quotations, or partnership opportunities. Contact our head office by form, email, or phone. Premium seafood supplier.',
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
