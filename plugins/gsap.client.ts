import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin({
  name: 'gsap',
  setup() {
    gsap.registerPlugin(ScrollTrigger)

    gsap.defaults({
      force3D: true,
      ease: 'power3.out',
    })

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    return {
      provide: {
        gsap,
        ScrollTrigger,
      },
    }
  },
})
