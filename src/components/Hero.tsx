import React, { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "@/hooks/useMotionPreferences"

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersReducedMotion) {
      video.pause()
      return
    }
    video.play().catch(() => {
      // Autoplay fallback
    })
  }, [prefersReducedMotion])

  return (
    <section
      id="hero"
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#080910]"
      aria-label="AstroSyncho — Visual Immersion"
    >
      <video
        ref={videoRef}
        src="./videos/Animate_spacecraft_cockpit_background_1080p_20261020181703.mp4"
        poster="./images/cosmic-environment.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-center"
      />
    </section>
  )
}

