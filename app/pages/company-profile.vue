<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('companyProfile.meta.title'),
  meta: [
    {
      name: 'description',
      content: () => t('companyProfile.meta.description'),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <AboutAboutHero />
      <AboutCompanyOverview />
      <AboutMissionVision />
      <AboutCoreValues />
      <AboutQualityStandards />
      <AboutProductionExport />
      <AboutTimeline />
      <AboutCTASection />
      <Footer />
    </main>
  </div>
</template>
