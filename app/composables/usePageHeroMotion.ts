import { onMounted, onUnmounted, type Ref } from 'vue'
import { getParallaxY, scaleMotion } from './useResponsiveMotion'

type PageHeroMotionRefs = {
  heroRef: Ref<HTMLElement | null>
  bgRef: Ref<HTMLElement | null>
  breadcrumbRef: Ref<HTMLElement | null>
  titleRef: Ref<HTMLElement | null>
  subtitleRef: Ref<HTMLElement | null>
}

export function usePageHeroMotion(refs: PageHeroMotionRefs) {
  let gsapCtx: { revert: () => void } | null = null

  onMounted(() => {
    if (!import.meta.client || !refs.heroRef.value) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (!refs.heroRef.value) return

      gsap.registerPlugin(ScrollTrigger)

      const yBreadcrumb = scaleMotion(16)
      const yTitle = scaleMotion(28)
      const ySubtitle = scaleMotion(24)

      gsapCtx = gsap.context(() => {
        if (refs.bgRef.value) {
          gsap.to(refs.bgRef.value, {
            y: getParallaxY(),
            ease: 'none',
            scrollTrigger: {
              trigger: refs.heroRef.value,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        if (refs.breadcrumbRef.value) {
          gsap.fromTo(
            refs.breadcrumbRef.value,
            { opacity: 0, y: yBreadcrumb },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.2 },
          )
        }

        if (refs.titleRef.value) {
          gsap.fromTo(
            refs.titleRef.value,
            { opacity: 0, y: yTitle },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.35 },
          )
        }

        if (refs.subtitleRef.value) {
          gsap.fromTo(
            refs.subtitleRef.value,
            { opacity: 0, y: ySubtitle },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.55 },
          )
        }
      }, refs.heroRef)
    })
  })

  onUnmounted(() => {
    gsapCtx?.revert()
    gsapCtx = null
  })
}
