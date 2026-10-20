import React, { useState, useEffect, useRef } from "react"
import { ArrowDownRight, Compass, Radio, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RADAR_SIGNALS } from "@/data/astroData"
import { usePrefersReducedMotion, useInView } from "@/hooks/useMotionPreferences"

interface HeroProps {
  onSelectRadarSignal: (signalId: string) => void
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

export const Hero: React.FC<HeroProps> = ({ onSelectRadarSignal }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { isInView } = useInView(sectionRef, "200px")

  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 })
  const [hoveredSignalId, setHoveredSignalId] = useState<string | null>(
    RADAR_SIGNALS[0].id
  )
  // Choreographed stage (0 -> 4) that completes within 1.4s without blocking interaction
  const [stage, setStage] = useState<number>(prefersReducedMotion ? 4 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(4)
      return
    }
    const t1 = window.setTimeout(() => setStage(1), 120) // Stars + scanning pulse
    const t2 = window.setTimeout(() => setStage(2), 380) // Logo geometric convergence + radar rings
    const t3 = window.setTimeout(() => setStage(3), 720) // Signals ignite + arc impulse + headline
    const t4 = window.setTimeout(() => setStage(4), 1100) // CTAs & continuous calm state
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [prefersReducedMotion])

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
    const starCount = isMobile ? 36 : 72
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
        const currentAlpha =
          s.alpha * (0.65 + 0.35 * Math.sin(s.phase))
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

  const activeHeroSignal =
    RADAR_SIGNALS.find((s) => s.id === hoveredSignalId) || RADAR_SIGNALS[0]

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-14 lg:pt-28 lg:pb-20 flex flex-col justify-between overflow-hidden bg-[#080910]"
      aria-label="AstroSyncho — Главный экран: Космическая обсерватория"
    >
      {/* Plane 1: Deep Space Multi-Depth Canvas Starfield */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
        aria-hidden="true"
      />

      {/* Plane 2: Ambient Nebula & Initial Scanning Light Pulse */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-36 right-[-8%] h-[600px] w-[600px] rounded-full opacity-35 blur-[125px] transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(110,91,255,0.46) 0%, rgba(20,24,42,0.12) 70%, transparent 100%)",
            transform: `translate(${pointerOffset.x * -1.1}px, ${pointerOffset.y * -1.1}px)`,
          }}
        />
        <div
          className="absolute bottom-[-18%] left-[4%] h-[500px] w-[500px] rounded-full opacity-25 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(167,154,255,0.32) 0%, rgba(13,15,24,0.05) 70%, transparent 100%)",
          }}
        />

        {/* Step 3: Soft Scanning Horizontal/Radial Pulse Wave */}
        <div
          className={`absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#A79AFF]/55 to-transparent transition-all duration-1000 ease-out ${
            stage >= 1 ? "top-[88%] opacity-0" : "top-[18%] opacity-80"
          }`}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (7 Cols): Editorial Typography & Choreographed Reveal */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Badge
                variant="signal"
                className="text-[10px] sm:text-[11px] px-2.5 sm:px-3"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#A79AFF] animate-ping shrink-0"
                  aria-hidden="true"
                />
                <span>THE UNIVERSE IS LISTENING</span>
              </Badge>
              <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                01 // A SIGNAL IS WAITING
              </span>
            </div>

            {/* Steps 4 & 5: Expressive AstroSyncho Wordmark with Graceful Geometric Fragment Convergence */}
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

              {/* Step 9: Sequential Headline Reveal */}
              <h1 className="font-editorial text-4xl sm:text-6xl xl:text-[72px] font-normal tracking-[-0.02em] text-[#F4F0FF] leading-[1.02]">
                <span className="block">Где-то во Вселенной</span>
                <span className="block mt-1">
                  звучит{" "}
                  <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#F4F0FF] via-[#A79AFF] to-[#6E5BFF]">
                    твой сигнал.
                  </span>
                </span>
              </h1>
            </div>

            {/* Step 10: Description & CTAs */}
            <p className="max-w-xl text-base sm:text-lg lg:text-[18px] text-[#A7A6B8] font-light leading-relaxed">
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
              >
                <Compass className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span>Начать трансформацию сигнала</span>
              </Button>
            </div>

            {/* Telemetry Bar */}
            <div className="pt-4 sm:pt-5 border-t border-[#A79AFF]/15 w-full grid grid-cols-1 min-[400px]:grid-cols-3 gap-3.5 sm:gap-4 max-w-xl">
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

          {/* Right Column (5 Cols): Steps 6, 7, 8 — Interactive Hero Radar Observatory + Portrait Resonance */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-[540px] lg:max-w-none rounded-[30px] overflow-hidden border border-[#A79AFF]/30 bg-[#0D0F18] shadow-[0_0_80px_-15px_rgba(110,91,255,0.38)] transition-transform duration-500 ease-out"
              style={{
                transform: `translate(${pointerOffset.x * 0.45}px, ${pointerOffset.y * 0.45}px)`,
              }}
            >
              {/* Top Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-[#080910]/85 backdrop-blur-md border border-[#A79AFF]/30 px-3 py-1 font-mono-tech text-[10px] tracking-[0.16em] text-[#F4F0FF]">
                  {activeHeroSignal.code} · {activeHeroSignal.resonancePct}%
                </span>
                <span className="rounded-full bg-[#080910]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#A79AFF]">
                  LIVE RADAR
                </span>
              </div>

              {/* Hero Visual Stage: Editorial Portrait + Interactive Radar & Arc Impulse Overlay */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/4.3] w-full overflow-hidden">
                <img
                  src="./images/hero-portrait.webp"
                  alt="Кинематографический портрет молодой женщины в полуночно-синем и фиолетовом освещении"
                  className="h-full w-full object-cover object-[62%_center] scale-[1.03] transition-transform duration-1000"
                  fetchPriority="high"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910] via-[#080910]/30 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080910]/60 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Step 6 & 8: Concentric Radar Rings + Luminous Arc Impulse SVG */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 400 430"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="heroImpulseArc" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F4F0FF" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#A79AFF" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#6E5BFF" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Concentric Radar Rings */}
                  <circle
                    cx="230"
                    cy="195"
                    r="78"
                    stroke="#A79AFF"
                    strokeOpacity="0.32"
                    strokeWidth="0.75"
                    strokeDasharray="3 5"
                  />
                  <circle
                    cx="230"
                    cy="195"
                    r="128"
                    stroke="#6E5BFF"
                    strokeOpacity="0.45"
                    strokeWidth="0.9"
                  />
                  <circle
                    cx="230"
                    cy="195"
                    r="175"
                    stroke="#A79AFF"
                    strokeOpacity="0.22"
                    strokeWidth="0.7"
                    strokeDasharray="2 6"
                  />

                  {/* Coordinate Crosshairs */}
                  <line
                    x1="40"
                    y1="195"
                    x2="380"
                    y2="195"
                    stroke="#A79AFF"
                    strokeOpacity="0.18"
                    strokeWidth="0.6"
                  />
                  <line
                    x1="230"
                    y1="20"
                    x2="230"
                    y2="370"
                    stroke="#A79AFF"
                    strokeOpacity="0.18"
                    strokeWidth="0.6"
                  />

                  {/* Step 8: Curved Luminous Arc Impulse Connecting Two Signals */}
                  <path
                    d="M 118 142 Q 195 75 292 128"
                    stroke="url(#heroImpulseArc)"
                    strokeWidth="1.8"
                    strokeDasharray="5 4"
                  />
                  <path
                    d="M 118 142 Q 182 245 278 268"
                    stroke="#A79AFF"
                    strokeOpacity="0.38"
                    strokeWidth="1"
                  />
                </svg>

                {/* Step 7: Interactive Signal Hotspots on the Hero Radar */}
                {[
                  {
                    signal: RADAR_SIGNALS[0],
                    left: "29.5%",
                    top: "33%",
                  },
                  {
                    signal: RADAR_SIGNALS[1],
                    left: "73%",
                    top: "29.8%",
                  },
                  {
                    signal: RADAR_SIGNALS[2],
                    left: "69.5%",
                    top: "62.3%",
                  },
                ].map(({ signal, left, top }) => {
                  const isActive = activeHeroSignal.id === signal.id
                  return (
                    <button
                      key={signal.id}
                      type="button"
                      style={{ left, top }}
                      onMouseEnter={() => setHoveredSignalId(signal.id)}
                      onFocus={() => setHoveredSignalId(signal.id)}
                      onClick={() => {
                        onSelectRadarSignal(signal.id)
                        scrollTo("radar")
                      }}
                      aria-label={`Сигнал ${signal.alias}, резонанс ${signal.resonancePct}%. Нажмите для перехода к трансформации сигнала`}
                      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F4F0FF]"
                    >
                      <span
                        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#6E5BFF]/50 scale-125 ring-1 ring-[#F4F0FF]"
                            : "bg-[#A79AFF]/25 group-hover:scale-125"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`relative block h-3 w-3 rounded-full transition-transform ${
                          isActive
                            ? "bg-[#F4F0FF] scale-125 shadow-[0_0_16px_4px_#6E5BFF]"
                            : "bg-[#A79AFF] group-hover:bg-[#F4F0FF]"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono-tech text-[9px] tracking-wider transition-all ${
                          isActive
                            ? "bg-[#6E5BFF] text-[#F4F0FF] opacity-100 shadow-md"
                            : "bg-[#080910]/90 text-[#A7A6B8] border border-[#A79AFF]/30 opacity-80 group-hover:opacity-100"
                        }`}
                      >
                        {signal.alias.split(" ")[0]} · {signal.resonancePct}%
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Bottom Interactive Signal Inspector Inside Hero Frame */}
              <div className="relative z-20 p-5 sm:p-6 bg-gradient-to-t from-[#080910] via-[#0D0F18]/95 to-[#0D0F18]/85 border-t border-[#A79AFF]/20">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#6E5BFF] shadow-[0_0_10px_#6E5BFF]" />
                    <span className="font-editorial text-xl text-[#F4F0FF]">
                      {activeHeroSignal.alias}, {activeHeroSignal.age} ·{" "}
                      {activeHeroSignal.stateKey}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#A79AFF]">
                    {activeHeroSignal.resonancePct}% РЕЗОНАНС
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A7A6B8] font-light line-clamp-2 mb-4">
                  «{activeHeroSignal.quote}»
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A7A6B8] flex items-center gap-1.5">
                    <Radio className="h-3 w-3 text-[#A79AFF]" aria-hidden="true" />
                    Активные сигналы в секторе:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {RADAR_SIGNALS.slice(0, 3).map((sig) => {
                      const active = activeHeroSignal.id === sig.id
                      return (
                        <button
                          key={sig.id}
                          type="button"
                          onMouseEnter={() => setHoveredSignalId(sig.id)}
                          onClick={() => {
                            onSelectRadarSignal(sig.id)
                            scrollTo("radar")
                          }}
                          className={`rounded-full px-2.5 py-1 font-mono-tech text-[10px] transition-all cursor-pointer border ${
                            active
                              ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#A79AFF]"
                              : "bg-[#14182A] text-[#A7A6B8] border-[#A79AFF]/25 hover:text-[#F4F0FF]"
                          }`}
                        >
                          {sig.alias.split(" ")[0]} · {sig.resonancePct}%
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unobtrusive Scroll Indicator */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-6 flex items-center justify-between text-xs font-mono-tech text-[#A7A6B8]/80">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6E5BFF]" />
          <span>SCROLL TO EXPERIENCE: ОБНАРУЖЕНИЕ → МАТЕРИАЛИЗАЦИЯ → СВЯЗЬ</span>
        </div>
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
