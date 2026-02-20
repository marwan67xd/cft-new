<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('sardinesMackerel.meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('sardinesMackerel.meta.description'),
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
      <Footer />
    </main>
  </div>
</template>
