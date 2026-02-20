<script setup lang="ts">
import logoImage from "~/assets/logo/logo-2-10-10-63.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Company Profile", href: "/company-profile" },
  { label: "Tuna", href: "/tuna" },
  { label: "Sardines / Mackerel", href: "/sardines-mackerel" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Contact us", href: "/contact" },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

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
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-nav py-3'
        : 'bg-transparent py-5',
    ]"
  >
    <nav
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <NuxtLink
        to="/"
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

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <NuxtLink
            :to="link.href"
            class="text-gray-600 hover:text-ocean-700 font-medium transition-colors"
            :class="
              link.href === '/contact'
                ? 'inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-ocean-600 text-white hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2'
                : ''
            "
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
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
              class="block py-3 text-gray-600 hover:text-ocean-700 font-medium"
              :class="link.href === '/contact' ? 'text-ocean-600' : ''"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
