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

let pageMotionCtx: gsap.Context | null = null

function normalizeTargets(targets: Element | Element[] | null | undefined): Element[] {
  if (!targets) return []
  return Array.isArray(targets) ? targets.filter(Boolean) : [targets]
}

function markMotionHandled(section: HTMLElement) {
  section.dataset.motionHandled = 'true'
}

function sectionHasScrollTrigger(section: HTMLElement, ScrollTrigger: typeof ScrollTriggerPlugin): boolean {
  return ScrollTrigger.getAll().some((trigger) => {
    const node = trigger.trigger as Element | null
    return node !== null && (section === node || section.contains(node))
  })
}

export function revealTargets(
  gsap: typeof import('gsap').default,
  targets: Element | Element[],
  options: ScrollRevealOptions,
) {
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

function animateSectionFallback(
  section: HTMLElement,
  gsap: typeof import('gsap').default,
) {
  const heading = section.querySelector('h1, h2')
  if (!heading) return

  const subtitle = heading.nextElementSibling?.matches('p')
    ? heading.nextElementSibling
    : section.querySelector('.container > p, .container p.text-center')

  const cards = section.querySelectorAll(
    'article, .grid > *, ul.grid > li, [data-reveal-item]',
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 86%',
      once: true,
    },
  })

  tl.fromTo(
    heading,
    { y: 40, autoAlpha: 0, force3D: true },
    { y: 0, autoAlpha: 1, duration: 0.92, ease: SCROLL_REVEAL_EASE, force3D: true },
  )

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { y: 28, autoAlpha: 0, force3D: true },
      { y: 0, autoAlpha: 1, duration: 0.88, ease: SCROLL_REVEAL_EASE, force3D: true },
      '-=0.68',
    )
  }

  if (cards.length) {
    tl.fromTo(
      cards,
      { y: 32, autoAlpha: 0, force3D: true },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: SCROLL_REVEAL_EASE,
        force3D: true,
      },
      '-=0.55',
    )
  }

  markMotionHandled(section)
}

export async function mountPageMotion(root: HTMLElement | null) {
  if (!import.meta.client || !root) return

  pageMotionCtx?.revert()
  pageMotionCtx = null

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])

  gsap.registerPlugin(ScrollTrigger)

  pageMotionCtx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      const section = el.closest('section, footer') ?? root
      const y = Number(el.dataset.revealY ?? 40)
      const x = Number(el.dataset.revealX ?? 0)
      const delay = Number(el.dataset.revealDelay ?? 0)
      const duration = Number(el.dataset.revealDuration ?? 0.9)

      revealTargets(gsap, el, {
        trigger: section as HTMLElement,
        from: { y, x },
        delay,
        duration,
      })
    })

    const sections = root.querySelectorAll<HTMLElement>('section, footer')

    sections.forEach((section) => {
      if (section.dataset.motionHandled === 'true') return
      if (sectionHasScrollTrigger(section, ScrollTrigger)) {
        markMotionHandled(section)
        return
      }

      animateSectionFallback(section, gsap)
    })
  }, root)

  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.animation && trigger.progress === 0 && trigger.scroll() > trigger.start) {
        trigger.animation.play(0)
      }
    })
  })
}

export function teardownPageMotion() {
  pageMotionCtx?.revert()
  pageMotionCtx = null
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
      markMotionHandled(section)

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

      const reveal = (targets: Element | Element[], options: ScrollRevealOptions) => {
        revealTargets(gsap, targets, options)
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
