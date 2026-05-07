<script setup lang="ts">
useHead({
  title: 'Quality Sardines | Capital Food International | Canned Seafood',
  meta: [
    {
      name: 'description',
      content: 'Nutritious, high-quality sardines processed to consistent quality levels for consumer and commercial use. International food safety standards, multiple formats, and global distribution.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <SardinesHero />
      <SardinesIntroductionSection />
      <SardinesPackagingOptions />
      <SardinesSpecificationsSection />
      <SardinesQualityFoodSafety />
      <SardinesNutritionBenefits />
      <SardinesExportDistribution />
      <SardinesCTA />
      <SardinesRelatedProducts />
      <Footer />
    </main>
  </div>
</template>
