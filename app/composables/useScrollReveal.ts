type GsapInstance = typeof import('gsap').default

export interface ScrollRevealOptions {
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

export function useScrollReveal() {
  let revertFn: (() => void) | null = null

  async function animate(
    scope: HTMLElement,
    setup: (gsap: GsapInstance) => void,
  ) {
    if (!import.meta.client) return
    const gsap = await getGsap()
    const ctx = gsap.context(() => setup(gsap), scope)
    revertFn = () => ctx.revert()
  }

  async function reveal(
    el: HTMLElement | null | undefined,
    options: ScrollRevealOptions = {},
  ) {
    if (!el) return
    const gsap = await getGsap()
    const {
      trigger = el,
      start = 'top 85%',
      duration = 0.7,
      delay = 0,
      y = 28,
      x = 0,
      scale = 1,
      ease = 'power3.out',
    } = options

    gsap.fromTo(
      el,
      { opacity: 0, y, x, scale: scale === 1 ? 1 : scale * 0.92 },
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
    options: ScrollRevealOptions = {},
  ) {
    if (!container) return
    const gsap = await getGsap()
    const children = container.querySelectorAll(selector)
    if (!children.length) return

    const {
      trigger = container,
      start = 'top 82%',
      duration = 0.55,
      stagger = 0.1,
      y = 24,
      x = 0,
      ease = 'power3.out',
    } = options

    gsap.fromTo(
      children,
      { opacity: 0, y, x },
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
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  onUnmounted(() => revertFn?.())

  return { animate, reveal, revealChildren, parallax }
}
