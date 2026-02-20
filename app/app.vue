<script setup lang="ts">
useHead(() => ({
  htmlAttrs: { dir: 'ltr', lang: 'en' },
}))
</script>

<template>
  <div dir="ltr">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
