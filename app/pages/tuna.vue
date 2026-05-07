<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('tuna.meta.title'),
  meta: [
    {
      name: "description",
      content: () => t('tuna.meta.description'),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <Navbar />
    <main>
      <TunaTunaHero />
      <TunaIntroductionSection />
      <TunaSpecificationsSection />
      <TunaTunaGrid />
      <TunaPackagingTrust />
      <TunaNutritionSection />
      <TunaExportLogistics />
      <TunaTunaCta />
      <Footer />
    </main>
  </div>
</template>
