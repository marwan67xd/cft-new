import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

const SCROLLBAR_IDLE_MS = 900

export default defineNuxtPlugin({
  name: 'smooth-scroll',
  dependsOn: ['gsap'],
  setup(nuxtApp) {
    if (!import.meta.client) return

    const root = document.documentElement
    let scrollbarTimer: number | null = null

    const showScrollbar = () => {
      root.classList.add('is-scrolling')
    }

    const hideScrollbar = () => {
      root.classList.remove('is-scrolling')
    }

    const markScrollActivity = () => {
      showScrollbar()
      if (scrollbarTimer) window.clearTimeout(scrollbarTimer)
      scrollbarTimer = window.setTimeout(hideScrollbar, SCROLLBAR_IDLE_MS)
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      root.classList.add('is-scrolling')
      return
    }

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      anchors: true,
      autoResize: true,
    })

    const scroller = document.documentElement

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.animatedScroll
      },
      scrollLeft(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.animatedScroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: scroller.style.transform ? 'transform' : 'fixed',
    })

    lenis.on('scroll', () => {
      markScrollActivity()
      ScrollTrigger.update()
    })

    ScrollTrigger.addEventListener('refresh', () => {
      lenis.resize()
    })

    const onTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTicker)
    gsap.ticker.lagSmoothing(0)

    const onNativeScroll = () => markScrollActivity()
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    window.addEventListener('wheel', markScrollActivity, { passive: true })
    window.addEventListener('touchmove', markScrollActivity, { passive: true })

    ScrollTrigger.refresh()

    nuxtApp.hook('page:finish', () => {
      requestAnimationFrame(() => {
        lenis.resize()
        ScrollTrigger.refresh()
      })
    })

    nuxtApp.hook('app:beforeUnmount', () => {
      if (scrollbarTimer) window.clearTimeout(scrollbarTimer)
      window.removeEventListener('scroll', onNativeScroll)
      window.removeEventListener('wheel', markScrollActivity)
      window.removeEventListener('touchmove', markScrollActivity)
      lenis.destroy()
      gsap.ticker.remove(onTicker)
      ScrollTrigger.scrollerProxy(scroller, {})
      ScrollTrigger.clearScrollMemory()
      hideScrollbar()
    })

    return {
      provide: {
        lenis,
      },
    }
  },
})
