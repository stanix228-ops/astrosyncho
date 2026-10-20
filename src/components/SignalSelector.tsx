import React, { useState } from "react"
import { Radio, Sparkles, Check, Sliders } from "lucide-react"
import { SIGNAL_STATES, type SignalStateConfig } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SignalSelectorProps {
  selectedStateKey: SignalStateConfig["key"]
  onSelectStateKey: (key: SignalStateConfig["key"]) => void
}

const CONNECTION_INTENTS: Record<
  SignalStateConfig["key"],
  {
    intentLabel: string
    orbitTilt: number
    activeStarIndices: number[]
  }
> = {
  Curiosity: {
    intentLabel: "Meaningful Discovery · Поиск редкого собеседника",
    orbitTilt: -18,
    activeStarIndices: [0, 2, 5, 7],
  },
  Calm: {
    intentLabel: "A Quiet Conversation · Тихий ночной диалог",
    orbitTilt: 6,
    activeStarIndices: [1, 3, 4, 8],
  },
  Attraction: {
    intentLabel: "Unexpected Attraction · Неожиданное притяжение",
    orbitTilt: 24,
    activeStarIndices: [0, 3, 6, 8, 9],
  },
  Adventure: {
    intentLabel: "Playful Chemistry · Живая химия и спонтанность",
    orbitTilt: -28,
    activeStarIndices: [1, 2, 5, 6, 9],
  },
  Intimacy: {
    intentLabel: "Meaningful Connection · Глубокая эмоциональная связь",
    orbitTilt: 14,
    activeStarIndices: [2, 4, 5, 7, 8],
  },
}

const STAGE_STARS = [
  { x: 85, y: 55 },
  { x: 165, y: 195 },
  { x: 235, y: 72 },
  { x: 300, y: 210 },
  { x: 375, y: 62 },
  { x: 445, y: 185 },
  { x: 515, y: 78 },
  { x: 120, y: 135 },
  { x: 485, y: 145 },
  { x: 295, y: 45 },
]

