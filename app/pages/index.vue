<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('home.meta.title'),
  meta: [
    { name: 'description', content: () => t('home.meta.description') },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ProductCards />
      <WhyChooseUs />
      <GlobalMap />
      <BrandShowcase />
      <Exhibitions />
      <CTASection />
      <Footer />
    </main>
  </div>
</template>
