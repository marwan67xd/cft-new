<script setup lang="ts">
useHead({
  title: 'Mackerel Fillets | Capital Food International | Canned Seafood',
  meta: [
    {
      name: 'description',
      content: 'Canned mackerel fillets prepared according to international production norms. High-quality, reliable and versatile supply for retail and distribution. Food safety certified.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <MackerelMackerelHero />
      <SardinesIntroductionSection />
      <SardinesPackagingOptions />
      <SardinesSpecificationsSection />
      <SardinesQualityFoodSafety />
      <SardinesNutritionBenefits />
      <SardinesExportDistribution />
      <SardinesSardinesCTA />
      <SardinesRelatedProducts />
      <Footer />
    </main>
  </div>
</template>
