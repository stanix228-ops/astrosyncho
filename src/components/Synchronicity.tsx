import React, { useState } from "react"
import { Sparkles, Orbit, Info, ArrowRight } from "lucide-react"
import { type RadarSignalNode } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SynchronicityProps {
  partnerSignal: RadarSignalNode
}

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

export const Synchronicity: React.FC<SynchronicityProps> = ({ partnerSignal }) => {
  const [convergence, setConvergence] = useState<number>(88)

  // Compute dynamic orbital separation from convergence (0..100)
  // At 100%, offset approaches 0 (shared barycenter); at 20%, orbits are far apart
  const separation = Math.max(8, (100 - convergence) * 1.45)
  const leftCenterX = 300 - separation
  const rightCenterX = 300 + separation

  // Compute three symbolic dimension scores
  const rhythmScore = Math.min(99, Math.round(convergence * 0.98 + 2))
  const cadenceScore = Math.min(99, Math.round(convergence * 0.94 + 5))
  const boundaryScore = Math.min(99, Math.round(convergence * 0.96 + 3))

  const activePreset =
    convergence < 55
      ? ALIGNMENT_PRESETS[0]
      : convergence < 85
      ? ALIGNMENT_PRESETS[1]
      : ALIGNMENT_PRESETS[2]

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
                03 // SYNCHRONICITY
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                ОРБИТАЛЬНЫЙ РЕЗОНАНС
              </span>
            </div>
            <h2
              id="synchronicity-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Две траектории,{" "}
              <span className="italic text-[#A79AFF]">
                образующие единую систему.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
            Управляйте фазой сближения ниже, чтобы увидеть, как два независимых
            человеческих сигнала переходят от случайного касания к глубокому
            взаимному резонансу.
          </p>
        </div>

        {/* Interactive Dual-Orbit Stage */}
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

            {/* Interactive SVG Visualization */}
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

                {/* Subtle background coordinate grid */}
                <line x1="0" y1="170" x2="600" y2="170" stroke="#A79AFF" strokeOpacity="0.12" />
                <line x1="300" y1="0" x2="300" y2="340" stroke="#A79AFF" strokeOpacity="0.12" />

                {/* Shared Barycenter Energy Field (grows with convergence) */}
                <circle
                  cx="300"
                  cy="170"
                  r={30 + convergence * 0.85}
                  fill="url(#barycenterGlow)"
                />

                {/* Orbit Alpha (User Signal) */}
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

                {/* Orbit Beta (Partner Signal) */}
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

                {/* Luminous Harmonic Bridge Between Cores */}
                <line
                  x1={leftCenterX}
                  y1="170"
                  x2={rightCenterX}
                  y2="170"
                  stroke="url(#bridgeLine)"
                  strokeWidth={convergence > 75 ? "2.5" : "1.2"}
                />

                {/* Resonant Intersection Nodes */}
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

            {/* Interactive Slider & Preset Buttons */}
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
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A79AFF]">
                  СОСТОЯНИЕ СИСТЕМЫ
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF]">
                  {activePreset.phaseTitle}
                </h3>
                <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                  {activePreset.phaseNote}
                </p>
              </div>

              {/* Three Symbolic Dimensions */}
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

              {/* Transparent Product Note (Scientific Honesty Requirement) */}
              <div className="rounded-2xl bg-[#080910]/85 border border-[#A79AFF]/20 p-4 flex items-start gap-3">
                <Info className="h-4 w-4 text-[#A79AFF] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-[#A7A6B8] leading-relaxed">
                  <strong className="text-[#F4F0FF] font-medium">
                    Концептуальная модель персонализации:
                  </strong>{" "}
                  AstroSyncho использует метафору орбит и синхронности для сопоставления
                  добровольно выбранных вами ритмов дня, эстетических предпочтений и
                  коммуникативных состояний. Мы не выдаём астрологию, лунные циклы или
                  биоритмы за научно доказанные методы определения совместимости.
                </p>
              </div>

              <Button
                variant="orbital"
                className="w-full justify-between"
                onClick={() => {
                  const el = document.getElementById("signal")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
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
