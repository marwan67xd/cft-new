<script setup lang="ts">
useHead({
  title: 'Premium Seafood Supplier | Trusted Worldwide',
  meta: [
    { name: 'description', content: 'High-quality tuna, sardines, and mackerel prepared to meet international food standards. Your global export partner.' },
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
      <Exhibitions />
      <CTASection />
      <Footer />
    </main>
  </div>
</template>
