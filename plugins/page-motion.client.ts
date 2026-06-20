export default defineNuxtPlugin({
  name: 'page-motion',
  dependsOn: ['gsap'],
  setup(nuxtApp) {
    if (!import.meta.client) return

    let motionTimer: number | null = null

    const schedulePageMotion = () => {
      if (motionTimer) window.clearTimeout(motionTimer)

      motionTimer = window.setTimeout(() => {
        const main = document.querySelector('main')
        void mountPageMotion(main as HTMLElement | null)
      }, 220)
    }

    nuxtApp.hook('page:finish', schedulePageMotion)
    nuxtApp.hook('app:beforeUnmount', () => {
      if (motionTimer) window.clearTimeout(motionTimer)
      teardownPageMotion()
    })

    schedulePageMotion()
  },
})
