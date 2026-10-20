import React, { useState } from "react"
import { Radio, Sparkles, Compass, Pause, Play, ArrowUpRight } from "lucide-react"
import { RADAR_SIGNALS, type RadarSignalNode } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CosmicRadarProps {
  selectedSignalId: string
  onSelectSignal: (id: string) => void
  onTestSynchronicity: (signal: RadarSignalNode) => void
}

export const CosmicRadar: React.FC<CosmicRadarProps> = ({
  selectedSignalId,
  onSelectSignal,
  onTestSynchronicity,
}) => {
  const [filterState, setFilterState] = useState<string>("ALL")
  const [isScanning, setIsScanning] = useState<boolean>(true)

  const filteredSignals =
    filterState === "ALL"
      ? RADAR_SIGNALS
      : RADAR_SIGNALS.filter((s) => s.stateKey === filterState)

  const activeSignal =
    RADAR_SIGNALS.find((s) => s.id === selectedSignalId) || RADAR_SIGNALS[0]

  const getCartesianPosition = (angleDeg: number, radiusPct: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    // Map radiusPct (0..100) to max 42% from center (50, 50)
    const r = (radiusPct / 100) * 42
    const x = 50 + r * Math.cos(rad)
    const y = 50 + r * Math.sin(rad)
    return { x, y }
  }

  return (
    <section
      id="radar"
      className="relative scroll-mt-20 py-24 lg:py-32 bg-[#080910] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="radar-heading"
    >
      {/* Subtle Cosmic Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('./images/cosmic-environment.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                02 // SIGNAL DETECTED
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                КОСМИЧЕСКИЙ РАДАР
              </span>
            </div>
            <h2
              id="radar-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Сканирование тёмного эфира.{" "}
              <span className="italic text-[#A79AFF]">Живые сигналы поблизости.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
            Вместо бесконечной витрины анкет — пространственный радар, который
            улавливает людей со схожей частотой состояния. Наведите или нажмите на
            пульсирующий сигнал, чтобы раскрыть его концептуальный профиль.
          </p>
        </div>

        {/* Filter Bar + Radar Pause Control */}
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
                      const match = RADAR_SIGNALS.find((s) => s.stateKey === item.key)
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
              {/* Concentric Radar Rings & Crosshairs */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 500 500"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="225"
                  stroke="#A79AFF"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="165"
                  stroke="#A79AFF"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="105"
                  stroke="#6E5BFF"
                  strokeOpacity="0.28"
                  strokeWidth="1"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="48"
                  stroke="#A79AFF"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                {/* Crosshair axes */}
                <line
                  x1="25"
                  y1="250"
                  x2="475"
                  y2="250"
                  stroke="#A79AFF"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
                <line
                  x1="250"
                  y1="25"
                  x2="250"
                  y2="475"
                  stroke="#A79AFF"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
                {/* Diagonal axes */}
                <line
                  x1="91"
                  y1="91"
                  x2="409"
                  y2="409"
                  stroke="#A79AFF"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
                <line
                  x1="409"
                  y1="91"
                  x2="91"
                  y2="409"
                  stroke="#A79AFF"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
                {/* Dynamic Connection Line from Center Observer to Selected Signal */}
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

              {/* Coordinate Labels inside Radar */}
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

              {/* Center Node (You / Observer) */}
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
                const pos = getCartesianPosition(signal.angleDeg, signal.radiusPct)
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
                    {/* Outer Pulse Ring */}
                    <span
                      className={`pointer-events-none absolute inset-1 rounded-full animate-signal-pulse ${
                        isSelected
                          ? "bg-[#6E5BFF]/55 ring-2 ring-[#F4F0FF]/80"
                          : "bg-[#A79AFF]/30"
                      }`}
                      aria-hidden="true"
                    />
                    {/* Core Glowing Dot */}
                    <span
                      className={`relative block rounded-full transition-transform duration-300 ${
                        isSelected
                          ? "h-4 w-4 bg-[#F4F0FF] shadow-[0_0_20px_5px_#6E5BFF] scale-125"
                          : "h-3 w-3 bg-[#A79AFF] shadow-[0_0_12px_2px_#6E5BFF] group-hover:scale-125 group-hover:bg-[#F4F0FF]"
                      }`}
                      aria-hidden="true"
                    />
                    {/* Floating Mini Tag */}
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
                          isSelected ? "bg-[#F4F0FF] shadow-[0_0_8px_#6E5BFF]" : "bg-[#6E5BFF]/50"
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
              {/* Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-[#080910]/70 border-b border-[#A79AFF]/15">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-[#A79AFF] animate-pulse" aria-hidden="true" />
                  <span className="font-mono-tech text-xs tracking-[0.18em] text-[#F4F0FF]">
                    {activeSignal.code}
                  </span>
                </div>
                <Badge variant="subtle" className="text-[10px]">
                  КОНЦЕПТУАЛЬНЫЙ ПРОФИЛЬ · DEMO
                </Badge>
              </div>

              {/* Portrait + Telemetry Overlay */}
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

              {/* Signal Details */}
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

                {/* Shared Impulses */}
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

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#A79AFF]/15 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => onTestSynchronicity(activeSignal)}
                  >
                    <Compass className="h-4 w-4" aria-hidden="true" />
                    <span>Проверить синхронность орбит</span>
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
