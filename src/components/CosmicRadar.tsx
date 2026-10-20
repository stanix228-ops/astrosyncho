import React, { useRef } from "react"
import { Compass, Sparkles, ArrowDownRight } from "lucide-react"
import { RADAR_SIGNALS, type RadarSignalNode } from "@/data/astroData"
import {
  usePrefersReducedMotion,
  useElementScrollProgress,
  useInView,
} from "@/hooks/useMotionPreferences"

interface CosmicRadarProps {
  selectedSignalId: string
  onSelectSignal: (id: string) => void
  onTestSynchronicity: (signal: RadarSignalNode) => void
}

const OBSERVATORY_HOTSPOTS: Array<{
  signalIndex: number
  left: string
  top: string
  cx: number
  cy: number
  delayMs: number
  isPrimary?: boolean
}> = [
  {
    signalIndex: 0,
    left: "70.1%",
    top: "43.2%",
    cx: 673,
    cy: 233,
    delayMs: 0,
    isPrimary: true,
  },
  {
    signalIndex: 1,
    left: "78.5%",
    top: "36.8%",
    cx: 754,
    cy: 199,
    delayMs: 650,
  },
  {
    signalIndex: 2,
    left: "73.8%",
    top: "51.6%",
    cx: 708,
    cy: 279,
    delayMs: 1200,
  },
  {
    signalIndex: 3,
    left: "55.8%",
    top: "52.2%",
    cx: 536,
    cy: 282,
    delayMs: 1750,
  },
]

