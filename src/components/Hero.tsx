import React, { useState, useEffect, useRef } from "react"
import { ArrowDownRight, Compass, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion, useInView } from "@/hooks/useMotionPreferences"

interface HeroProps {
  onSelectRadarSignal?: (signalId: string) => void
}

interface StarParticle {
  x: number
  y: number
  z: number // depth 0.2 .. 1.0
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

  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 })
  // Choreographed stage (0 -> 4) that completes within 1.4s without blocking interaction
  const [stage, setStage] = useState<number>(prefersReducedMotion ? 4 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(4)
      return
    }
    const t1 = window.setTimeout(() => setStage(1), 120) // Stars + scanning pulse
    const t2 = window.setTimeout(() => setStage(2), 380) // Logo geometric convergence
    const t3 = window.setTimeout(() => setStage(3), 720) // Headline
    const t4 = window.setTimeout(() => setStage(4), 1100) // CTAs & continuous calm state
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [prefersReducedMotion])

  // Ensure background video plays smoothly when in view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersReducedMotion) {
      video.pause()
      return
    }
    if (isInView) {
      video.play().catch(() => {
        // Autoplay fallback handled silently by browser if blocked
      })
    } else {
      video.pause()
    }
  }, [isInView, prefersReducedMotion])

  // Lightweight Canvas Starfield with depth planes & devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number | null = null
    let width = 0
    let height = 0
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 32 : 64
    const stars: StarParticle[] = []

    const initStars = (w: number, h: number) => {
      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        const z = 0.25 + Math.random() * 0.75
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          radius: (0.6 + Math.random() * 1.3) * z,
          alpha: 0.2 + Math.random() * 0.65,
          twinkleSpeed: 0.008 + Math.random() * 0.018,
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
          s.y -= 0.06 * s.z
          if (s.y < 0) s.y = height
        }
        const currentAlpha = s.alpha * (0.65 + 0.35 * Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          s.z > 0.75
            ? `rgba(244, 240, 255, ${currentAlpha.toFixed(2)})`
            : `rgba(167, 154, 255, ${(currentAlpha * 0.8).toFixed(2)})`
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    setPointerOffset({ x: normX * 18, y: normY * 18 })
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-14 lg:pt-28 lg:pb-20 flex flex-col justify-between overflow-hidden bg-[#080910]"
      aria-label="AstroSyncho — Главный экран: Космическая обсерватория"
    >
      {/* Plane 0: Full-Screen Cinematic Hero Loop Video */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src="./videos/AstroSyncho_cinematic_hero_loop_1080p_20261020180017.mp4"
          poster="./images/cosmic-environment.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />
        {/* Cinematic Contrast & Edge Blending Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080910]/85 via-[#080910]/50 to-[#080910]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080910] via-transparent to-[#080910]/55" />
      </div>

      {/* Plane 1: Deep Space Multi-Depth Canvas Starfield */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
        aria-hidden="true"
      />

      {/* Plane 2: Ambient Nebula & Initial Scanning Light Pulse */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-36 right-[-8%] h-[600px] w-[600px] rounded-full opacity-25 blur-[125px] transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(110,91,255,0.46) 0%, rgba(20,24,42,0.12) 70%, transparent 100%)",
            transform: `translate(${pointerOffset.x * -1.1}px, ${pointerOffset.y * -1.1}px)`,
          }}
        />

        {/* Soft Scanning Horizontal Pulse Wave */}
        <div
          className={`absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#A79AFF]/55 to-transparent transition-all duration-1000 ease-out ${
            stage >= 1 ? "top-[88%] opacity-0" : "top-[18%] opacity-80"
          }`}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Editorial Typography & Choreographed Reveal */}
          <div className="lg:col-span-8 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            {/* Expressive AstroSyncho Wordmark with Graceful Geometric Fragment Convergence */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative inline-flex items-center gap-3">
                {/* Geometric Fragments that converge into the brand mark */}
                <span
                  className="relative flex h-8 w-8 items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute h-2 w-2 rotate-45 border border-[#A79AFF] transition-all duration-700 ${
                      stage >= 2
                        ? "translate-x-0 translate-y-0 opacity-90 scale-100"
                        : "-translate-x-4 -translate-y-3 opacity-40 scale-150"
                    }`}
                  />
                  <span
                    className={`absolute h-4 w-4 rounded-full border border-[#6E5BFF]/70 transition-all duration-700 ${
                      stage >= 2
                        ? "translate-x-0 translate-y-0 opacity-100 scale-100"
                        : "translate-x-5 translate-y-2 opacity-30 scale-150"
                    }`}
                  />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4F0FF] shadow-[0_0_10px_#6E5BFF]" />
                </span>

                <span
                  className={`font-brand italic text-2xl sm:text-3xl text-[#A79AFF] tracking-[0.06em] transition-all duration-700 ${
                    stage >= 2
                      ? "tracking-[0.06em] opacity-100 blur-0"
                      : "tracking-[0.28em] opacity-60 blur-[1px]"
                  }`}
                >
                  AstroSyncho
                </span>
              </div>

              {/* Sequential Headline Reveal */}
              <h1 className="font-editorial text-4xl sm:text-6xl xl:text-[76px] font-normal tracking-[-0.02em] text-[#F4F0FF] leading-[1.02]">
                <span className="block">Где-то во Вселенной</span>
                <span className="block mt-1">
                  звучит{" "}
                  <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#F4F0FF] via-[#A79AFF] to-[#6E5BFF]">
                    твой сигнал.
                  </span>
                </span>
              </h1>
            </div>

            {/* Description & CTAs */}
            <p className="max-w-xl text-base sm:text-lg lg:text-[18px] text-[#F4F0FF]/85 font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(8,9,16,0.8)]">
              Не случайность, а синхронность. Премиальное пространство знакомств,
              в котором космический радар обнаруживает людей со схожей частотой
              внутреннего ритма, а далёкие сигналы превращаются в живые
              человеческие истории.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-1">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo("beta")}
                className="group"
              >
                <Sparkles
                  className="h-4 w-4 transition-transform group-hover:rotate-12"
                  aria-hidden="true"
                />
                <span>Присоединиться к Open Beta</span>
                <ArrowDownRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>

              <Button
                variant="orbital"
                size="lg"
                onClick={() => scrollTo("radar")}
                className="backdrop-blur-md bg-[#0D0F18]/75"
              >
                <Compass className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span>Начать трансформацию сигнала</span>
              </Button>
            </div>

            {/* Telemetry Bar */}
            <div className="pt-4 sm:pt-5 border-t border-[#A79AFF]/20 w-full grid grid-cols-1 min-[400px]:grid-cols-3 gap-3.5 sm:gap-4 max-w-xl">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  01 · COSMIC RADAR
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Поиск резонанса
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  02 · SIGNAL TO HUMAN
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  От точки к взгляду
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  03 · LIVING GALAXY
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Орбиты близости
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Link */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-6 flex items-center justify-end text-xs font-mono-tech text-[#A7A6B8]/80">
        <a
          href="#radar"
          onClick={(e) => {
            e.preventDefault()
            scrollTo("radar")
          }}
          className="hidden sm:inline-flex items-center gap-2 text-[#A79AFF] hover:text-[#F4F0FF] transition-colors"
        >
          <span>К ТРАНСФОРМАЦИИ СИГНАЛА</span>
          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
