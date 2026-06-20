<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const ctaRef = ref<HTMLElement | null>(null)

useSectionMotion(ctaRef, { preset: 'cta' })
</script>

<template>
  <section
    ref="ctaRef"
    class="py-20 sm:py-24"
    aria-labelledby="about-cta-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ocean-600 via-ocean-500 to-aqua-600 px-8 py-16 sm:px-12 sm:py-20 text-center shadow-xl"
      >
        <!-- Soft texture overlay -->
        <div
          class="absolute inset-0 opacity-10"
          aria-hidden="true"
          style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
        />
        <div class="relative z-10">
          <h2 id="about-cta-heading" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {{ $t('companyProfile.cta.title') }}
          </h2>
          <p class="text-white/90 max-w-xl mx-auto mb-8">
            {{ $t('companyProfile.cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <NuxtLink
              :to="localePath('/#contact')"
              class="about-cta-btn group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-ocean-600 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-500"
            >
              <span>{{ $t('companyProfile.cta.contactButton') }}</span>
              <svg
                class="about-cta-btn__arrow w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-cta-btn {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transform: translateZ(0);
  box-shadow:
    0 4px 14px -4px rgba(15, 42, 57, 0.18),
    0 2px 6px -2px rgba(15, 42, 57, 0.08);
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s ease,
    background-color 0.35s ease;
}

.about-cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(20, 184, 166, 0.12) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(31, 118, 153, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.about-cta-btn::after {
  content: '';
  position: absolute;
  top: -30%;
  left: -130%;
  width: 50%;
  height: 160%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.65) 50%,
    transparent 100%
  );
  transform: skewX(-18deg);
  transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 1;
}

.about-cta-btn__arrow {
  position: relative;
  z-index: 2;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-cta-btn span {
  position: relative;
  z-index: 2;
}

.about-cta-btn:hover,
.about-cta-btn:focus-visible {
  transform: translateY(-4px) scale(1.04);
  color: #0f2a39;
  background-color: #ffffff;
  box-shadow:
    0 20px 40px -10px rgba(15, 42, 57, 0.28),
    0 12px 24px -8px rgba(20, 184, 166, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.85);
}

.about-cta-btn:hover::before,
.about-cta-btn:focus-visible::before {
  opacity: 1;
}

.about-cta-btn:hover::after,
.about-cta-btn:focus-visible::after {
  left: 140%;
}

.about-cta-btn:hover .about-cta-btn__arrow,
.about-cta-btn:focus-visible .about-cta-btn__arrow {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .about-cta-btn,
  .about-cta-btn::before,
  .about-cta-btn::after,
  .about-cta-btn__arrow {
    transition: none;
  }

  .about-cta-btn:hover,
  .about-cta-btn:focus-visible {
    transform: none;
  }

  .about-cta-btn:hover .about-cta-btn__arrow,
  .about-cta-btn:focus-visible .about-cta-btn__arrow {
    transform: none;
  }
}
</style>
