import { nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import type gsap from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import { getRevealY, scaleMotion } from './useResponsiveMotion'

export const SCROLL_REVEAL_EASE = 'power4.out'

/** When the trigger enters the viewport focal zone — near vertical center. */
export const SCROLL_REVEAL_START = 'top 55%'
/** Large blocks (CTA panels, footer columns) — center crosses viewport center. */
export const SCROLL_REVEAL_START_CENTER = 'center center'
/** Compact strips + staggered child items — slightly below center. */
export const SCROLL_REVEAL_START_COMPACT = 'top 62%'
/** Staggered grids/cards within a section. */
export const SCROLL_REVEAL_START_ITEMS = 'top 58%'

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

type SimpleRevealOptions = {
  trigger?: HTMLElement | null
  start?: string
  duration?: number
  stagger?: number
  delay?: number
  y?: number
  x?: number
  scale?: number
  ease?: string
}

type GsapInstance = typeof import('gsap').default

let pageMotionCtx: gsap.Context | null = null
let gsapPromise: Promise<GsapInstance> | null = null

async function getGsap(): Promise<GsapInstance> {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { default: ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return gsap
    })
  }
  return gsapPromise
}

function normalizeTargets(targets: Element | Element[] | null | undefined): Element[] {
  if (!targets) return []
  return Array.isArray(targets) ? targets.filter(Boolean) : [targets]
}

export function markMotionHandled(section: HTMLElement) {
  section.dataset.motionHandled = 'true'
}

function sectionHasScrollTrigger(section: HTMLElement, ScrollTrigger: typeof ScrollTriggerPlugin): boolean {
  return ScrollTrigger.getAll().some((trigger) => {
    const node = trigger.trigger as Element | null
    return node !== null && (section === node || section.contains(node))
  })
}

export function revealInView(
  gsap: typeof import('gsap').default,
  targets: Element | Element[],
  options: Omit<ScrollRevealOptions, 'trigger'> & { trigger?: HTMLElement },
) {
  normalizeTargets(targets).forEach((el) => {
    revealTargets(gsap, el, {
      ...options,
      trigger: (options.trigger ?? el) as HTMLElement,
      start: options.start ?? SCROLL_REVEAL_START,
    })
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
    y: options.from?.y ?? getRevealY(40),
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
        start: options.start ?? SCROLL_REVEAL_START,
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
      trigger: heading,
      start: SCROLL_REVEAL_START,
      once: true,
    },
  })

  tl.fromTo(
    heading,
    { y: getRevealY(40), autoAlpha: 0, force3D: true },
    { y: 0, autoAlpha: 1, duration: 0.92, ease: SCROLL_REVEAL_EASE, force3D: true },
  )

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { y: getRevealY(28), autoAlpha: 0, force3D: true },
      { y: 0, autoAlpha: 1, duration: 0.88, ease: SCROLL_REVEAL_EASE, force3D: true },
      '-=0.68',
    )
  }

  if (cards.length) {
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: getRevealY(32), autoAlpha: 0, force3D: true },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: SCROLL_REVEAL_EASE,
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: SCROLL_REVEAL_START,
            once: true,
          },
        },
      )
    })
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
        from: { y: scaleMotion(y), x: scaleMotion(x) },
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

export function useScrollReveal(sectionRef?: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  let revertFn: (() => void) | null = null

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

  async function animate(
    scope: HTMLElement,
    setup: (gsap: GsapInstance) => void,
  ) {
    if (!import.meta.client) return
    const gsap = await getGsap()
    const context = gsap.context(() => setup(gsap), scope)
    revertFn = () => context.revert()
  }

  async function reveal(
    el: HTMLElement | null | undefined,
    options: SimpleRevealOptions = {},
  ) {
    if (!el) return
    const gsap = await getGsap()
    const {
      trigger = el,
      start = SCROLL_REVEAL_START,
      duration = 0.7,
      delay = 0,
      y = 28,
      x = 0,
      scale = 1,
      ease = 'power3.out',
    } = options

    gsap.fromTo(
      el,
      { opacity: 0, y: scaleMotion(y), x: scaleMotion(x), scale: scale === 1 ? 1 : scale * 0.92 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease,
        scrollTrigger: { trigger, start, once: true },
      },
    )
  }

  async function revealChildren(
    container: HTMLElement | null | undefined,
    selector: string,
    options: SimpleRevealOptions = {},
  ) {
    if (!container) return
    const gsap = await getGsap()
    const children = container.querySelectorAll(selector)
    if (!children.length) return

    const {
      trigger = container,
      start = SCROLL_REVEAL_START_ITEMS,
      duration = 0.55,
      stagger = 0.1,
      y = 24,
      x = 0,
      ease = 'power3.out',
    } = options

    gsap.fromTo(
      children,
      { opacity: 0, y: scaleMotion(y), x: scaleMotion(x) },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger, start, once: true },
      },
    )
  }

  async function parallax(
    el: HTMLElement | null | undefined,
    trigger: HTMLElement | null | undefined,
    yPercent = 18,
  ) {
    if (!el || !trigger) return
    const gsap = await getGsap()
    gsap.to(el, {
      yPercent: scaleMotion(yPercent),
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  function run(setup: (api: {
    gsap: typeof gsap
    ScrollTrigger: typeof ScrollTriggerPlugin
    reveal: (targets: Element | Element[], options: ScrollRevealOptions) => void
    revealWhenCentered: (targets: Element | Element[], options: Omit<ScrollRevealOptions, 'trigger'> & { trigger?: HTMLElement }) => void
    revealHeader: (heading: Element | null, subtitle: Element | null, trigger: HTMLElement) => void
  }) => void) {
    if (!sectionRef) return

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

      const revealTarget = (targets: Element | Element[], options: ScrollRevealOptions) => {
        revealTargets(gsap, targets, options)
      }

      const revealWhenCentered = (
        targets: Element | Element[],
        options: Omit<ScrollRevealOptions, 'trigger'> & { trigger?: HTMLElement },
      ) => {
        revealInView(gsap, targets, options)
      }

      const revealHeader = (
        heading: Element | null,
        subtitle: Element | null,
        trigger: HTMLElement,
      ) => {
        if (heading) {
          revealTarget(heading, {
            trigger: heading as HTMLElement,
            start: SCROLL_REVEAL_START,
            from: { y: getRevealY(36), opacity: 0 },
            duration: 0.88,
          })
        }

        if (subtitle) {
          revealTarget(subtitle, {
            trigger: subtitle as HTMLElement,
            start: SCROLL_REVEAL_START,
            from: { y: getRevealY(28), opacity: 0 },
            duration: 0.88,
            delay: heading ? 0.1 : 0,
          })
        }
      }

      ctx = gsap.context(() => {
        setup({ gsap, ScrollTrigger, reveal: revealTarget, revealWhenCentered, revealHeader })
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

  onUnmounted(() => revertFn?.())

  return { animate, reveal, revealChildren, parallax, run, revealImmediately }
}
