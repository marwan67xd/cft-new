import type { gsap as GSAP } from 'gsap'
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof GSAP
    $ScrollTrigger: typeof ST
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gsap: typeof GSAP
    $ScrollTrigger: typeof ST
  }
}


export {}
