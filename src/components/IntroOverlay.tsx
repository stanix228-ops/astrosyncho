import React, { useState, useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/useMotionPreferences"

interface IntroOverlayProps {
  onComplete: () => void
  durationMs?: number
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({
  onComplete,
  durationMs = 5000,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Silent fallback if autoplay policy intervenes
      })
    }

    // Animate subtle progress bar over durationMs
    const startTime = performance.now()
    let frameId: number

    const updateProgress = () => {
      const elapsed = performance.now() - startTime
      const currentProgress = Math.min(100, (elapsed / durationMs) * 100)
      setProgress(currentProgress)

      if (elapsed < durationMs) {
        frameId = requestAnimationFrame(updateProgress)
      }
    }
    frameId = requestAnimationFrame(updateProgress)

    // Trigger smooth fade out at durationMs
    const timer = setTimeout(() => {
      triggerFadeOut()
    }, durationMs)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        triggerFadeOut()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frameId)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [durationMs, prefersReducedMotion])

  const triggerFadeOut = () => {
    setIsFadingOut(true)
    // Wait for the 1000ms transition to finish before unmounting
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <aside
      aria-label="Вступительное видео AstroSyncho"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#080910] transition-opacity duration-1000 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Fullscreen Cinematic Intro Video */}
      <video
        ref={videoRef}
        src="./videos/intro_prolong_1080p_20261021124846.mp4"
        poster="./images/cosmic-environment.webp"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={triggerFadeOut}
        className="h-full w-full object-cover object-center"
      />

      {/* Subtle Bottom Progress Line & Skip Control */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center">
        {/* Skip button in bottom-right */}
        <div className="w-full max-w-[1400px] px-6 pb-6 sm:pb-8 flex justify-end">
          <button
            type="button"
            onClick={triggerFadeOut}
            className="pointer-events-auto rounded-none border border-[rgba(190,185,255,0.24)] bg-[#080910]/75 backdrop-blur-md px-3.5 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A1A2B5] hover:text-[#F4F3FA] hover:border-[#A79AFF] transition-colors cursor-pointer"
          >
            <span>ПРОПУСТИТЬ</span>
            <span className="hidden sm:inline text-[#A79AFF]/70 ml-1.5">
              · ESC
            </span>
          </button>
        </div>

        {/* 5-second animated progress line */}
        <div className="h-[2px] w-full bg-[rgba(190,185,255,0.12)]">
          <div
            className="h-full bg-gradient-to-r from-[#6E5BFF] via-[#A79AFF] to-[#A9D8FF] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  )
}
