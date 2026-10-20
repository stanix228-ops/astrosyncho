import { useState, useEffect, type RefObject } from "react"

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}

/**
 * Tracks normalized scroll progress [0..1] through a sticky scroll-theatre container.
 * Uses passive scroll listener + rAF throttling so native scrolling is never hijacked.
 */
export function useElementScrollProgress(
  containerRef: RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    let rafId: number | null = null

    const updateProgress = () => {
      rafId = null
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollableDistance = Math.max(1, rect.height - viewportHeight)
      const scrolled = -rect.top
      const raw = Math.min(1, Math.max(0, scrolled / scrollableDistance))
      setProgress(raw)
    }

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize, { passive: true })

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [containerRef])

  return progress
}

/**
 * Tracks whether an element is currently visible in the viewport via IntersectionObserver.
 * Used both for pausing Canvas rAF loops when off-screen and for triggering entrance reveals.
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "100px"
): { isInView: boolean; hasEntered: boolean } {
  const [isInView, setIsInView] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true)
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasEntered(true)
        }
      },
      { rootMargin, threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return { isInView, hasEntered }
}
