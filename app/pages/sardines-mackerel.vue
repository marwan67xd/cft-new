<script setup lang="ts">
useHead({
  title: 'Premium Sardines & Mackerel | Capital Food | International Seafood',
  meta: [
    {
      name: 'description',
      content: 'Nutritious, high-quality sardines and mackerel prepared to meet international food safety and export standards. Multiple formats, private label, and global distribution.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <SardinesSardinesHero />
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
