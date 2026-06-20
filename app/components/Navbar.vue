<script setup lang="ts">
import logoImage from "~/assets/logo/logo-2-10-10-63.png";
const { t } = useI18n();
const localePath = useLocalePath();

const navLinks = computed(() => [
  { label: t('nav.home'), href: localePath('/') },
  { label: t('nav.companyProfile'), href: localePath('/company-profile') },
  { label: t('nav.tuna'), href: localePath('/tuna') },
  { label: t('nav.sardinesMackerel'), href: localePath('/sardines-mackerel') },
  { label: t('nav.exhibition'), href: localePath('/exhibition') },
]);

const contactLink = computed(() => ({ label: t('nav.contact'), href: localePath('/contact') }));

const route = useRoute();
const isTunaPage = computed(() => route.path === localePath('/tuna') || route.path.endsWith('/tuna'));
const isHomePage = computed(() => route.path === localePath('/') || route.path === '/');

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const headerRef = ref<HTMLElement | null>(null);

defineExpose({ headerRef });

const updateScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScroll);
});
</script>

<template>
  <header
    ref="headerRef"
    class="main-header fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-300"
    :class="[
      isScrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-nav py-3'
        : isTunaPage
          ? 'bg-[#1b2c3e] py-3'
          : isHomePage
            ? 'bg-transparent backdrop-blur-sm py-5'
            : 'bg-transparent py-5',
    ]"
  >
    <nav
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center shrink-0 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 rounded-lg"
        aria-label="Home"
      >
        <img
          :src="logoImage"
          alt="Capital Food Logo"
          class="w-auto object-contain transition-all duration-300"
          :class="isScrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-14'"
          loading="eager"
        />
      </NuxtLink>

      <!-- Desktop nav (Centered) -->
      <ul class="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
        <li v-for="link in navLinks" :key="link.href">
          <NuxtLink
            :to="link.href"
            class="font-medium transition-colors"
            :class="isScrolled ? 'text-gray-700 hover:text-sky-500' : isTunaPage ? 'text-white hover:text-sky-400' : 'text-white hover:text-sky-400'"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Desktop Right Side (Contact + Language) -->
      <div class="hidden md:flex items-center gap-6">
        <NuxtLink
          :to="contactLink.href"
          class="font-medium transition-colors inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
        >
          {{ contactLink.label }}
        </NuxtLink>
        <LanguageSwitcher :scrolled="isScrolled" :mobile="false" :tunaPage="!isScrolled && isTunaPage" />
      </div>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-colors"
        :class="isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle menu"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
      >
        <ul class="container mx-auto px-4 py-4 flex flex-col gap-2">
          <li v-for="link in navLinks" :key="link.href">
            <NuxtLink
              :to="link.href"
              class="block py-3 font-medium transition-colors hover:text-sky-500 text-gray-600"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="contactLink.href"
              class="block py-3 font-medium transition-colors hover:text-sky-500 text-ocean-600"
              @click="isMobileMenuOpen = false"
            >
              {{ contactLink.label }}
            </NuxtLink>
          </li>
          <li class="pt-2 border-t border-gray-200">
            <div class="flex items-center justify-between py-3">
              <span class="text-gray-600 font-medium">{{ $t('common.language') }}</span>
              <LanguageSwitcher :mobile="true" />
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
