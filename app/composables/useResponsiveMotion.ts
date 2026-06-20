export const MOTION_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export function getViewportWidth(): number {
  if (!import.meta.client) return MOTION_BREAKPOINTS.xl
  return window.innerWidth
}

export function isMobileViewport(): boolean {
  return getViewportWidth() < MOTION_BREAKPOINTS.lg
}

export function isTabletViewport(): boolean {
  const width = getViewportWidth()
  return width >= MOTION_BREAKPOINTS.md && width < MOTION_BREAKPOINTS.lg
}

/** Scale motion distance based on viewport — keeps animations proportional on small screens. */
export function scaleMotion(value: number): number {
  const width = getViewportWidth()
  if (width >= MOTION_BREAKPOINTS.xl) return value
  if (width >= MOTION_BREAKPOINTS.lg) return Math.round(value * 0.9)
  if (width >= MOTION_BREAKPOINTS.md) return Math.round(value * 0.75)
  if (width >= MOTION_BREAKPOINTS.sm) return Math.round(value * 0.6)
  return Math.round(value * 0.5)
}

/** Parallax Y offset — gentler on mobile to avoid jank and overflow. */
export function getParallaxY(): string {
  const width = getViewportWidth()
  if (width < MOTION_BREAKPOINTS.sm) return '5%'
  if (width < MOTION_BREAKPOINTS.lg) return '8%'
  return '15%'
}

/** Split-layout reveal: horizontal on desktop, vertical on mobile/tablet. */
export function getSplitRevealFrom(side: 'left' | 'right', options?: { scale?: number }) {
  const scale = options?.scale ?? 0.97

  if (isMobileViewport()) {
    return { x: 0, y: scaleMotion(32), opacity: 0, scale }
  }

  return side === 'left'
    ? { x: -scaleMotion(48), y: 0, opacity: 0, scale }
    : { x: scaleMotion(48), y: 0, opacity: 0, scale }
}

/** Default scroll-reveal Y offset scaled for viewport. */
export function getRevealY(fallback = 40): number {
  return scaleMotion(fallback)
}
