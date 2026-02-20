<script setup lang="ts">
useHead({
  title: 'About Capital Food | Company Profile',
  meta: [
    {
      name: 'description',
      content: 'Capital Food delivers premium seafood with global quality standards and sustainable sourcing since 1994. Learn about our mission, values, and compliance.',
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
