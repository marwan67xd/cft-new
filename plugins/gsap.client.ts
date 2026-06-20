import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin({
  name: 'gsap',
  setup(nuxtApp) {
    gsap.registerPlugin(ScrollTrigger)

    gsap.defaults({
      force3D: true,
      ease: 'power3.out',
    })

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    let resizeTimer: number | null = null
    const onResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize, { passive: true })

    nuxtApp.hook('app:beforeUnmount', () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      if (resizeTimer) window.clearTimeout(resizeTimer)
    })

    return {
      provide: {
        gsap,
        ScrollTrigger,
      },
    }
  },
})