export const SignalSelector: React.FC<SignalSelectorProps> = ({
  selectedStateKey,
  onSelectStateKey,
}) => {
  const [opennessLevel, setOpennessLevel] = useState<number>(76)

  const currentSignal =
    SIGNAL_STATES.find((s) => s.key === selectedStateKey) || SIGNAL_STATES[0]
  const intentMeta = CONNECTION_INTENTS[selectedStateKey]

  const generateWavePath = (waveOffset: number, scaleFactor: number) => {
    const points: string[] = []
    const steps = 60
    const width = 600
    const centerY = 130
    const amp = currentSignal.amplitude * (opennessLevel / 80) * scaleFactor
    const freq = currentSignal.waveCount

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const t = (i / steps) * Math.PI * freq + waveOffset
      const envelope = Math.sin((i / steps) * Math.PI)
      const y = centerY + Math.sin(t) * amp * envelope
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return points.join(" ")
  }

  return (
    <section
      id="signal"
      className="relative scroll-mt-20 py-24 lg:py-32 bg-[#0D0F18] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="signal-heading"
    >
      {/* Dynamic Ambient Aura matching current signal */}
      <div
        className="pointer-events-none absolute top-1/3 right-[8%] h-[480px] w-[480px] rounded-full opacity-25 blur-[130px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentSignal.accentHex} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                05 // YOUR SIGNAL — WHAT ARE YOU LOOKING FOR?
              </span>
            </div>
            <h2
              id="signal-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Настройте частоту своего{" "}
              <span className="italic text-[#A79AFF]">присутствия в эфире.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
            Выберите желаемый тип эмоциональной связи или состояния — и
            наблюдайте, как загораются соответствующие звёзды, меняют наклон
            орбиты и перестраивается ваша спектрограмма.
          </p>
        </div>

        {/* 5 State Selector Tabs */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10"
          role="tablist"
          aria-label="Выбор состояния личного сигнала"
        >
          {SIGNAL_STATES.map((state) => {
            const isSelected = state.key === selectedStateKey
            const meta = CONNECTION_INTENTS[state.key]
            return (
              <button
                key={state.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectStateKey(state.key)}
                className={`group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-[#14182A] border-[#A79AFF] shadow-[0_0_32px_-6px_rgba(110,91,255,0.45)]"
                    : "bg-[#080910]/80 border-[#A79AFF]/15 hover:border-[#A79AFF]/45 hover:bg-[#14182A]/45"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A79AFF]">
                    {state.wavelength.split("·")[0]}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-transform ${
                      isSelected
                        ? "scale-125 bg-[#F4F0FF] shadow-[0_0_10px_#6E5BFF]"
                        : "bg-[#6E5BFF]/40"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-editorial text-2xl sm:text-[26px] text-[#F4F0FF] leading-none">
                    {state.titleEn}
                  </div>
                  <div className="mt-1 text-xs text-[#A79AFF] font-mono-tech truncate">
                    {meta.intentLabel.split("·")[0]}
                  </div>
                  <div className="mt-0.5 text-xs text-[#A7A6B8] font-light">
                    {state.titleRu}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Synthesizer Visualizer + State Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Live Harmonic Wave, Reconfigurable Orbits & Igniting Stars */}
          <div className="lg:col-span-7 cosmic-glass rounded-[30px] p-6 sm:p-8 border border-[#A79AFF]/25 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F4F0FF]">
                  {intentMeta.intentLabel}
                </span>
              </div>
              <Badge variant="signal">{currentSignal.frequencyHz}</Badge>
            </div>

            {/* Interactive SVG Harmonic Waveform + Igniting Constellation Stars + Tilting Orbits */}
            <div className="relative w-full aspect-[16/8.5] rounded-2xl bg-[#080910] border border-[#A79AFF]/15 overflow-hidden flex items-center justify-center my-2">
              <svg
                className="w-full h-full"
                viewBox="0 0 600 260"
                fill="none"
                role="img"
                aria-label={`Гармоническая волна и конфигурация орбит для состояния ${currentSignal.titleEn}`}
              >
                <line
                  x1="0"
                  y1="130"
                  x2="600"
                  y2="130"
                  stroke="#A79AFF"
                  strokeOpacity="0.15"
                  strokeDasharray="3 5"
                />

                {/* Constellation lines between active stars */}
                {intentMeta.activeStarIndices.map((starIdx, i) => {
                  const nextIdx =
                    intentMeta.activeStarIndices[
                      (i + 1) % intentMeta.activeStarIndices.length
                    ]
                  const s1 = STAGE_STARS[starIdx]
                  const s2 = STAGE_STARS[nextIdx]
                  return (
                    <line
                      key={`c-${starIdx}-${nextIdx}`}
                      x1={s1.x}
                      y1={s1.y}
                      x2={s2.x}
                      y2={s2.y}
                      stroke={currentSignal.accentHex}
                      strokeOpacity="0.28"
                      strokeWidth="0.9"
                      strokeDasharray="3 4"
                    />
                  )
                })}

                {/* Stars that ignite based on chosen state */}
                {STAGE_STARS.map((st, idx) => {
                  const isLit = intentMeta.activeStarIndices.includes(idx)
                  return (
                    <g key={idx}>
                      {isLit && (
                        <circle
                          cx={st.x}
                          cy={st.y}
                          r="9"
                          fill={currentSignal.accentHex}
                          fillOpacity="0.22"
                        />
                      )}
                      <circle
                        cx={st.x}
                        cy={st.y}
                        r={isLit ? "3.5" : "1.5"}
                        fill={isLit ? "#F4F0FF" : "#A7A6B8"}
                        fillOpacity={isLit ? "0.95" : "0.3"}
                      />
                    </g>
                  )
                })}

                {/* Reconfigurable Orbital Rings */}
                <g
                  style={{
                    transformOrigin: "300px 130px",
                    transform: `rotate(${intentMeta.orbitTilt}deg)`,
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <ellipse
                    cx="300"
                    cy="130"
                    rx={95 + currentSignal.orbitEccentricity * 85}
                    ry={48 + (opennessLevel / 100) * 32}
                    stroke={currentSignal.accentHex}
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    strokeDasharray="5 4"
                  />
                  <ellipse
                    cx="300"
                    cy="130"
                    rx={68 + (opennessLevel / 100) * 40}
                    ry={34 + currentSignal.orbitEccentricity * 30}
                    stroke="#F4F0FF"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                  />
                </g>

                {/* Secondary Harmonic Wave */}
                <path
                  d={generateWavePath(1.2, 0.65)}
                  stroke={currentSignal.secondaryHex}
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Tertiary Echo Wave */}
                <path
                  d={generateWavePath(2.4, 0.4)}
                  stroke="#F4F0FF"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Primary Signal Wave */}
                <path
                  d={generateWavePath(0, 1)}
                  stroke={currentSignal.accentHex}
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Center Core Pulse */}
                <circle cx="300" cy="130" r="5.5" fill="#F4F0FF" />
              </svg>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech text-[#A7A6B8]">
                <span>{currentSignal.ambientMetric}</span>
                <span>НАКЛОН ОРБИТЫ: {intentMeta.orbitTilt}°</span>
              </div>
            </div>

            {/* Openness / Intensity Fine-Tuning Slider */}
            <div className="mt-5 pt-4 border-t border-[#A79AFF]/15 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <label
                  htmlFor="signal-openness-slider"
                  className="flex items-center gap-2 text-[#A7A6B8]"
                >
                  <Sliders
                    className="h-3.5 w-3.5 text-[#A79AFF]"
                    aria-hidden="true"
                  />
                  <span>ГЛУБИНА ОТКРЫТОСТИ СИГНАЛА:</span>
                </label>
                <span className="text-[#F4F0FF]">{opennessLevel}%</span>
              </div>
              <input
                id="signal-openness-slider"
                type="range"
                min={30}
                max={100}
                value={opennessLevel}
                onChange={(e) => setOpennessLevel(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-[#14182A] accent-[#6E5BFF] cursor-pointer"
              />
              <p className="text-[11px] text-[#A7A6B8]/75 font-mono-tech">
                * Концептуальная демонстрация настройки личного сигнала (выбор работает локально в браузере и не создаёт реального сохранения на сервере).
              </p>
            </div>
          </div>

          {/* Right 5 Cols: Selected State Description & Beta Link */}
          <div className="lg:col-span-5 cosmic-glass rounded-[30px] p-6 sm:p-8 border border-[#A79AFF]/25 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="default">АКТИВНЫЙ РЕЖИМ</Badge>
                <span className="font-mono-tech text-xs text-[#A79AFF]">
                  {currentSignal.wavelength}
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F0FF]">
                {currentSignal.titleEn} —{" "}
                <span className="italic text-[#A79AFF]">
                  {currentSignal.titleRu}
                </span>
              </h3>

              <p className="font-editorial italic text-xl text-[#F4F0FF]/90">
                «{currentSignal.tagline}»
              </p>

              <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                {currentSignal.description}
              </p>

              <div className="pt-3 space-y-2.5">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8] block">
                  ХАРАКТЕРИСТИКИ СОВПАДЕНИЯ В ЭТОМ РЕЖИМЕ:
                </span>
                <ul className="space-y-2">
                  {currentSignal.matchingQualities.map((quality) => (
                    <li
                      key={quality}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F0FF]/90 font-light"
                    >
                      <Check
                        className="h-4 w-4 text-[#A79AFF] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{quality}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#A79AFF]/15">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  const el = document.getElementById("beta")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Передать сигнал «{currentSignal.titleEn}» в форму Beta</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