export const CosmicRadar: React.FC<CosmicRadarProps> = ({
  selectedSignalId,
  onSelectSignal,
  onTestSynchronicity,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const scrollProgress = useElementScrollProgress(sectionRef)
  const { hasEntered } = useInView(sectionRef, "150px")

  const activeSignal =
    RADAR_SIGNALS.find((s) => s.id === selectedSignalId) || RADAR_SIGNALS[0]

  return (
    <section
      id="radar"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#080910] border-t border-[rgba(190,185,255,0.12)]"
      aria-labelledby="active-signals-heading"
    >
      {/* Subtle Ambient Light Source */}
      <div
        className="pointer-events-none absolute top-1/4 right-[-8%] h-[520px] w-[520px] rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,91,255,0.38) 0%, rgba(169,216,255,0.12) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Asymmetric Editorial Split + Immersive Observatory Key Visual */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center transition-all duration-1000 ease-out ${
            hasEntered || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left Column (5 Cols): Editorial Copy & Illustrative Signal Preview */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow & Small Interface Label */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
                SIGNAL DETECTION / 01
              </span>
              <span
                className="h-1 w-1 rounded-full bg-[#A9D8FF]/60"
                aria-hidden="true"
              />
              <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A1A2B5]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#A9D8FF] animate-pulse"
                  aria-hidden="true"
                />
                SCANNING THE UNIVERSE
              </span>
            </div>

            {/* Editorial Heading */}
            <h2
              id="active-signals-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F3FA] leading-[1.06] tracking-[-0.015em]"
            >
              Где-то есть сигнал, который{" "}
              <span className="italic font-light text-[#A79AFF]">
                совпадёт с твоим.
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg text-[#A1A2B5] font-light leading-[1.65] max-w-[480px]">
              Исследуй пространство новых знакомств. Каждый сигнал — возможность
              встретить человека, с которым захочется узнать друг друга ближе.
            </p>

            {/* Secondary Microcopy */}
            <p className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#A9D8FF]/80">
              A NEW CONNECTION MAY BE CLOSER THAN YOU THINK
            </p>

            {/* Understated Illustrative Signal Preview Panel */}
            <div
              className="w-full max-w-[470px] rounded-[22px] border border-[rgba(190,185,255,0.16)] bg-[rgba(19,21,38,0.68)] backdrop-blur-xl p-5 sm:p-6 transition-all duration-300"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(190,185,255,0.12)]">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A79AFF]">
                  ИЛЛЮСТРАТИВНЫЙ ПРИМЕР СИГНАЛА
                </span>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#A1A2B5]">
                  {activeSignal.code}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#A79AFF]/35 bg-[#0D0F18]">
                  <img
                    src={activeSignal.image}
                    alt={activeSignal.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-2xl text-[#F4F3FA] truncate">
                      {activeSignal.alias}, {activeSignal.age}
                    </h3>
                    <span className="rounded-full border border-[#A79AFF]/30 bg-[#6E5BFF]/15 px-2 py-0.5 font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A79AFF]">
                      DEMO
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#A9D8FF]/90 mt-0.5">
                    {activeSignal.stateLabel}
                  </p>
                </div>
              </div>

              <p className="mt-3.5 font-sans text-sm text-[#F4F3FA]/85 font-light leading-relaxed">
                «{activeSignal.quote}»
              </p>

              {/* Signal Selector Pills */}
              <div className="mt-4 pt-3.5 border-t border-[rgba(190,185,255,0.1)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {RADAR_SIGNALS.map((sig) => {
                    const isSelected = sig.id === activeSignal.id
                    return (
                      <button
                        key={sig.id}
                        type="button"
                        onClick={() => onSelectSignal(sig.id)}
                        className={`rounded-full px-2.5 py-1 font-mono-tech text-[10px] tracking-[0.1em] transition-all cursor-pointer border ${
                          isSelected
                            ? "border-[#A79AFF] bg-[#6E5BFF]/30 text-[#F4F3FA]"
                            : "border-[rgba(190,185,255,0.14)] bg-[#0D0F18]/70 text-[#A1A2B5] hover:text-[#F4F3FA]"
                        }`}
                      >
                        {sig.alias}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => onTestSynchronicity(activeSignal)}
                  className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#A79AFF] hover:text-[#F4F3FA] transition-colors cursor-pointer"
                >
                  <span>К совпадению</span>
                  <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Art-Directed Observatory Key Visual + Animated Radar Overlay */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[26px] overflow-hidden border border-[rgba(190,185,255,0.18)] bg-[#0D0F18] shadow-[0_24px_80px_-20px_rgba(8,9,16,0.9)]">
              {/* Main Generated Key Visual: active-signals.webp */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src="./images/active-signals.webp"
                  alt="Космическая обсерватория AstroSyncho с голографическим радаром, обнаруживающим светящиеся сигналы в глубоком космосе"
                  width={1376}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover object-[72%_center] sm:object-center"
                />

                {/* Subtle Edge Vignette for Seamless Integration */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080910]/65 via-transparent to-[#080910]/25"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910]/75 via-transparent to-[#080910]/25"
                  aria-hidden="true"
                />

                {/* Animated SVG Radar Overlay: Scanning Beam & Fine Orbital Lines */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 960 540"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="observatoryScanBeam"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#A9D8FF"
                        stopOpacity="0.24"
                      />
                      <stop
                        offset="55%"
                        stopColor="#6E5BFF"
                        stopOpacity="0.08"
                      />
                      <stop
                        offset="100%"
                        stopColor="#080910"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Fine Orbital Rings Centered on the Holographic Radar Sphere (673, 233) */}
                  <g
                    style={{
                      opacity: hasEntered ? 0.85 : 0.2,
                      transition: "opacity 1.2s ease-out",
                    }}
                  >
                    <ellipse
                      cx="673"
                      cy="233"
                      rx="195"
                      ry="82"
                      transform="rotate(-14 673 233)"
                      stroke="#A79AFF"
                      strokeOpacity="0.28"
                      strokeWidth="0.9"
                      strokeDasharray="4 6"
                    />
                    <ellipse
                      cx="673"
                      cy="233"
                      rx="145"
                      ry="60"
                      transform="rotate(18 673 233)"
                      stroke="#A9D8FF"
                      strokeOpacity="0.24"
                      strokeWidth="0.8"
                    />
                    <circle
                      cx="673"
                      cy="233"
                      r="112"
                      stroke="#6E5BFF"
                      strokeOpacity="0.22"
                      strokeWidth="0.8"
                      strokeDasharray="2 5"
                    />
                  </g>

                  {/* Slowly Rotating Scanning Beam Around (673, 233) */}
                  <g
                    style={{ transformOrigin: "673px 233px" }}
                    className={
                      prefersReducedMotion ? "" : "animate-radar-sweep"
                    }
                  >
                    <path
                      d="M 673 233 L 835 165 A 175 175 0 0 1 815 335 Z"
                      fill="url(#observatoryScanBeam)"
                    />
                    <line
                      x1="673"
                      y1="233"
                      x2="835"
                      y2="165"
                      stroke="#A9D8FF"
                      strokeOpacity="0.5"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Luminous Trajectory Connecting Primary Signal toward Section 03 */}
                  <path
                    d="M 673 233 Q 640 390 480 540"
                    stroke="#A79AFF"
                    strokeOpacity={0.22 + scrollProgress * 0.45}
                    strokeWidth="1.2"
                    strokeDasharray="4 5"
                  />
                </svg>

                {/* Interactive Signal Hotspots Over the Observatory Hologram */}
                {OBSERVATORY_HOTSPOTS.map((spot) => {
                  const sig = RADAR_SIGNALS[spot.signalIndex]
                  if (!sig) return null
                  const isSelected = sig.id === activeSignal.id
                  return (
                    <button
                      key={sig.id}
                      type="button"
                      style={{ left: spot.left, top: spot.top }}
                      onMouseEnter={() => onSelectSignal(sig.id)}
                      onFocus={() => onSelectSignal(sig.id)}
                      onClick={() => onSelectSignal(sig.id)}
                      aria-label={`Сигнал ${sig.alias} (${sig.stateLabel}) — выбрать для предпросмотра`}
                      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F4F3FA]"
                    >
                      {/* Restrained Pulse Halo */}
                      <span
                        style={{ animationDelay: `${spot.delayMs}ms` }}
                        className={`pointer-events-none absolute inset-1 rounded-full ${
                          prefersReducedMotion ? "" : "animate-signal-pulse"
                        } ${
                          spot.isPrimary || isSelected
                            ? "bg-[#6E5BFF]/55"
                            : "bg-[#A9D8FF]/30"
                        }`}
                        aria-hidden="true"
                      />
                      {/* Core Luminous Dot */}
                      <span
                        className={`relative block rounded-full transition-all duration-300 ${
                          isSelected
                            ? "h-3.5 w-3.5 bg-[#F4F3FA] shadow-[0_0_18px_4px_#6E5BFF] ring-2 ring-[#A79AFF]"
                            : spot.isPrimary
                              ? "h-3 w-3 bg-[#A79AFF] shadow-[0_0_12px_2px_#6E5BFF]"
                              : "h-2.5 w-2.5 bg-[#A9D8FF]/90 group-hover:bg-[#F4F3FA] group-hover:scale-125"
                        }`}
                        aria-hidden="true"
                      />
                      {/* Floating Coordinate Tag */}
                      <span
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono-tech text-[9px] tracking-[0.12em] transition-all duration-300 ${
                          isSelected
                            ? "bg-[#14182A]/95 text-[#F4F3FA] border border-[#A79AFF]/60 opacity-100"
                            : "bg-[#080910]/85 text-[#A1A2B5] border border-[rgba(190,185,255,0.2)] opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {sig.alias}
                      </span>
                    </button>
                  )
                })}

                {/* Bottom Caption Bar Inside Observatory Frame */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#080910]/75 backdrop-blur-md border border-[rgba(190,185,255,0.14)] px-3.5 py-2">
                  <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#F4F3FA]/90">
                    <Compass
                      className="h-3.5 w-3.5 text-[#A79AFF]"
                      aria-hidden="true"
                    />
                    <span>SCANNING THE UNIVERSE · {activeSignal.coordinates}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[#A9D8FF]">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    <span>ФОКУС НА СИГНАЛЕ: {activeSignal.alias.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-Linked Luminous Carry-Over Line into Section 03 (Synchronicity) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <div
          className="w-[1.5px] bg-gradient-to-b from-transparent via-[#A79AFF]/65 to-[#A9D8FF]/80 transition-all duration-300"
          style={{
            height: `${Math.round(36 + scrollProgress * 44)}px`,
          }}
        />
        <span className="h-2 w-2 rounded-full bg-[#A9D8FF] shadow-[0_0_12px_#A9D8FF]" />
      </div>
    </section>
  )
}
