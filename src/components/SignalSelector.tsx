import React, { useState } from "react"
import { Radio, Sparkles, Check, Sliders } from "lucide-react"
import { SIGNAL_STATES, type SignalStateConfig } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SignalSelectorProps {
  selectedStateKey: SignalStateConfig["key"]
  onSelectStateKey: (key: SignalStateConfig["key"]) => void
}

export const SignalSelector: React.FC<SignalSelectorProps> = ({
  selectedStateKey,
  onSelectStateKey,
}) => {
  const [opennessLevel, setOpennessLevel] = useState<number>(76)

  const currentSignal =
    SIGNAL_STATES.find((s) => s.key === selectedStateKey) || SIGNAL_STATES[0]

  // Build smooth harmonic SVG path based on selected signal state & opennessLevel
  const generateWavePath = (waveOffset: number, scaleFactor: number) => {
    const points: string[] = []
    const steps = 60
    const width = 600
    const centerY = 130
    const amp = (currentSignal.amplitude * (opennessLevel / 80)) * scaleFactor
    const freq = currentSignal.waveCount

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const t = (i / steps) * Math.PI * freq + waveOffset
      // Envelope keeps ends anchored smoothly
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
                05 // YOUR SIGNAL
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                ЛИЧНЫЙ СИГНАЛ
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
            Ваш сигнал не статичен. Выбирайте эмоциональное состояние, которое
            отражает ваш внутренний ритм сегодня — и наблюдайте, как меняется
            геометрия вашего излучения.
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
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF]">
                    {state.wavelength.split("·")[0]}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-transform ${
                      isSelected ? "scale-125 bg-[#F4F0FF] shadow-[0_0_10px_#6E5BFF]" : "bg-[#6E5BFF]/40"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-editorial text-2xl sm:text-[26px] text-[#F4F0FF] leading-none">
                    {state.titleEn}
                  </div>
                  <div className="mt-1 text-xs text-[#A7A6B8] font-light">
                    {state.titleRu}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Synthesizer Visualizer + State Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Live Harmonic Wave & Orbital Visualizer */}
          <div className="lg:col-span-7 cosmic-glass rounded-[30px] p-6 sm:p-8 border border-[#A79AFF]/25 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#F4F0FF]">
                  СПЕКТРОГРАММА СИГНАЛА · {currentSignal.titleEn.toUpperCase()}
                </span>
              </div>
              <Badge variant="signal">{currentSignal.frequencyHz}</Badge>
            </div>

            {/* Interactive SVG Harmonic Waveform */}
            <div className="relative w-full aspect-[16/8] rounded-2xl bg-[#080910] border border-[#A79AFF]/15 overflow-hidden flex items-center justify-center my-2">
              <svg
                className="w-full h-full"
                viewBox="0 0 600 260"
                fill="none"
                role="img"
                aria-label={`Гармоническая волна сигнала для состояния ${currentSignal.titleEn}`}
              >
                {/* Reference Grid */}
                <line x1="0" y1="130" x2="600" y2="130" stroke="#A79AFF" strokeOpacity="0.15" strokeDasharray="3 5" />
                <circle
                  cx="300"
                  cy="130"
                  r={45 + currentSignal.orbitEccentricity * 65}
                  stroke={currentSignal.accentHex}
                  strokeOpacity="0.28"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="300"
                  cy="130"
                  r={28 + (opennessLevel / 100) * 35}
                  stroke="#F4F0FF"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                />

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
                <circle cx="300" cy="130" r="5" fill="#F4F0FF" />
              </svg>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech text-[#A7A6B8]">
                <span>{currentSignal.ambientMetric}</span>
                <span>ЭКСЦЕНТРИСИТЕТ: {currentSignal.orbitEccentricity}</span>
              </div>
            </div>

            {/* Openness / Intensity Fine-Tuning Slider */}
            <div className="mt-5 pt-4 border-t border-[#A79AFF]/15 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <label
                  htmlFor="signal-openness-slider"
                  className="flex items-center gap-2 text-[#A7A6B8]"
                >
                  <Sliders className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
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
                * Интерактивная демонстрация интерфейса управления личным сигналом (не является психологической диагностикой).
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
                <span className="italic text-[#A79AFF]">{currentSignal.titleRu}</span>
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
                <span>Сохранить сигнал «{currentSignal.titleEn}» для Beta</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
