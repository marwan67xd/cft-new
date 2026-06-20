export const HOME_INTRO_KEY = 'cft-home-intro-played'
export const HOME_INTRO_START_EVENT = 'cft-home-intro-start'

export const HOME_INTRO_EASE = 'expo.out'
export const HOME_INTRO_DURATION = 1.35

export function shouldPlayHomeIntro(): boolean {
  if (!import.meta.client) return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasPlayedIntro = sessionStorage.getItem(HOME_INTRO_KEY) === '1'

  return !prefersReducedMotion && !hasPlayedIntro
}

export function markHomeIntroPlayed(): void {
  if (import.meta.client) {
    sessionStorage.setItem(HOME_INTRO_KEY, '1')
  }
}

export function dispatchHomeIntroStart(): void {
  if (import.meta.client) {
    window.dispatchEvent(new CustomEvent(HOME_INTRO_START_EVENT))
  }
}
