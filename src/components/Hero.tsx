import React, { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion, useInView } from "@/hooks/useMotionPreferences"

interface HeroProps {
  onSelectRadarSignal?: (signalId: string) => void
}

interface StarParticle {
  x: number
  y: number
  z: number
  radius: number
  alpha: number
  twinkleSpeed: number
  phase: number
}

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { isInView } = useInView(sectionRef, "200px")

  const [stage, setStage] = useState<number>(prefersReducedMotion ? 4 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(4)
      return
    }
    const t1 = window.setTimeout(() => setStage(1), 100)
    const t2 = window.setTimeout(() => setStage(2), 320)
    const t3 = window.setTimeout(() => setStage(3), 620)
    const t4 = window.setTimeout(() => setStage(4), 950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [prefersReducedMotion])

  // Ensure background cockpit video plays smoothly when in view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersReducedMotion) {
      video.pause()
      return
    }
    if (isInView) {
      video.play().catch(() => {
        // Silent fallback if browser autoplay policy intervenes
      })
    } else {
      video.pause()
    }
  }, [isInView, prefersReducedMotion])

  // Subtle ambient starlight layer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number | null = null
    let width = 0
    let height = 0
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 24 : 48
    const stars: StarParticle[] = []

    const initStars = (w: number, h: number) => {
      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        const z = 0.25 + Math.random() * 0.75
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          radius: (0.5 + Math.random() * 1.1) * z,
          alpha: 0.15 + Math.random() * 0.5,
          twinkleSpeed: 0.007 + Math.random() * 0.015,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars(width, height)
    }

    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.phase += s.twinkleSpeed
          s.y -= 0.05 * s.z
          if (s.y < 0) s.y = height
        }
        const currentAlpha = s.alpha * (0.65 + 0.35 * Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          s.z > 0.75
            ? `rgba(244, 240, 255, ${currentAlpha.toFixed(2)})`
            : `rgba(167, 154, 255, ${(currentAlpha * 0.75).toFixed(2)})`
        ctx.fill()
      }

      if (!prefersReducedMotion && isInView) {
        animationFrameId = window.requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [prefersReducedMotion, isInView])

  const handlePrimaryCtaClick = () => {
    const betaSection = document.getElementById("beta")
    if (betaSection) {
      betaSection.scrollIntoView({ behavior: "smooth" })
      window.setTimeout(() => {
        const aliasInput = document.getElementById(
          "beta-alias"
        ) as HTMLInputElement | null
        if (aliasInput) {
          aliasInput.focus({ preventScroll: true })
        }
      }, 650)
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 flex items-center overflow-hidden bg-[#080910]"
      aria-label="AstroSyncho — Твоя Вселенная. Твоё притяжение."
    >
      {/* Plane 0: Full-Screen Spacecraft Cockpit Video Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
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
        {/* Left-Side Negative Space Safe-Area Gradient & Mobile Readability Scrim */}
        <div className="absolute inset-0 bg-[#080910]/55 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#080910]/92 sm:via-[#080910]/65 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080910] via-transparent to-[#080910]/50" />
      </div>

      {/* Plane 1: Subtle Deep-Space Starfield */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
      />

      {/* Main Content Container — Left-Side Safe Area of Spacecraft Cockpit */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[500px] md:max-w-[430px] lg:max-w-[560px] flex flex-col items-start text-left">
          {/* 1. Brand Identity: ASTROSYNCHO */}
          <div
            className={`inline-flex items-center gap-2.5 transition-all duration-700 ${
              stage >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <span
              className="relative flex h-5 w-5 items-center justify-center"
              aria-hidden="true"
            >
              <span className="absolute h-4 w-4 rounded-full border border-[#A79AFF]/55" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4F0FF] shadow-[0_0_8px_#6E5BFF]" />
            </span>
            <span className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.28em] text-[#F4F0FF]/90">
              ASTROSYNCHO
            </span>
          </div>

          {/* 2. Small Eyebrow Label: YOUR UNIVERSE. YOUR CONNECTION. */}
          <p
            className={`mt-3 font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#A79AFF] transition-all duration-700 ${
              stage >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            YOUR UNIVERSE. YOUR CONNECTION.
          </p>

          {/* 3. Main Headline: Твоя Вселенная. Твоё притяжение. */}
          <h1
            className={`mt-4 sm:mt-5 font-editorial text-4xl sm:text-5xl lg:text-[66px] font-normal tracking-[-0.015em] text-[#F4F0FF] leading-[1.04] transition-all duration-700 ${
              stage >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="block">Твоя Вселенная.</span>
            <span className="block mt-1 italic font-light text-[#E9E4FF]">
              Твоё притяжение.
            </span>
          </h1>

          {/* 4. Supporting Text */}
          <p
            className={`mt-5 sm:mt-6 max-w-[520px] font-sans text-base sm:text-lg lg:text-[19px] text-[#F4F0FF]/85 font-light leading-[1.6] transition-all duration-700 ${
              stage >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            Открой новые знакомства за пределами привычного. Найди человека, с
            которым совпадает нечто большее.
          </p>

          {/* 5. Primary CTA & 6. Secondary Microcopy Below the Button */}
          <div
            className={`mt-8 sm:mt-9 flex flex-col items-start gap-3 w-full sm:w-auto transition-all duration-700 ${
              stage >= 4
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handlePrimaryCtaClick}
              aria-label="Найти своё притяжение — перейти к форме участия в открытой бете"
              className="group w-full sm:w-auto px-8 text-[15px]"
            >
              <span>Найти своё притяжение</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>

            <span className="pl-1 font-sans text-xs sm:text-[13px] font-normal tracking-[0.04em] text-[#A7A6B8]">
              Открытая бета · Присоединяйся к исследованию
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
