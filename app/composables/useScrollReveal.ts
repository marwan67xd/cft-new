import { nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import type gsap from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'

export const SCROLL_REVEAL_EASE = 'power4.out'

export type ScrollRevealFrom = {
  y?: number
  x?: number
  opacity?: number
  scale?: number
}

export type ScrollRevealOptions = {
  trigger: HTMLElement
  start?: string
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
  from?: ScrollRevealFrom
}

function normalizeTargets(targets: Element | Element[] | null | undefined): Element[] {
  if (!targets) return []
  return Array.isArray(targets) ? targets.filter(Boolean) : [targets]
}

export function useScrollReveal(sectionRef: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null

  function revealImmediately(targets: Element | Element[] | null | undefined) {
    const els = normalizeTargets(targets)
    if (!els.length) return

    void import('gsap').then(({ default: gsap }) => {
      gsap.set(els, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        clearProps: 'transform',
      })
    })
  }

  function run(setup: (api: {
    gsap: typeof gsap
    ScrollTrigger: typeof ScrollTriggerPlugin
    reveal: (targets: Element | Element[], options: ScrollRevealOptions) => void
    revealHeader: (heading: Element | null, subtitle: Element | null, trigger: HTMLElement) => void
  }) => void) {
    onMounted(async () => {
      if (!import.meta.client || !sectionRef.value) return

      await nextTick()

      const section = sectionRef.value
      const hiddenTargets = section.querySelectorAll('[data-reveal]')
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        revealImmediately([section, ...hiddenTargets])
        return
      }

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      const reveal = (
        targets: Element | Element[],
        options: ScrollRevealOptions,
      ) => {
        const els = normalizeTargets(targets)
        if (!els.length) return

        const from = {
          y: options.from?.y ?? 40,
          x: options.from?.x ?? 0,
          opacity: options.from?.opacity ?? 0,
          scale: options.from?.scale ?? 1,
        }

        gsap.fromTo(
          els,
          { ...from, autoAlpha: 0, force3D: true },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            autoAlpha: 1,
            duration: options.duration ?? 0.9,
            stagger: options.stagger ?? 0,
            delay: options.delay ?? 0,
            ease: options.ease ?? SCROLL_REVEAL_EASE,
            force3D: true,
            scrollTrigger: {
              trigger: options.trigger,
              start: options.start ?? 'top 84%',
              once: true,
            },
          },
        )
      }

      const revealHeader = (
        heading: Element | null,
        subtitle: Element | null,
        trigger: HTMLElement,
      ) => {
        if (heading) {
          reveal(heading, {
            trigger,
            start: 'top 86%',
            from: { y: 36, opacity: 0 },
            duration: 0.88,
          })
        }

        if (subtitle) {
          reveal(subtitle, {
            trigger,
            start: 'top 86%',
            from: { y: 28, opacity: 0 },
            duration: 0.88,
            delay: heading ? 0.1 : 0,
          })
        }
      }

      ctx = gsap.context(() => {
        setup({ gsap, ScrollTrigger, reveal, revealHeader })
      }, section)

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.animation && trigger.progress === 0 && trigger.scroll() > trigger.start) {
            trigger.animation.play(0)
          }
        })
      })
    })

    onUnmounted(() => {
      ctx?.revert()
      ctx = null
    })
  }

  return { run, revealImmediately }
}
