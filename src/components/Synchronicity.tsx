import React, { useState, useRef } from "react"
import { Sparkles, Orbit, Info, ArrowRight, Compass, Radio } from "lucide-react"
import { type RadarSignalNode } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePrefersReducedMotion } from "@/hooks/useMotionPreferences"

interface SynchronicityProps {
  partnerSignal: RadarSignalNode
  onSelectSignal?: (id: string) => void
}

interface GalaxyPlanet {
  id: string
  signalId: string
  name: string
  title: string
  cx: number
  cy: number
  radius: number
  orbitRx: number
  orbitRy: number
  orbitTilt: number
  color: string
  resonance: number
  constellationTag: string
  description: string
  linkedTo: string[]
}

const GALAXY_PLANETS: GalaxyPlanet[] = [
  {
    id: "planet-lyra",
    signalId: "sig-lyra",
    name: "Планета Лира · Элина",
    title: "Вечерний резонанс · Attraction",
    cx: 240,
    cy: 185,
    radius: 13,
    orbitRx: 150,
    orbitRy: 82,
    orbitTilt: -14,
    color: "#A79AFF",
    resonance: 96.4,
    constellationTag: "СОЗВЕЗДИЕ ЛИРЫ · 0.42 AU",
    description:
      "Притягивает полуночные разговоры, аналоговое звучание и людей, умеющих слышать тишину между словами.",
    linkedTo: ["planet-vega", "planet-cygnus"],
  },
  {
    id: "planet-vega",
    signalId: "sig-orion",
    name: "Планета Вега · Марк",
    title: "Спокойная гравитация · Calm",
    cx: 485,
    cy: 150,
    radius: 11,
    orbitRx: 175,
    orbitRy: 95,
    orbitTilt: 18,
    color: "#6E5BFF",
    resonance: 93.8,
    constellationTag: "ВЕКТОР ОРИОНА · 0.61 AU",
    description:
      "Устойчивая орбита для тех, кто ценит бережное отношение к личным границам, камерную архитектуру и неспешное сближение.",
    linkedTo: ["planet-lyra", "planet-altair"],
  },
  {
    id: "planet-cygnus",
    signalId: "sig-cygnus",
    name: "Планета Лебедь · Клара",
    title: "Камерный спектр · Intimacy",
    cx: 355,
    cy: 305,
    radius: 12,
    orbitRx: 140,
    orbitRy: 75,
    orbitTilt: 8,
    color: "#F4F0FF",
    resonance: 91.2,
    constellationTag: "СЕКТОР CYGNUS · 0.51 AU",
    description:
      "Чувствительность к интонациям, авторскому кино и редким эмоциональным импульсам без социальных масок.",
    linkedTo: ["planet-lyra", "planet-altair"],
  },
  {
    id: "planet-altair",
    signalId: "sig-altair",
    name: "Планета Альтаир · Нора и Даниэль",
    title: "Двойная система · Curiosity",
    cx: 625,
    cy: 275,
    radius: 10,
    orbitRx: 125,
    orbitRy: 68,
    orbitTilt: -22,
    color: "#A79AFF",
    resonance: 89.5,
    constellationTag: "ДВОЙНАЯ ОРБИТА · 0.74 AU",
    description:
      "Иллюстрация момента, когда два независимых сигнала уже образовали устойчивую общую траекторию.",
    linkedTo: ["planet-vega", "planet-cygnus"],
  },
]

const CONSTELLATION_STARS = [
  { x: 95, y: 80, r: 2 },
  { x: 155, y: 115, r: 2.5 },
  { x: 240, y: 185, r: 3 },
  { x: 380, y: 78, r: 2 },
  { x: 485, y: 150, r: 3 },
  { x: 660, y: 95, r: 2.2 },
  { x: 730, y: 185, r: 1.8 },
  { x: 140, y: 310, r: 2.2 },
  { x: 355, y: 305, r: 3 },
  { x: 625, y: 275, r: 2.5 },
]

const ALIGNMENT_PRESETS = [
  {
    label: "Дальнее приближение",
    value: 38,
    phaseTitle: "Периферийное касание траекторий",
    phaseNote:
      "Два человека существуют в параллельных ритмах города, но их эстетические и временные сигналы уже начинают сближаться.",
  },
  {
    label: "Гравитационный захват",
    value: 74,
    phaseTitle: "Пересечение эмоциональных орбит",
    phaseNote:
      "Совпадают вечерние часы активности, темп ведения диалога и отношение к личному пространству. Возникает устойчивый взаимный интерес.",
  },
  {
    label: "Полная синхронность",
    value: 96,
    phaseTitle: "Двойная резонансная система",
    phaseNote:
      "Орбиты формируют общий центр притяжения. Момент, когда не нужно объяснять интонацию или подбирать маску — сигнал принят без искажений.",
  },
]

