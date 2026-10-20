import React, { useState, useRef } from "react"
import { Radio, Sparkles, Compass, Pause, Play, ArrowUpRight, Layers } from "lucide-react"
import { RADAR_SIGNALS, type RadarSignalNode } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  useElementScrollProgress,
  usePrefersReducedMotion,
} from "@/hooks/useMotionPreferences"

interface CosmicRadarProps {
  selectedSignalId: string
  onSelectSignal: (id: string) => void
  onTestSynchronicity: (signal: RadarSignalNode) => void
}

interface TransformationPhase {
  id: number
  title: string
  code: string
  caption: string
  range: [number, number]
}

const TRANSFORMATION_PHASES: TransformationPhase[] = [
  {
    id: 1,
    title: "01. Обнаружение",
    code: "PHASE I // DETECTION",
    caption: "Космические сигналы на расстоянии. Сканирующий луч находит пульсирующую частоту.",
    range: [0, 0.16],
  },
  {
    id: 2,
    title: "02. Ответ",
    code: "PHASE II // RESPONSE",
    caption: "Вторая точка отвечает световым импульсом. Между сигналами зажигается тонкая линия связи.",
    range: [0.17, 0.33],
  },
  {
    id: 3,
    title: "03. Приближение",
    code: "PHASE III // APPROACH",
    caption: "Сигналы движутся по орбитальным дугам навстречу. Фокус камеры приближается к источнику.",
    range: [0.34, 0.50],
  },
  {
    id: 4,
    title: "04. Материализация",
    code: "PHASE IV // MATERIALIZATION",
    caption: "Световая точка раскрывается подобно диафрагме — внутри света проявляется живой человеческий взгляд.",
    range: [0.51, 0.67],
  },
  {
    id: 5,
    title: "05. Человеческая история",
    code: "PHASE V // HUMAN STORY",
    caption: "Сигнал обретает имя, характер, интонацию и индекс условной синхронности (DEMO).",
    range: [0.68, 0.84],
  },
  {
    id: 6,
    title: "06. Связь",
    code: "PHASE VI // RESONANCE LINK",
    caption: "Второй сигнал также материализуется в портрет. Световая орбитальная дуга соединяет двух людей.",
    range: [0.85, 1.0],
  },
]

