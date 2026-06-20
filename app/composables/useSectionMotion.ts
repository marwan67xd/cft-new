import { nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import type gsap from 'gsap'
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import {
  SCROLL_REVEAL_EASE,
  SCROLL_REVEAL_START,
  SCROLL_REVEAL_START_CENTER,
  markMotionHandled,
  revealTargets,
  type ScrollRevealOptions,
} from './useScrollReveal'
import { getRevealY, getSplitRevealFrom } from './useResponsiveMotion'

export type SectionMotionApi = {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTriggerPlugin
  reveal: (targets: Element | Element[], options: ScrollRevealOptions) => void
  revealHeader: (heading: Element | null, subtitle: Element | null) => void
}

export type SectionMotionOptions = {
  preset?: 'standard' | 'split' | 'cards' | 'cta' | 'tables'
  headingRef?: Ref<HTMLElement | null>
  subtitleRef?: Ref<HTMLElement | null>
  imageRef?: Ref<HTMLElement | null>
  contentRef?: Ref<HTMLElement | null>
  panelRef?: Ref<HTMLElement | null>
  cardsContainerRef?: Ref<HTMLElement | null>
  cardsSelector?: string
  cardRefs?: Ref<HTMLElement[]>
  tablesContainerRef?: Ref<HTMLElement | null>
  tablesSelector?: string
  headingSelector?: string
  setup?: (api: SectionMotionApi) => void
}

function revealImmediately(section: HTMLElement) {
  void import('gsap').then(({ default: gsap }) => {
    gsap.set(section.querySelectorAll('*'), {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      clearProps: 'transform',
    })
  })
}

export function useSectionMotion(
  sectionRef: Ref<HTMLElement | null>,
  options: SectionMotionOptions = {},
) {
  let ctx: gsap.Context | null = null

  onMounted(async () => {
    if (!import.meta.client || !sectionRef.value) return

    const section = sectionRef.value
    markMotionHandled(section)

    await nextTick()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      revealImmediately(section)
      return
    }

    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])

    gsap.registerPlugin(ScrollTrigger)

    const reveal = (targets: Element | Element[], revealOptions: ScrollRevealOptions) => {
      revealTargets(gsap, targets, { ...revealOptions, trigger: revealOptions.trigger ?? section })
    }

    const revealHeader = (heading: Element | null, subtitle: Element | null) => {
      if (heading) {
        reveal(heading, {
          trigger: heading as HTMLElement,
          start: SCROLL_REVEAL_START,
          from: { y: getRevealY(36), opacity: 0 },
          duration: 0.92,
        })
      }
      if (subtitle) {
        reveal(subtitle, {
          trigger: subtitle as HTMLElement,
          start: SCROLL_REVEAL_START,
          from: { y: getRevealY(28), opacity: 0 },
          duration: 0.88,
          delay: heading ? 0.1 : 0,
        })
      }
    }

    ctx = gsap.context(() => {
      if (options.setup) {
        options.setup({ gsap, ScrollTrigger, reveal, revealHeader })
        return
      }

      const preset = options.preset ?? 'standard'

      if (preset === 'split') {
        const imageEl = options.imageRef?.value
        const contentEl = options.contentRef?.value
        const headingEl = options.headingRef?.value
          ?? (options.headingSelector
            ? section.querySelector<HTMLElement>(options.headingSelector)
            : section.querySelector('h2'))

        if (headingEl) {
          reveal(headingEl, {
            trigger: headingEl as HTMLElement,
            start: SCROLL_REVEAL_START,
            from: { y: getRevealY(32), opacity: 0 },
            duration: 0.9,
          })
        }
        if (imageEl) {
          reveal(imageEl, {
            trigger: imageEl,
            start: SCROLL_REVEAL_START,
            from: getSplitRevealFrom('left'),
            duration: 0.95,
          })
        }
        if (contentEl) {
          reveal(contentEl, {
            trigger: contentEl,
            start: SCROLL_REVEAL_START,
            from: getSplitRevealFrom('right', { scale: 1 }),
            duration: 0.95,
          })
        }
        return
      }

      if (preset === 'cards') {
        const headingEl = options.headingRef?.value
          ?? (options.headingSelector
            ? section.querySelector<HTMLElement>(options.headingSelector)
            : section.querySelector('h2'))

        revealHeader(headingEl, options.subtitleRef?.value ?? null)

        const cardSelector = options.cardsSelector
          ?? 'article, [data-reveal-item], [data-pack-card], [data-event-card], .value-card, .grid > *'

        const cards = options.cardRefs?.value?.filter(Boolean)
          ?? (options.cardsContainerRef?.value
            ? Array.from(options.cardsContainerRef.value.querySelectorAll(cardSelector))
            : Array.from(section.querySelectorAll(cardSelector)))

        if (cards.length) {
          cards.forEach((card) => {
            reveal(card, {
              trigger: card as HTMLElement,
              start: SCROLL_REVEAL_START,
              from: { y: getRevealY(40), opacity: 0, scale: 0.96 },
              duration: 0.88,
            })
          })
        }
        return
      }

      if (preset === 'tables') {
        const headingEl = options.headingRef?.value
          ?? (options.headingSelector
            ? section.querySelector<HTMLElement>(options.headingSelector)
            : section.querySelector('h2'))

        revealHeader(headingEl, options.subtitleRef?.value ?? null)

        const tableSelector = options.tablesSelector ?? '.spec-table'
        const tables = options.tablesContainerRef?.value
          ? Array.from(options.tablesContainerRef.value.querySelectorAll(tableSelector))
          : Array.from(section.querySelectorAll(tableSelector))

        tables.forEach((tableEl, index) => {
          const table = tableEl as HTMLElement
          const thead = table.querySelector('thead')
          const rows = table.querySelectorAll('tbody tr')
          const tableDelay = index * 0.1

          gsap.fromTo(
            table,
            { y: getRevealY(52), autoAlpha: 0, scale: 0.96, force3D: true },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.92,
              ease: SCROLL_REVEAL_EASE,
              force3D: true,
              delay: tableDelay,
              scrollTrigger: {
                trigger: table,
                start: SCROLL_REVEAL_START,
                once: true,
              },
            },
          )

          if (thead) {
            gsap.fromTo(
              thead,
              { y: -14, autoAlpha: 0, force3D: true },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.74,
                ease: SCROLL_REVEAL_EASE,
                force3D: true,
                delay: 0.14 + tableDelay,
                scrollTrigger: {
                  trigger: table,
                  start: SCROLL_REVEAL_START,
                  once: true,
                },
              },
            )
          }

          if (rows.length) {
            gsap.fromTo(
              rows,
              { y: getRevealY(22), autoAlpha: 0, force3D: true },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.62,
                stagger: 0.045,
                ease: SCROLL_REVEAL_EASE,
                force3D: true,
                delay: 0.24 + tableDelay,
                scrollTrigger: {
                  trigger: table,
                  start: SCROLL_REVEAL_START,
                  once: true,
                },
              },
            )
          }
        })
        return
      }

      if (preset === 'cta') {
        const panelEl = options.panelRef?.value ?? section
        reveal(panelEl, {
          trigger: section,
          from: { y: getRevealY(48), opacity: 0, scale: 0.96 },
          duration: 1,
          start: SCROLL_REVEAL_START_CENTER,
        })

        const headingEl = options.headingRef?.value ?? section.querySelector('h2')
        const subtitleEl = options.subtitleRef?.value ?? section.querySelector('p')

        if (headingEl) {
          reveal(headingEl, {
            trigger: section,
            from: { y: getRevealY(28), opacity: 0 },
            duration: 0.85,
            delay: 0.1,
            start: SCROLL_REVEAL_START_CENTER,
          })
        }
        if (subtitleEl) {
          reveal(subtitleEl, {
            trigger: section,
            from: { y: getRevealY(22), opacity: 0 },
            duration: 0.85,
            delay: 0.2,
            start: SCROLL_REVEAL_START_CENTER,
          })
        }
        return
      }

      // standard: heading + subtitle + any grid children
      const headingEl = options.headingRef?.value ?? section.querySelector('h1, h2')
      const subtitleEl = options.subtitleRef?.value
        ?? headingEl?.nextElementSibling?.matches('p')
          ? headingEl.nextElementSibling
          : section.querySelector('.container > p, .container p.text-center')

      revealHeader(headingEl, subtitleEl as Element | null)

      const items = section.querySelectorAll(
        'article, .grid > *, ul.grid > li, [data-reveal-item]',
      )
      if (items.length) {
        items.forEach((item) => {
          reveal(item, {
            trigger: item as HTMLElement,
            start: SCROLL_REVEAL_START,
            from: { y: getRevealY(32), opacity: 0 },
            duration: 0.85,
          })
        })
      }
    }, section)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })
}