export const Synchronicity: React.FC<SynchronicityProps> = ({
  partnerSignal,
  onSelectSignal,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const galaxyStageRef = useRef<HTMLDivElement | null>(null)

  const [activePlanetId, setActivePlanetId] = useState<string>("planet-lyra")
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 })
  const [convergence, setConvergence] = useState<number>(88)
  const [pulseCount, setPulseCount] = useState<number>(0)

  const activePlanet =
    GALAXY_PLANETS.find((p) => p.id === activePlanetId) || GALAXY_PLANETS[0]

  const handleGalaxyMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setCursorOffset({ x: nx * 22, y: ny * 22 })
  }

  const separation = Math.max(8, (100 - convergence) * 1.45)
  const leftCenterX = 300 - separation
  const rightCenterX = 300 + separation

  const rhythmScore = Math.min(99, Math.round(convergence * 0.98 + 2))
  const cadenceScore = Math.min(99, Math.round(convergence * 0.94 + 5))
  const boundaryScore = Math.min(99, Math.round(convergence * 0.96 + 3))

  const activePreset =
    convergence < 55
      ? ALIGNMENT_PRESETS[0]
      : convergence < 85
      ? ALIGNMENT_PRESETS[1]
      : ALIGNMENT_PRESETS[2]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="synchronicity"
      className="relative scroll-mt-20 py-24 lg:py-32 bg-[#0D0F18] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="synchronicity-heading"
    >
      {/* Ambient Violet Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[780px] rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,91,255,0.45) 0%, rgba(20,24,42,0.1) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                03 // GALAXY BUILDER & SYNCHRONICITY
              </span>
            </div>
            <h2
              id="synchronicity-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Живая галактика связей.{" "}
              <span className="italic text-[#A79AFF]">
                За пределами обычного совпадения.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
            Точки света превращаются в планеты и созвездия. Исследуйте живую
            систему курсором или касанием: выбирайте планеты, наблюдайте за
            синхронным резонансом орбит и управляйте их сближением.
          </p>
        </div>

        {/* =====================================================================
            PART 1: GALAXY BUILDER — INTERACTIVE CONSTELLATION & PLANETARY SYSTEM
           ===================================================================== */}
        <div
          ref={galaxyStageRef}
          onMouseMove={handleGalaxyMouseMove}
          className="cosmic-glass rounded-[32px] p-5 sm:p-8 border border-[#A79AFF]/30 mb-14 shadow-[0_0_85px_-20px_rgba(110,91,255,0.32)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#A79AFF]/15">
            <div className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#F4F0FF]">
                GALAXY BUILDER · ИНТЕРАКТИВНАЯ КАРТА ОРБИТ И СОЗВЕЗДИЙ
              </span>
            </div>
            <Badge variant="signal">
              АКТИВНАЯ ПЛАНЕТА: {activePlanet.name.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive SVG Galaxy Canvas (8 Cols) */}
            <div className="lg:col-span-8 relative rounded-2xl bg-[#080910] border border-[#A79AFF]/20 overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 420"
                fill="none"
                role="img"
                aria-label="Интерактивная галактика: планеты, орбиты и созвездия человеческих связей"
              >
                <defs>
                  <radialGradient id="planetHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A79AFF" stopOpacity="0.6" />
                    <stop offset="60%" stopColor="#6E5BFF" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#080910" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Layer 1: Background Delicate Constellations (shift slightly with cursor) */}
                <g
                  style={{
                    transform: `translate(${cursorOffset.x * -0.45}px, ${
                      cursorOffset.y * -0.45
                    }px)`,
                    transition: "transform 0.35s ease-out",
                  }}
                >
                  <polyline
                    points="95,80 155,115 240,185 380,78 485,150 660,95 730,185"
                    stroke="#A79AFF"
                    strokeOpacity="0.16"
                    strokeWidth="0.9"
                    strokeDasharray="3 5"
                  />
                  <polyline
                    points="140,310 240,185 355,305 625,275 485,150"
                    stroke="#6E5BFF"
                    strokeOpacity="0.2"
                    strokeWidth="0.9"
                  />
                  {CONSTELLATION_STARS.map((st, idx) => (
                    <circle
                      key={idx}
                      cx={st.x}
                      cy={st.y}
                      r={st.r}
                      fill="#F4F0FF"
                      fillOpacity="0.45"
                    />
                  ))}
                </g>

                {/* Layer 2: Planetary Orbits & Inter-Planet Resonance Bridges */}
                <g
                  style={{
                    transform: `translate(${cursorOffset.x * 0.35}px, ${
                      cursorOffset.y * 0.35
                    }px)`,
                    transition: "transform 0.35s ease-out",
                  }}
                >
                  {/* Resonance connection lines between active planet and its linked planets */}
                  {GALAXY_PLANETS.map((planet) => {
                    const isLinked =
                      activePlanet.id === planet.id ||
                      activePlanet.linkedTo.includes(planet.id)
                    if (!isLinked || planet.id === activePlanet.id) return null
                    return (
                      <g key={`link-${planet.id}`}>
                        <line
                          x1={activePlanet.cx}
                          y1={activePlanet.cy}
                          x2={planet.cx}
                          y2={planet.cy}
                          stroke="#A79AFF"
                          strokeOpacity="0.7"
                          strokeWidth="1.6"
                          strokeDasharray="5 4"
                        />
                        {/* Midpoint synchronous resonance node */}
                        <circle
                          cx={(activePlanet.cx + planet.cx) / 2}
                          cy={(activePlanet.cy + planet.cy) / 2}
                          r="4"
                          fill="#F4F0FF"
                        />
                      </g>
                    )
                  })}

                  {/* Individual Planetary Orbits & Bodies */}
                  {GALAXY_PLANETS.map((planet) => {
                    const isSelected = planet.id === activePlanet.id
                    const isLinked = activePlanet.linkedTo.includes(planet.id)
                    return (
                      <g
                        key={planet.id}
                        onClick={() => {
                          setActivePlanetId(planet.id)
                          setPulseCount((c) => c + 1)
                          if (onSelectSignal) onSelectSignal(planet.signalId)
                        }}
                        className="cursor-pointer"
                      >
                        {/* Planetary Orbit Ellipse */}
                        <ellipse
                          cx={planet.cx}
                          cy={planet.cy}
                          rx={planet.orbitRx}
                          ry={planet.orbitRy}
                          transform={`rotate(${planet.orbitTilt} ${planet.cx} ${planet.cy})`}
                          stroke={isSelected ? "#A79AFF" : "#6E5BFF"}
                          strokeOpacity={isSelected ? "0.75" : isLinked ? "0.4" : "0.18"}
                          strokeWidth={isSelected ? "1.6" : "1"}
                          strokeDasharray={isSelected ? "none" : "4 6"}
                        />

                        {/* Synchronous Resonance Halo around Selected or Linked Planet */}
                        {(isSelected || isLinked) && (
                          <circle
                            cx={planet.cx}
                            cy={planet.cy}
                            r={planet.radius * (isSelected ? 4.2 : 2.6)}
                            fill="url(#planetHalo)"
                          />
                        )}

                        {/* Outer interactive ring */}
                        <circle
                          cx={planet.cx}
                          cy={planet.cy}
                          r={planet.radius + (isSelected ? 9 : 5)}
                          stroke={isSelected ? "#F4F0FF" : "#A79AFF"}
                          strokeOpacity={isSelected ? "0.9" : "0.4"}
                          strokeWidth={isSelected ? "1.5" : "1"}
                        />

                        {/* Planet Core */}
                        <circle
                          cx={planet.cx}
                          cy={planet.cy}
                          r={isSelected ? planet.radius + 2 : planet.radius}
                          fill={isSelected ? "#F4F0FF" : planet.color}
                        />

                        {/* Planet Label */}
                        <text
                          x={planet.cx}
                          y={planet.cy + planet.radius + 24}
                          textAnchor="middle"
                          fill={isSelected ? "#F4F0FF" : "#A7A6B8"}
                          fontSize="11"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {planet.name.split("·")[0].trim()} · {planet.resonance}%
                        </text>
                      </g>
                    )
                  })}
                </g>
              </svg>

              {/* Bottom Telemetry Strip inside Galaxy Canvas */}
              <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech text-[#A7A6B8]">
                <span>НАЖМИТЕ НА ПЛАНЕТУ ДЛЯ АКТИВАЦИИ ОРБИТЫ</span>
                <span className="text-[#A79AFF]">
                  РЕЗОНАНСНЫХ ИМПУЛЬСОВ: {pulseCount + 4}
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Active Planet Inspector + Quick Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl bg-[#080910]/90 border border-[#A79AFF]/30 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#A79AFF]">
                  <span>{activePlanet.constellationTag}</span>
                  <span>{activePlanet.resonance}% SYNC</span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF]">
                    {activePlanet.name}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">
                    {activePlanet.title}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#A7A6B8] font-light leading-relaxed">
                  {activePlanet.description}
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="orbital"
                    size="sm"
                    onClick={() => {
                      if (onSelectSignal) onSelectSignal(activePlanet.signalId)
                      scrollTo("stories")
                    }}
                    className="w-full justify-between"
                  >
                    <span>Перейти к человеческой истории</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              {/* Accessible Keyboard/Touch Planet Buttons */}
              <div
                className="grid grid-cols-2 gap-2"
                role="tablist"
                aria-label="Выбор планеты в галактике"
              >
                {GALAXY_PLANETS.map((pl) => {
                  const active = pl.id === activePlanet.id
                  return (
                    <button
                      key={pl.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setActivePlanetId(pl.id)
                        if (onSelectSignal) onSelectSignal(pl.signalId)
                      }}
                      className={`rounded-xl p-2.5 text-left transition-all cursor-pointer border ${
                        active
                          ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#F4F0FF]/50"
                          : "bg-[#080910]/80 text-[#A7A6B8] border-[#A79AFF]/20 hover:text-[#F4F0FF]"
                      }`}
                    >
                      <span className="font-mono-tech text-[10px] block truncate">
                        {pl.name}
                      </span>
                      <span className="font-mono-tech text-[9px] opacity-80">
                        Резонанс {pl.resonance}%
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            PART 2: SYNCHRONICITY DUAL-ORBIT CONVERGENCE SIMULATOR
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 7 Cols: Interactive SVG Orbital Geometry */}
          <div className="lg:col-span-7 cosmic-glass rounded-[32px] p-6 sm:p-8 border border-[#A79AFF]/25 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Orbit className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F4F0FF]">
                  СИМУЛЯЦИЯ СОВМЕСТИМОСТИ: ВЫ ↔ {partnerSignal.alias.toUpperCase()}
                </span>
              </div>
              <Badge variant="signal">ИНДЕКС СИНХРОННОСТИ: {convergence}%</Badge>
            </div>

            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[#080910]/90 border border-[#A79AFF]/15 overflow-hidden flex items-center justify-center">
              <svg
                className="w-full h-full"
                viewBox="0 0 600 340"
                fill="none"
                role="img"
                aria-label={`Визуализация двух пересекающихся орбит при уровне синхронности ${convergence}%`}
              >
                <defs>
                  <radialGradient id="barycenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F4F0FF" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#A79AFF" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#6E5BFF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#080910" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bridgeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F4F0FF" />
                    <stop offset="50%" stopColor="#A79AFF" />
                    <stop offset="100%" stopColor="#6E5BFF" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="170" x2="600" y2="170" stroke="#A79AFF" strokeOpacity="0.12" />
                <line x1="300" y1="0" x2="300" y2="340" stroke="#A79AFF" strokeOpacity="0.12" />

                <circle
                  cx="300"
                  cy="170"
                  r={30 + convergence * 0.85}
                  fill="url(#barycenterGlow)"
                />

                {/* Orbit Alpha */}
                <g
                  style={{
                    transform: `translateX(${leftCenterX - 300}px)`,
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <ellipse
                    cx="300"
                    cy="170"
                    rx="135"
                    ry="86"
                    transform="rotate(-14 300 170)"
                    stroke="#F4F0FF"
                    strokeOpacity="0.55"
                    strokeWidth="1.25"
                    strokeDasharray="6 4"
                  />
                  <ellipse
                    cx="300"
                    cy="170"
                    rx="96"
                    ry="62"
                    transform="rotate(-14 300 170)"
                    stroke="#A79AFF"
                    strokeOpacity="0.8"
                    strokeWidth="1.5"
                  />
                  <circle cx="300" cy="170" r="6" fill="#F4F0FF" />
                  <text
                    x="300"
                    y="200"
                    textAnchor="middle"
                    fill="#F4F0FF"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="2"
                  >
                    ВАШ СИГНАЛ
                  </text>
                </g>

                {/* Orbit Beta */}
                <g
                  style={{
                    transform: `translateX(${rightCenterX - 300}px)`,
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <ellipse
                    cx="300"
                    cy="170"
                    rx="135"
                    ry="86"
                    transform="rotate(14 300 170)"
                    stroke="#6E5BFF"
                    strokeOpacity="0.7"
                    strokeWidth="1.25"
                    strokeDasharray="4 6"
                  />
                  <ellipse
                    cx="300"
                    cy="170"
                    rx="96"
                    ry="62"
                    transform="rotate(14 300 170)"
                    stroke="#A79AFF"
                    strokeOpacity="0.9"
                    strokeWidth="1.5"
                  />
                  <circle cx="300" cy="170" r="6" fill="#A79AFF" />
                  <text
                    x="300"
                    y="145"
                    textAnchor="middle"
                    fill="#A79AFF"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="2"
                  >
                    {partnerSignal.alias.split(" ")[0].toUpperCase()}
                  </text>
                </g>

                <line
                  x1={leftCenterX}
                  y1="170"
                  x2={rightCenterX}
                  y2="170"
                  stroke="url(#bridgeLine)"
                  strokeWidth={convergence > 75 ? "2.5" : "1.2"}
                />

                {convergence > 50 && (
                  <>
                    <circle
                      cx="300"
                      cy={170 - Math.max(12, 58 - separation * 0.45)}
                      r={convergence > 80 ? "5" : "3.5"}
                      fill="#F4F0FF"
                    />
                    <circle
                      cx="300"
                      cy={170 + Math.max(12, 58 - separation * 0.45)}
                      r={convergence > 80 ? "5" : "3.5"}
                      fill="#F4F0FF"
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <label htmlFor="orbit-convergence-slider" className="text-[#A7A6B8]">
                  ФАЗА СБЛИЖЕНИЯ ОРБИТ:
                </label>
                <span className="text-[#F4F0FF] font-medium">
                  {activePreset.phaseTitle} ({convergence}%)
                </span>
              </div>

              <input
                id="orbit-convergence-slider"
                type="range"
                min={25}
                max={99}
                value={convergence}
                onChange={(e) => setConvergence(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-[#14182A] accent-[#6E5BFF] cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {ALIGNMENT_PRESETS.map((preset) => {
                  const isActive = Math.abs(convergence - preset.value) <= 12
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setConvergence(preset.value)}
                      className={`rounded-xl px-3.5 py-2.5 text-left transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#14182A] border-[#A79AFF] text-[#F4F0FF]"
                          : "bg-[#080910]/60 border-[#A79AFF]/15 text-[#A7A6B8] hover:text-[#F4F0FF] hover:border-[#A79AFF]/40"
                      }`}
                    >
                      <span className="font-mono-tech text-[10px] text-[#A79AFF] block">
                        {preset.value}% СИНХРОННОСТЬ
                      </span>
                      <span className="text-xs font-medium mt-0.5 block">
                        {preset.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Symbolic Compatibility Breakdown & Honest Transparency Note */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cosmic-glass rounded-[28px] p-6 sm:p-8 border border-[#A79AFF]/20 space-y-6">
              <div className="space-y-2">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A79AFF] flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>BEYOND THE ORDINARY MATCH</span>
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF]">
                  {activePreset.phaseTitle}
                </h3>
                <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                  {activePreset.phaseNote}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#A79AFF]/15">
                {[
                  {
                    label: "Совпадение суточных ритмов и времени тишины",
                    score: rhythmScore,
                  },
                  {
                    label: "Эмоциональная интонация и глубина диалога",
                    score: cadenceScore,
                  },
                  {
                    label: "Деликатность к личным границам и темпу сближения",
                    score: boundaryScore,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F4F0FF]">{metric.label}</span>
                      <span className="font-mono-tech text-[#A79AFF]">
                        {metric.score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#080910] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6E5BFF] to-[#A79AFF] transition-all duration-500"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#080910]/85 border border-[#A79AFF]/20 p-4 flex items-start gap-3">
                <Info className="h-4 w-4 text-[#A79AFF] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-[#A7A6B8] leading-relaxed">
                  <strong className="text-[#F4F0FF] font-medium">
                    Концептуальная модель персонализации:
                  </strong>{" "}
                  AstroSyncho помогает исследовать эмоциональную близость и возможную
                  совместимость через добровольно выбранные вами ритмы, состояния и
                  интересы. Мы не утверждаем, что астрология, биоритмы или
                  математическая формула научно гарантируют любовь или предсказывают
                  отношения.
                </p>
              </div>

              <Button
                variant="orbital"
                className="w-full justify-between"
                onClick={() => scrollTo("signal")}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                  <span>Настроить собственный сигнал</span>
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