export const CosmicRadar: React.FC<CosmicRadarProps> = ({
  selectedSignalId,
  onSelectSignal,
  onTestSynchronicity,
}) => {
  const scrollTheatreRef = useRef<HTMLDivElement | null>(null)
  const rawScrollProgress = useElementScrollProgress(scrollTheatreRef)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Allow manual override when user clicks a specific phase button or slider
  const [manualProgress, setManualProgress] = useState<number | null>(null)
  const [filterState, setFilterState] = useState<string>("ALL")
  const [isScanning, setIsScanning] = useState<boolean>(true)

  const progress =
    manualProgress !== null
      ? manualProgress
      : prefersReducedMotion
      ? 0.92
      : rawScrollProgress

  const currentPhaseIndex = Math.min(
    5,
    Math.max(0, Math.floor(progress * 5.99))
  )
  const currentPhase = TRANSFORMATION_PHASES[currentPhaseIndex]

  const filteredSignals =
    filterState === "ALL"
      ? RADAR_SIGNALS
      : RADAR_SIGNALS.filter((s) => s.stateKey === filterState)

  const activeSignal =
    RADAR_SIGNALS.find((s) => s.id === selectedSignalId) || RADAR_SIGNALS[0]

  const getCartesianPosition = (angleDeg: number, radiusPct: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    const r = (radiusPct / 100) * 42
    const x = 50 + r * Math.cos(rad)
    const y = 50 + r * Math.sin(rad)
    return { x, y }
  }

  // Primary & Secondary signals for the 6-phase transformation
  const primaryPerson = RADAR_SIGNALS[2] // Клара, 26 (signal-portrait-female.webp)
  const secondaryPerson = RADAR_SIGNALS[1] // Марк, 29 (signal-portrait-male.webp)

  // Interpolated values for the 6-phase transformation stage
  const lineOpacity = Math.min(1, Math.max(0, (progress - 0.14) / 0.2))
  const approachFactor = Math.min(1, Math.max(0, (progress - 0.28) / 0.25))
  const materializeFactor = Math.min(1, Math.max(0, (progress - 0.46) / 0.22))
  const storyFactor = Math.min(1, Math.max(0, (progress - 0.64) / 0.18))
  const dualConnectionFactor = Math.min(1, Math.max(0, (progress - 0.80) / 0.18))

  return (
    <section
      id="radar"
      className="relative scroll-mt-20 py-20 lg:py-28 bg-[#080910] border-t border-[#A79AFF]/10"
      aria-labelledby="radar-heading"
    >
      {/* Subtle Cosmic Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden"
        style={{
          backgroundImage: "url('./images/cosmic-environment.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle at center, black 25%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 25%, transparent 82%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                02 // SIGNAL DETECTED — WE FOUND A RESONANCE
              </span>
            </div>
            <h2
              id="radar-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              От далёкого сигнала —{" "}
              <span className="italic text-[#A79AFF]">
                к живому человеческому взгляду.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
            Прокручивайте сцену или переключайте фазы ниже: радар обнаруживает
            эмоциональный отклик, сближает траектории и материализует точки света
            в реальные человеческие истории.
          </p>
        </div>

        {/* =====================================================================
            PART A: SCROLL-DRIVEN 6-PHASE TRANSFORMATION THEATRE (SIGNAL -> HUMAN)
           ===================================================================== */}
        <div
          ref={scrollTheatreRef}
          onWheel={() => {
            if (manualProgress !== null) setManualProgress(null)
          }}
          className="relative lg:min-h-[210vh] mb-20"
        >
          <div className="lg:sticky lg:top-20 cosmic-glass rounded-[32px] border border-[#A79AFF]/30 p-5 sm:p-8 shadow-[0_0_90px_-20px_rgba(110,91,255,0.35)] overflow-hidden">
            {/* Top Phase Header & Progress Readout */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#A79AFF]/15">
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#F4F0FF]">
                  {currentPhase.code}
                </span>
                <Badge variant="signal">{currentPhase.title}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs text-[#A7A6B8]">
                  ТРАНСФОРМАЦИЯ: {Math.round(progress * 100)}%
                </span>
                {manualProgress !== null && (
                  <button
                    type="button"
                    onClick={() => setManualProgress(null)}
                    className="rounded-full bg-[#14182A] border border-[#A79AFF]/30 px-2.5 py-1 font-mono-tech text-[10px] text-[#A79AFF] hover:text-[#F4F0FF] cursor-pointer"
                  >
                    АВТО-СКРОЛЛ
                  </button>
                )}
              </div>
            </div>

            {/* 6-Phase Interactive Stepper Bar */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6"
              role="tablist"
              aria-label="Фазы трансформации сигнала в человека"
            >
              {TRANSFORMATION_PHASES.map((phase, idx) => {
                const isActive = idx === currentPhaseIndex
                const isPassed = idx < currentPhaseIndex
                const targetProgress = (phase.range[0] + phase.range[1]) / 2
                return (
                  <button
                    key={phase.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setManualProgress(targetProgress)}
                    className={`rounded-xl px-3 py-2 text-left transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#F4F0FF]/50 shadow-[0_0_20px_-4px_rgba(110,91,255,0.65)]"
                        : isPassed
                        ? "bg-[#14182A]/90 text-[#F4F0FF] border-[#A79AFF]/35"
                        : "bg-[#080910]/70 text-[#A7A6B8] border-[#A79AFF]/15 hover:text-[#F4F0FF]"
                    }`}
                  >
                    <span className="font-mono-tech text-[10px] block truncate">
                      {phase.title}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Central Visual Transformation Stage */}
            <div className="relative w-full min-h-[420px] sm:min-h-[470px] rounded-2xl bg-[#080910] border border-[#A79AFF]/20 overflow-hidden flex flex-col justify-between p-4 sm:p-8">
              {/* Background Radar & Orbital Trajectory SVG */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="phaseLinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F4F0FF" />
                    <stop offset="50%" stopColor="#A79AFF" />
                    <stop offset="100%" stopColor="#6E5BFF" />
                  </linearGradient>
                  <radialGradient id="signalCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F4F0FF" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#6E5BFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#080910" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Concentric Observatory Rings (recede gently as camera zooms in Phase 3-5) */}
                <g
                  style={{
                    transformOrigin: "500px 250px",
                    transform: `scale(${1 + approachFactor * 0.28})`,
                    opacity: Math.max(0.22, 0.85 - materializeFactor * 0.5),
                    transition: "transform 0.25s ease-out, opacity 0.25s ease-out",
                  }}
                >
                  <circle cx="500" cy="250" r="110" stroke="#A79AFF" strokeOpacity="0.25" strokeDasharray="4 6" />
                  <circle cx="500" cy="250" r="190" stroke="#6E5BFF" strokeOpacity="0.32" />
                  <circle cx="500" cy="250" r="280" stroke="#A79AFF" strokeOpacity="0.18" strokeDasharray="2 8" />
                  <circle cx="500" cy="250" r="380" stroke="#A79AFF" strokeOpacity="0.12" />
                  <line x1="80" y1="250" x2="920" y2="250" stroke="#A79AFF" strokeOpacity="0.12" />
                  <line x1="500" y1="20" x2="500" y2="480" stroke="#A79AFF" strokeOpacity="0.12" />
                </g>

                {/* Distant Ambient Signals (fade into background during Phase 3 Approach) */}
                <g style={{ opacity: Math.max(0.1, 1 - approachFactor * 0.85) }}>
                  <circle cx="190" cy="120" r="3.5" fill="#A79AFF" />
                  <text x="202" y="124" fill="#A7A6B8" fontSize="10" fontFamily="JetBrains Mono">
                    SIG // 12-CYG
                  </text>
                  <circle cx="810" cy="390" r="3.5" fill="#A79AFF" />
                  <text x="720" y="394" fill="#A7A6B8" fontSize="10" fontFamily="JetBrains Mono">
                    SIG // 19-AQU
                  </text>
                  <circle cx="760" cy="110" r="3" fill="#6E5BFF" />
                </g>

                {/* Phase 2 -> 6: Luminous Connection Arc Between Primary & Secondary Signal */}
                {lineOpacity > 0.02 && (
                  <g style={{ opacity: lineOpacity }}>
                    <path
                      d={`M ${310 + approachFactor * 40} 250 Q 500 ${
                        140 - dualConnectionFactor * 35
                      } ${690 - approachFactor * 40} 250`}
                      stroke="url(#phaseLinkGrad)"
                      strokeWidth={1.5 + dualConnectionFactor * 2}
                      strokeDasharray={dualConnectionFactor > 0.5 ? "none" : "6 5"}
                    />
                    <circle
                      cx="500"
                      cy={195 - dualConnectionFactor * 18}
                      r={4 + dualConnectionFactor * 3}
                      fill="#F4F0FF"
                    />
                  </g>
                )}
              </svg>

              {/* Top Overlay Status inside Canvas Stage */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech">
                <span className="text-[#A79AFF]">{currentPhase.caption}</span>
                <span className="rounded-full bg-[#14182A]/90 border border-[#A79AFF]/25 px-3 py-1 text-[10px] text-[#F4F0FF]">
                  DEMO СИМУЛЯЦИЯ СБЛИЖЕНИЯ
                </span>
              </div>

              {/* Center Stage: Morphing Signals -> Materialized Human Cards */}
              <div className="relative z-10 my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center max-w-4xl mx-auto w-full">
                {/* SIGNAL A -> CLARA PORTRAIT CARD */}
                <div className="flex flex-col items-center">
                  {/* Glowing Signal Point / Expanding Aperture Portrait */}
                  <div className="relative flex items-center justify-center">
                    {/* Pulse Halo */}
                    <div
                      className="pointer-events-none absolute rounded-full border border-[#A79AFF]/50 animate-signal-pulse"
                      style={{
                        width: `${64 + materializeFactor * 140}px`,
                        height: `${64 + materializeFactor * 140}px`,
                      }}
                      aria-hidden="true"
                    />

                    {/* Circular Aperture that expands from a 22px star dot to a 168px portrait frame */}
                    <div
                      className="relative overflow-hidden rounded-full border-2 border-[#F4F0FF]/80 shadow-[0_0_45px_rgba(110,91,255,0.65)] transition-all duration-300 bg-[#14182A] flex items-center justify-center"
                      style={{
                        width: `${28 + materializeFactor * 136}px`,
                        height: `${28 + materializeFactor * 136}px`,
                      }}
                    >
                      <img
                        src={primaryPerson.image}
                        alt={primaryPerson.imageAlt}
                        style={{
                          opacity: Math.max(0.15, materializeFactor),
                          transform: `scale(${1.35 - materializeFactor * 0.35})`,
                        }}
                        className="h-full w-full object-cover object-center transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Phase 5: Human Story Card Details */}
                  <div
                    className="mt-4 w-full max-w-sm rounded-2xl bg-[#0D0F18]/90 border border-[#A79AFF]/30 p-4 text-center transition-all duration-300"
                    style={{
                      opacity: Math.max(0.25, storyFactor),
                      transform: `translateY(${(1 - storyFactor) * 10}px)`,
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#A79AFF] mb-1">
                      <span>{primaryPerson.code}</span>
                      <span>SYNCHRONICITY: {primaryPerson.resonancePct}%</span>
                    </div>
                    <h3 className="font-editorial text-2xl text-[#F4F0FF]">
                      {primaryPerson.alias}, {primaryPerson.age}{" "}
                      <span className="text-xs font-mono-tech text-[#A7A6B8]">
                        (DEMO)
                      </span>
                    </h3>
                    <p className="mt-1 text-xs text-[#A7A6B8] font-light line-clamp-2">
                      «{primaryPerson.quote}»
                    </p>
                  </div>
                </div>

                {/* SIGNAL B -> MARK PORTRAIT CARD (Materializes in Phase 6) */}
                <div className="flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <div
                      className="pointer-events-none absolute rounded-full border border-[#6E5BFF]/50 animate-signal-pulse"
                      style={{
                        width: `${52 + dualConnectionFactor * 145}px`,
                        height: `${52 + dualConnectionFactor * 145}px`,
                        opacity: 0.3 + lineOpacity * 0.7,
                      }}
                      aria-hidden="true"
                    />

                    <div
                      className="relative overflow-hidden rounded-full border-2 border-[#A79AFF] shadow-[0_0_45px_rgba(167,154,255,0.55)] transition-all duration-300 bg-[#14182A] flex items-center justify-center"
                      style={{
                        width: `${24 + dualConnectionFactor * 140}px`,
                        height: `${24 + dualConnectionFactor * 140}px`,
                      }}
                    >
                      <img
                        src={secondaryPerson.image}
                        alt={secondaryPerson.imageAlt}
                        style={{
                          opacity: Math.max(0.1, dualConnectionFactor),
                          transform: `scale(${1.35 - dualConnectionFactor * 0.35})`,
                        }}
                        className="h-full w-full object-cover object-center transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div
                    className="mt-4 w-full max-w-sm rounded-2xl bg-[#0D0F18]/90 border border-[#A79AFF]/30 p-4 text-center transition-all duration-300"
                    style={{
                      opacity: Math.max(0.25, dualConnectionFactor),
                      transform: `translateY(${(1 - dualConnectionFactor) * 10}px)`,
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#A79AFF] mb-1">
                      <span>{secondaryPerson.code}</span>
                      <span>RESONANCE LINK: {secondaryPerson.resonancePct}%</span>
                    </div>
                    <h3 className="font-editorial text-2xl text-[#F4F0FF]">
                      {secondaryPerson.alias}, {secondaryPerson.age}{" "}
                      <span className="text-xs font-mono-tech text-[#A7A6B8]">
                        (DEMO)
                      </span>
                    </h3>
                    <p className="mt-1 text-xs text-[#A7A6B8] font-light line-clamp-2">
                      «{secondaryPerson.quote}»
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Scrubbing Slider at Bottom of Stage */}
              <div className="relative z-10 pt-3 border-t border-[#A79AFF]/15 flex flex-col sm:flex-row items-center gap-4">
                <label
                  htmlFor="signal-transformation-scrub"
                  className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#A7A6B8] text-center sm:text-left sm:whitespace-nowrap"
                >
                  УПРАВЛЕНИЕ ТРАНСФОРМАЦИЕЙ (ФАЗЫ 1–6):
                </label>
                <input
                  id="signal-transformation-scrub"
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(progress * 100)}
                  onChange={(e) => setManualProgress(Number(e.target.value) / 100)}
                  className="w-full h-2 rounded-lg appearance-none bg-[#14182A] accent-[#6E5BFF] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            PART B: INTERACTIVE SPATIAL RADAR EXPLORER
           ===================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-5 border-b border-[#A79AFF]/15">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Фильтр сигналов по состоянию"
          >
            {[
              { key: "ALL", label: "Все сигналы (4)" },
              { key: "Attraction", label: "Attraction" },
              { key: "Calm", label: "Calm" },
              { key: "Intimacy", label: "Intimacy" },
              { key: "Curiosity", label: "Curiosity" },
            ].map((item) => {
              const active = filterState === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setFilterState(item.key)
                    if (item.key !== "ALL") {
                      const match = RADAR_SIGNALS.find(
                        (s) => s.stateKey === item.key
                      )
                      if (match) onSelectSignal(match.id)
                    }
                  }}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 text-xs font-mono-tech uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    active
                      ? "bg-[#6E5BFF] text-[#F4F0FF] border border-[#A79AFF]/60 shadow-[0_0_20px_-4px_rgba(110,91,255,0.6)]"
                      : "bg-[#0D0F18]/90 text-[#A7A6B8] border border-[#A79AFF]/20 hover:text-[#F4F0FF] hover:border-[#A79AFF]/45"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsScanning((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-[#A79AFF]/25 bg-[#14182A]/70 px-4 py-2 text-xs font-mono-tech text-[#A7A6B8] hover:text-[#F4F0FF] hover:border-[#A79AFF]/50 transition-colors cursor-pointer"
            aria-pressed={!isScanning}
          >
            {isScanning ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
                <span>ПАУЗА СКАНИРОВАНИЯ</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
                <span>ВОЗОБНОВИТЬ РАДАР</span>
              </>
            )}
          </button>
        </div>

        {/* Main Interactive Grid: Radar Dial (Left) + Preview Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive Spatial Radar */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[560px] aspect-square rounded-full border border-[#A79AFF]/25 bg-gradient-to-b from-[#0D0F18] via-[#080910] to-[#14182A]/60 p-4 sm:p-8 shadow-[0_0_90px_-20px_rgba(110,91,255,0.28)] overflow-hidden">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 500 500"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="250" cy="250" r="225" stroke="#A79AFF" strokeOpacity="0.22" strokeWidth="1" />
                <circle
                  cx="250"
                  cy="250"
                  r="165"
                  stroke="#A79AFF"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle cx="250" cy="250" r="105" stroke="#6E5BFF" strokeOpacity="0.28" strokeWidth="1" />
                <circle
                  cx="250"
                  cy="250"
                  r="48"
                  stroke="#A79AFF"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                <line x1="25" y1="250" x2="475" y2="250" stroke="#A79AFF" strokeOpacity="0.14" strokeWidth="1" />
                <line x1="250" y1="25" x2="250" y2="475" stroke="#A79AFF" strokeOpacity="0.14" strokeWidth="1" />
                {(() => {
                  const pos = getCartesianPosition(
                    activeSignal.angleDeg,
                    activeSignal.radiusPct
                  )
                  const svgX = (pos.x / 100) * 500
                  const svgY = (pos.y / 100) * 500
                  return (
                    <g>
                      <line
                        x1="250"
                        y1="250"
                        x2={svgX}
                        y2={svgY}
                        stroke="#A79AFF"
                        strokeWidth="1.5"
                        strokeDasharray="3 4"
                      />
                      <circle
                        cx={svgX}
                        cy={svgY}
                        r="24"
                        stroke="#6E5BFF"
                        strokeOpacity="0.55"
                        strokeWidth="1"
                      />
                    </g>
                  )
                })()}
              </svg>

              {/* Rotating Radar Sweep Beam */}
              <div
                className={`pointer-events-none absolute inset-4 rounded-full ${
                  isScanning ? "animate-radar-sweep" : ""
                }`}
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, rgba(110, 91, 255, 0.24) 0deg, rgba(167, 154, 255, 0.06) 55deg, transparent 95deg, transparent 360deg)",
                }}
                aria-hidden="true"
              />

              <span
                className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 font-mono-tech text-[10px] tracking-[0.2em] text-[#A7A6B8]/70"
                aria-hidden="true"
              >
                0° N · ZENITH
              </span>
              <span
                className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono-tech text-[10px] tracking-[0.2em] text-[#A7A6B8]/70"
                aria-hidden="true"
              >
                180° S · NADIR
              </span>

              {/* Center Node */}
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                aria-hidden="true"
              >
                <span className="h-3.5 w-3.5 rounded-full bg-[#F4F0FF] shadow-[0_0_18px_4px_rgba(167,154,255,0.9)]" />
                <span className="hidden sm:inline-block mt-1.5 rounded bg-[#080910]/90 px-2 py-0.5 font-mono-tech text-[9px] uppercase tracking-widest text-[#A79AFF] border border-[#A79AFF]/25">
                  ВЫ · ЦЕНТР ОРБИТЫ
                </span>
              </div>

              {/* Interactive Signal Nodes */}
              {RADAR_SIGNALS.map((signal) => {
                const pos = getCartesianPosition(
                  signal.angleDeg,
                  signal.radiusPct
                )
                const isSelected = signal.id === activeSignal.id
                const isDimmed =
                  filterState !== "ALL" && signal.stateKey !== filterState

                return (
                  <button
                    key={signal.id}
                    type="button"
                    onClick={() => onSelectSignal(signal.id)}
                    onMouseEnter={() => onSelectSignal(signal.id)}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                    }}
                    aria-label={`Сигнал ${signal.alias}, резонанс ${signal.resonancePct}%, состояние ${signal.stateKey}`}
                    aria-pressed={isSelected}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F4F0FF] ${
                      isDimmed ? "opacity-25 scale-90" : "opacity-100"
                    }`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-1 rounded-full animate-signal-pulse ${
                        isSelected
                          ? "bg-[#6E5BFF]/55 ring-2 ring-[#F4F0FF]/80"
                          : "bg-[#A79AFF]/30"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative block rounded-full transition-transform duration-300 ${
                        isSelected
                          ? "h-4 w-4 bg-[#F4F0FF] shadow-[0_0_20px_5px_#6E5BFF] scale-125"
                          : "h-3 w-3 bg-[#A79AFF] shadow-[0_0_12px_2px_#6E5BFF] group-hover:scale-125 group-hover:bg-[#F4F0FF]"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono-tech text-[10px] transition-all ${
                        isSelected
                          ? "bg-[#6E5BFF] text-[#F4F0FF] shadow-lg opacity-100 block"
                          : "hidden sm:block bg-[#080910]/90 text-[#A7A6B8] border border-[#A79AFF]/25 opacity-85 group-hover:opacity-100"
                      }`}
                    >
                      {signal.alias.split(" ")[0]} · {signal.resonancePct}%
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile & Keyboard Quick-Select Signal Strip */}
            <div
              className="mt-6 w-full max-w-[560px] grid grid-cols-2 sm:grid-cols-4 gap-2.5"
              role="tablist"
              aria-label="Быстрый выбор сигнала на радаре"
            >
              {filteredSignals.map((sig) => {
                const isSelected = sig.id === activeSignal.id
                return (
                  <button
                    key={sig.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onSelectSignal(sig.id)}
                    className={`flex flex-col items-start rounded-2xl p-3 text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#14182A] border-[#A79AFF] shadow-[0_0_24px_-6px_rgba(110,91,255,0.45)]"
                        : "bg-[#0D0F18]/80 border-[#A79AFF]/15 hover:border-[#A79AFF]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono-tech text-[10px] text-[#A79AFF]">
                        {sig.resonancePct}%
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected
                            ? "bg-[#F4F0FF] shadow-[0_0_8px_#6E5BFF]"
                            : "bg-[#6E5BFF]/50"
                        }`}
                      />
                    </div>
                    <span className="mt-1 font-editorial text-base text-[#F4F0FF] truncate w-full">
                      {sig.alias.split(" ")[0]}
                    </span>
                    <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#A7A6B8]">
                      {sig.stateKey}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Active Signal Preview Card */}
          <div className="lg:col-span-5">
            <article
              aria-live="polite"
              className="cosmic-glass rounded-[28px] overflow-hidden border border-[#A79AFF]/30 shadow-[0_0_65px_-15px_rgba(110,91,255,0.3)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-[#080910]/70 border-b border-[#A79AFF]/15">
                <div className="flex items-center gap-2">
                  <Radio
                    className="h-4 w-4 text-[#A79AFF] animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-mono-tech text-xs tracking-[0.18em] text-[#F4F0FF]">
                    {activeSignal.code}
                  </span>
                </div>
                <Badge variant="subtle" className="text-[10px]">
                  КОНЦЕПТУАЛЬНЫЙ ПРОФИЛЬ · DEMO
                </Badge>
              </div>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0D0F18]">
                <img
                  src={activeSignal.image}
                  alt={activeSignal.imageAlt}
                  className="h-full w-full object-cover object-center transition-all duration-700"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0F18] via-[#0D0F18]/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A79AFF] block">
                      {activeSignal.coordinates}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F0FF] leading-tight">
                      {activeSignal.alias}, {activeSignal.age}
                    </h3>
                    <p className="text-xs font-mono-tech text-[#A7A6B8]">
                      {activeSignal.city}
                    </p>
                  </div>
                  <div className="text-right bg-[#080910]/85 backdrop-blur-md border border-[#A79AFF]/35 rounded-2xl px-3.5 py-2">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#A7A6B8] block">
                      РЕЗОНАНС
                    </span>
                    <span className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF]">
                      {activeSignal.resonancePct}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="signal">{activeSignal.stateLabel}</Badge>
                </div>

                <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#F4F0FF] leading-snug border-l-2 border-[#6E5BFF] pl-4">
                  «{activeSignal.quote}»
                </blockquote>

                <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                  {activeSignal.rhythmNote}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8] block">
                    СОВПАДАЮЩИЕ ИМПУЛЬСЫ:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeSignal.sharedImpulses.map((impulse) => (
                      <span
                        key={impulse}
                        className="rounded-full bg-[#14182A]/90 border border-[#A79AFF]/20 px-3 py-1 text-xs text-[#F4F0FF]"
                      >
                        {impulse}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A79AFF]/15 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => onTestSynchronicity(activeSignal)}
                  >
                    <Compass className="h-4 w-4" aria-hidden="true" />
                    <span>Перейти к Галактике и Синхронности</span>
                  </Button>
                  <Button
                    variant="orbital"
                    onClick={() => {
                      const el = document.getElementById("beta")
                      if (el) el.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                    <span>Откликнуться в Beta</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
