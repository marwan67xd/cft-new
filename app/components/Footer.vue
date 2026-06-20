<script setup lang="ts">
import logoImage from "~/assets/logo/logo-2-10-10-63.png";

const quickLinks = [
  { label: "Company Profile", href: "/company-profile" },
  { label: "Products", href: "/#products" },
  { label: "Quality Standards", href: "/#quality" },
  { label: "Global Presence", href: "/#global" },
  { label: "Exhibitions", href: "/#exhibitions" },
  { label: "Contact", href: "/#contact" },
];

const productCategories = [
  { label: "Premium Tuna", href: "/tuna" },
  { label: "Sardines", href: "/sardines" },
  { label: "Mackerel", href: "/mackerel" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@capitalfoodinternational140",
    icon: "youtube",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/capitalfoodinternational",
    icon: "facebook",
  },
];

const sectionRef = ref<HTMLElement | null>(null)
const brandColRef = ref<HTMLElement | null>(null)
const linksColRef = ref<HTMLElement | null>(null)
const productsColRef = ref<HTMLElement | null>(null)
const contactColRef = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)

const { run } = useScrollReveal(sectionRef)

run(({ reveal }) => {
  if (!sectionRef.value) return

  const columns = [brandColRef.value, linksColRef.value, productsColRef.value, contactColRef.value].filter(
    (col): col is HTMLElement => col !== null,
  )

  if (columns.length) {
    reveal(columns, {
      trigger: sectionRef.value,
      start: 'top 92%',
      from: { y: 36, opacity: 0 },
      duration: 0.9,
      stagger: 0.1,
    })
  }

  if (bottomRef.value) {
    reveal(bottomRef.value, {
      trigger: sectionRef.value,
      start: 'top 92%',
      from: { y: 20, opacity: 0 },
      duration: 0.8,
      delay: 0.35,
    })
  }
})
</script>

<template>
  <footer ref="sectionRef" class="bg-ocean-950 text-gray-300 pt-16 pb-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12"
      >
        <div ref="brandColRef" class="lg:col-span-1">
          <NuxtLink to="/" class="inline-block mb-4">
            <img
              :src="logoImage"
              alt="Capital Food Logo"
              class="h-10 w-auto object-contain"
            />
          </NuxtLink>
          <p class="text-sm leading-relaxed text-gray-400 max-w-xs">
            Capital Food International Co., Ltd. is a Bangkok-based manufacturer and exporter specializing in canned seafood products, including tuna, sardines, and mackerel.
          </p>
        </div>

        <div ref="linksColRef">
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink
                v-if="link.href.startsWith('/') && !link.href.startsWith('/#')"
                :to="link.href"
                class="text-sm hover:text-aqua-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="text-sm hover:text-aqua-400 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div ref="productsColRef">
          <h3 class="text-white font-semibold mb-4">Products</h3>
          <ul class="space-y-3">
            <li v-for="cat in productCategories" :key="cat.href">
              <NuxtLink
                v-if="cat.href.startsWith('/')"
                :to="cat.href"
                class="text-sm hover:text-aqua-400 transition-colors"
              >
                {{ cat.label }}
              </NuxtLink>
              <a
                v-else
                :href="cat.href"
                class="text-sm hover:text-aqua-400 transition-colors"
              >
                {{ cat.label }}
              </a>
            </li>
          </ul>
        </div>

        <div ref="contactColRef" class="space-y-8">
          <div>
            <h3 class="text-white font-semibold mb-3">Head office</h3>
            <p class="text-white/90 font-medium text-sm mb-2">Call us now!</p>
            <address class="text-sm not-italic space-y-1 text-gray-400">
              <p>
                <a href="tel:+66925411454" class="hover:text-aqua-400 transition-colors">(+66) 925 411 454</a>
              </p>
              <p>
                <a href="tel:+66847217966" class="hover:text-aqua-400 transition-colors">(+66) 847 217 966</a>
              </p>
              <p>Monday to Friday 8:30 am – 5:30 pm</p>
              <p class="pt-2">
                <a href="mailto:adelbkk@cfi-capitalfood.com" class="hover:text-aqua-400 transition-colors">adelbkk@cfi-capitalfood.com</a>
              </p>
              <p>
                <a href="mailto:kathy@cfi-capitalfood.com" class="hover:text-aqua-400 transition-colors">kathy@cfi-capitalfood.com</a>
              </p>
            </address>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-3">Office</h3>
            <p class="text-white/90 font-medium text-sm mb-2">Call us now!</p>
            <address class="text-sm not-italic space-y-1 text-gray-400">
              <p>
                <a href="tel:+6621708334" class="hover:text-aqua-400 transition-colors">(+66) 217 083 34</a>
              </p>
              <p>Monday to Friday 8:30 am – 5:30 pm</p>
              <p class="pt-2">
                <a href="mailto:adelbkk@cfi-capitalfood.com" class="hover:text-aqua-400 transition-colors">adelbkk@cfi-capitalfood.com</a>
              </p>
              <p>
                <a href="mailto:kathy@cfi-capitalfood.com" class="hover:text-aqua-400 transition-colors">kathy@cfi-capitalfood.com</a>
              </p>
            </address>
          </div>
          <div class="flex gap-4" aria-label="Social links">
            <a
              v-for="s in socialLinks"
              :key="s.icon"
              :href="s.href"
              :aria-label="s.label"
              class="w-10 h-10 rounded-lg bg-ocean-800 flex items-center justify-center text-gray-400 hover:text-aqua-400 hover:bg-ocean-700 transition-colors"
            >
              <svg
                v-if="s.icon === 'linkedin'"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              <svg
                v-else-if="s.icon === 'youtube'"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        ref="bottomRef"
        class="pt-8 border-t border-ocean-800 text-center text-sm text-gray-500"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Capital Food International Co., Ltd.
        </p>
      </div>
    </div>
  </footer>
</template>
