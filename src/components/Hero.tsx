import React, { useState } from "react"
import { ArrowDownRight, Compass, Radio, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RADAR_SIGNALS } from "@/data/astroData"

interface HeroProps {
  onSelectRadarSignal: (signalId: string) => void
}

export const Hero: React.FC<HeroProps> = ({ onSelectRadarSignal }) => {
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    setPointerOffset({ x: normX * 16, y: normY * 16 })
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#080910]"
      aria-label="AstroSyncho — Главный экран"
    >
      {/* Background Ambient Nebula & Radial Light */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-36 right-[-10%] h-[620px] w-[620px] rounded-full opacity-35 blur-[130px] transition-transform duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(110,91,255,0.48) 0%, rgba(20,24,42,0.1) 70%, transparent 100%)",
            transform: `translate(${pointerOffset.x * -1.2}px, ${pointerOffset.y * -1.2}px)`,
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[5%] h-[520px] w-[520px] rounded-full opacity-25 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(167,154,255,0.35) 0%, rgba(13,15,24,0.05) 70%, transparent 100%)",
          }}
        />
        {/* Fine architectural orbital grid lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.14]"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="980" cy="450" r="260" stroke="#A79AFF" strokeWidth="0.6" strokeDasharray="3 6" />
          <circle cx="980" cy="450" r="410" stroke="#6E5BFF" strokeWidth="0.7" />
          <circle cx="980" cy="450" r="580" stroke="#A7A6B8" strokeWidth="0.5" strokeDasharray="1 8" />
          <line x1="0" y1="450" x2="1440" y2="450" stroke="#A79AFF" strokeWidth="0.4" strokeOpacity="0.4" />
          <line x1="980" y1="0" x2="980" y2="900" stroke="#A79AFF" strokeWidth="0.4" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 animate-hero-reveal">
              <Badge variant="signal" className="text-[10px] sm:text-[11px] px-2.5 sm:px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A79AFF] animate-ping shrink-0" aria-hidden="true" />
                <span>OPEN BETA · ПРИЁМ СИГНАЛОВ</span>
              </Badge>
              <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                RA 18H 36M · СИНХРОННОСТЬ
              </span>
            </div>

            {/* Monumental Brand Identity + Headline */}
            <div className="space-y-3 sm:space-y-4">
              <p className="font-brand italic text-2xl sm:text-3xl text-[#A79AFF] tracking-wide">
                AstroSyncho
              </p>
              <h1 className="font-editorial text-4xl sm:text-6xl xl:text-[74px] font-normal tracking-[-0.02em] text-[#F4F0FF] leading-[1.02]">
                Не случайность.{" "}
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#F4F0FF] via-[#A79AFF] to-[#6E5BFF]">
                  Синхронность.
                </span>
              </h1>
            </div>

            <p className="max-w-xl text-base sm:text-lg lg:text-[19px] text-[#A7A6B8] font-light leading-relaxed">
              Где-то во Вселенной есть человек, чей сигнал совпадает с твоим.
              Премиальное цифровое пространство знакомств, построенное на совпадении
              внутренних ритмов, редких эмоциональных импульсах и деликатной приватности.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo("beta")}
                className="group"
              >
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>Присоединиться к Beta</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </Button>

              <Button
                variant="orbital"
                size="lg"
                onClick={() => scrollTo("radar")}
              >
                <Compass className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                <span>Исследовать радар сигналов</span>
              </Button>
            </div>

            {/* Conceptual Telemetry Bar */}
            <div className="pt-4 sm:pt-6 border-t border-[#A79AFF]/15 w-full grid grid-cols-1 min-[400px]:grid-cols-3 gap-3.5 sm:gap-4 max-w-xl">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  МЕХАНИКА ПОИСКА
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Без свайпов и лент
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  МОДЕЛЬ СВЯЗИ
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Резонанс ритмов
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8]">
                  ПРИВАТНОСТЬ
                </div>
                <div className="mt-1 font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Закрытая орбита
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Hero Portrait + Interactive Orbital Radar Frame */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-[540px] lg:max-w-none rounded-[28px] overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] shadow-[0_0_70px_-15px_rgba(110,91,255,0.35)] transition-transform duration-500 ease-out"
              style={{
                transform: `translate(${pointerOffset.x * 0.45}px, ${pointerOffset.y * 0.45}px)`,
              }}
            >
              {/* Top Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-[#080910]/80 backdrop-blur-md border border-[#A79AFF]/25 px-3 py-1 font-mono-tech text-[10px] tracking-[0.18em] text-[#F4F0FF]">
                  SIG // 01-LYRA · 96.4% СИНХРОННОСТЬ
                </span>
                <span className="rounded-full bg-[#080910]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#A7A6B8]">
                  DEMO PREVIEW
                </span>
              </div>

              {/* Hero Editorial Image */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/4.4] w-full overflow-hidden">
                <img
                  src="./images/hero-portrait.webp"
                  alt="Портрет молодой женщины с выразительным спокойным взглядом в глубоком полуночно-синем и фиолетовом освещении"
                  className="h-full w-full object-cover object-[62%_center] scale-[1.03] transition-transform duration-1000 hover:scale-105"
                  fetchPriority="high"
                />
                {/* Cinematic vignette & gradient blend */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910] via-[#080910]/25 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080910]/55 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Animated Orbital Overlay over Portrait */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
                  viewBox="0 0 400 440"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="235"
                    cy="195"
                    r="118"
                    stroke="#A79AFF"
                    strokeWidth="0.75"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="235"
                    cy="195"
                    r="162"
                    stroke="#6E5BFF"
                    strokeWidth="0.6"
                    strokeOpacity="0.6"
                  />
                  <circle cx="132" cy="138" r="4" fill="#F4F0FF" />
                  <circle cx="132" cy="138" r="11" stroke="#A79AFF" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>

              {/* Bottom Interactive Signal Card Inside Hero Frame */}
              <div className="relative z-20 p-5 sm:p-6 bg-gradient-to-t from-[#080910] via-[#0D0F18]/95 to-[#0D0F18]/80 border-t border-[#A79AFF]/15">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#6E5BFF] shadow-[0_0_10px_#6E5BFF]" />
                    <span className="font-editorial text-xl text-[#F4F0FF]">
                      Элина, 27 · Вечерний резонанс
                    </span>
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#A79AFF]">
                    λ 495 nm
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A7A6B8] font-light line-clamp-2 mb-4">
                  «Ищу не анкету, а человека, с которым тишина в два часа ночи звучит как продолжение разговора.»
                </p>

                {/* Quick Signal Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A7A6B8] flex items-center gap-1.5">
                    <Radio className="h-3 w-3 text-[#A79AFF]" aria-hidden="true" />
                    Обнаружены на радаре:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {RADAR_SIGNALS.slice(0, 3).map((sig) => (
                      <button
                        key={sig.id}
                        type="button"
                        onClick={() => {
                          onSelectRadarSignal(sig.id)
                          scrollTo("radar")
                        }}
                        className="rounded-full bg-[#14182A] hover:bg-[#6E5BFF]/25 border border-[#A79AFF]/25 hover:border-[#A79AFF] px-2.5 py-1 font-mono-tech text-[10px] text-[#F4F0FF] transition-all cursor-pointer"
                      >
                        {sig.alias.split(" ")[0]} · {sig.resonancePct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 flex items-center justify-between text-xs font-mono-tech text-[#A7A6B8]/80">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6E5BFF]" />
          <span>КОСМИЧЕСКИЙ РАДАР · ЖИВАЯ ГАЛАКТИКА · ЧЕЛОВЕЧЕСКОЕ ПРИТЯЖЕНИЕ</span>
        </div>
        <a
          href="#radar"
          onClick={(e) => {
            e.preventDefault()
            scrollTo("radar")
          }}
          className="hidden sm:inline-flex items-center gap-2 text-[#A79AFF] hover:text-[#F4F0FF] transition-colors"
        >
          <span>СКАНИРОВАТЬ СИГНАЛЫ</span>
          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
