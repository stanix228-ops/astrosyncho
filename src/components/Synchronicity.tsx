import React, { useState, useRef } from "react"
import { Sparkles } from "lucide-react"
import { type RadarSignalNode } from "@/data/astroData"
import {
  usePrefersReducedMotion,
  useInView,
} from "@/hooks/useMotionPreferences"

interface SynchronicityProps {
  partnerSignal: RadarSignalNode
  onSelectSignal?: (id: string) => void
}

interface SynchronicityCategory {
  id: string
  title: string
  code: string
  description: string
  sharedExamples: string[]
  orbitAccent: "lavender" | "ice"
}

const SYNCHRONICITY_CATEGORIES: SynchronicityCategory[] = [
  {
    id: "interests",
    title: "Интересы",
    code: "LAYER // 01",
    description:
      "Музыка, ночные маршруты, современное искусство, кинематограф и темы, которые вызывают живой отклик.",
    sharedExamples: [
      "Аналоговое звучание и винил",
      "Камерные выставки и архитектура",
      "Ночные прогулки по городу",
    ],
    orbitAccent: "lavender",
  },
  {
    id: "values",
    title: "Ценности",
    code: "LAYER // 02",
    description:
      "Бережное отношение к личному пространству, искренность без масок и уважение к темпу другого человека.",
    sharedExamples: [
      "Эмоциональная зрелость и такт",
      "Глубина вместо поверхностного свайпа",
      "Внимание к деталям и словам",
    ],
    orbitAccent: "ice",
  },
  {
    id: "lifestyle",
    title: "Образ жизни",
    code: "LAYER // 03",
    description:
      "Совпадение суточных ритмов, отношение к спонтанности, путешествиям и балансу между уединением и близостью.",
    sharedExamples: [
      "Вечерний и ночной ритм активности",
      "Спонтанные поездки на выходные",
      "Эстетика спокойного минимализма",
    ],
    orbitAccent: "lavender",
  },
  {
    id: "communication",
    title: "Предпочтения в общении",
    code: "LAYER // 04",
    description:
      "Как именно начинается ваш диалог — с неспешной переписки, тонкой иронии или вдумчивого разговора один на один.",
    sharedExamples: [
      "Диалог без давления и спешки",
      "Тёплая интонация и живой юмор",
      "Переход от переписки к встрече",
    ],
    orbitAccent: "ice",
  },
]

export const Synchronicity: React.FC<SynchronicityProps> = ({
  partnerSignal,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { hasEntered } = useInView(sectionRef, "150px")

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    SYNCHRONICITY_CATEGORIES[0].id
  )

  const activeCategory =
    SYNCHRONICITY_CATEGORIES.find((c) => c.id === activeCategoryId) ||
    SYNCHRONICITY_CATEGORIES[0]

  return (
    <section
      id="synchronicity"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#080910] border-t border-[rgba(190,185,255,0.12)]"
      aria-labelledby="synchronicity-heading"
    >
      {/* Subtle Dual Ambient Illumination (Lavender Left, Icy-Blue Right) */}
      <div
        className="pointer-events-none absolute top-1/3 left-[-10%] h-[480px] w-[480px] rounded-full opacity-18 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,154,255,0.34) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-[-10%] h-[480px] w-[480px] rounded-full opacity-18 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(169,216,255,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div
          className={`max-w-3xl transition-all duration-1000 ease-out ${
            hasEntered || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
            SYNCHRONICITY / 02
          </span>

          <h2
            id="synchronicity-heading"
            className="mt-3 font-editorial text-4xl sm:text-5xl lg:text-[58px] font-normal text-[#F4F3FA] leading-[1.06] tracking-[-0.015em]"
          >
            Не просто встретиться.{" "}
            <span className="italic font-light text-[#A9D8FF]">
              Почувствовать совпадение.
            </span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#A1A2B5] font-light leading-[1.65] max-w-2xl">
            Иногда связь начинается с общих интересов, взглядов и желаний.
            Узнай, что может объединять тебя с другим человеком.
          </p>
        </div>

        {/* Main Composition: Converging Orbits Visual Anchor + Understated Compatibility Interface */}
        <div className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Cols: Original Synchronicity Key Visual + Refined Dual-Orbit SVG Motion */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[26px] overflow-hidden border border-[rgba(190,185,255,0.18)] bg-[#0D0F18] shadow-[0_24px_80px_-20px_rgba(8,9,16,0.9)]">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src="./images/synchronicity.webp"
                  alt="Две светящиеся орбитальные системы — лавандовая и ледяная голубая — плавно сближаются в общей точке притяжения"
                  width={1376}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />

                {/* Subtle Edge Blending */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910]/80 via-transparent to-[#080910]/30"
                  aria-hidden="true"
                />

                {/* Lightweight SVG Orbital Convergence Sequence */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 960 540"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="convergenceGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F4F3FA" stopOpacity="0.95" />
                      <stop offset="40%" stopColor="#A79AFF" stopOpacity="0.55" />
                      <stop offset="75%" stopColor="#A9D8FF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#080910" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Orbit 1: Lavender-Violet System (Left, converging at x=648, y=270) */}
                  <path
                    id="orbitPathLavender"
                    d="M 170 270 A 239 142 0 1 1 648 270 A 239 142 0 1 1 170 270"
                    stroke="#A79AFF"
                    strokeOpacity={
                      activeCategory.orbitAccent === "lavender" ? "0.48" : "0.24"
                    }
                    strokeWidth="1.1"
                    strokeDasharray="5 6"
                  />

                  {/* Orbit 2: Icy-Blue System (Right, converging at x=648, y=270) */}
                  <path
                    id="orbitPathIce"
                    d="M 648 270 A 72 82 0 1 1 792 270 A 72 82 0 1 1 648 270"
                    stroke="#A9D8FF"
                    strokeOpacity={
                      activeCategory.orbitAccent === "ice" ? "0.52" : "0.28"
                    }
                    strokeWidth="1.1"
                    strokeDasharray="4 5"
                  />

                  {/* Travelling Light Points Along Both Orbits */}
                  {!prefersReducedMotion && (
                    <>
                      <circle r="3.5" fill="#F4F3FA">
                        <animateMotion
                          dur="14s"
                          repeatCount="indefinite"
                          path="M 170 270 A 239 142 0 1 1 648 270 A 239 142 0 1 1 170 270"
                        />
                      </circle>
                      <circle r="3" fill="#A9D8FF">
                        <animateMotion
                          dur="10s"
                          repeatCount="indefinite"
                          path="M 792 270 A 72 82 0 1 1 648 270 A 72 82 0 1 1 792 270"
                        />
                      </circle>
                    </>
                  )}

                  {/* Luminous Intersection Point (x=648, y=270) */}
                  <circle
                    cx="648"
                    cy="270"
                    r="34"
                    fill="url(#convergenceGlow)"
                  />
                  <circle
                    cx="648"
                    cy="270"
                    r="4.5"
                    fill="#F4F3FA"
                  />

                  {/* Minimal Integrated Labels */}
                  <g className="hidden sm:block">
                    <text
                      x="170"
                      y="235"
                      fill="#A79AFF"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="2"
                    >
                      ВАША ОРБИТА
                    </text>
                    <text
                      x="735"
                      y="235"
                      fill="#A9D8FF"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="2"
                    >
                      {partnerSignal.alias.toUpperCase()}
                    </text>
                    <text
                      x="585"
                      y="218"
                      fill="#F4F3FA"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      letterSpacing="2"
                    >
                      ТОЧКА СОВПАДЕНИЯ
                    </text>
                  </g>
                </svg>

                {/* Bottom Closing Phrase Inside Visual Frame */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#080910]/78 backdrop-blur-md border border-[rgba(190,185,255,0.14)] px-4 py-2.5">
                  <span className="font-editorial italic text-lg sm:text-xl text-[#F4F3FA]">
                    «Две истории. Одна точка притяжения».
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A9D8FF]">
                    ИЛЛЮСТРАТИВНАЯ МОДЕЛЬ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Conceptual Categories & Illustrative Shared Resonance */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* 4 Conceptual Categories Selector */}
            <div
              role="tablist"
              aria-label="Сферы совпадения"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {SYNCHRONICITY_CATEGORIES.map((cat) => {
                const isSelected = cat.id === activeCategory.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`text-left rounded-[18px] p-4 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? "bg-[#14182A]/90 border-[#A79AFF]/55 shadow-[0_0_28px_-8px_rgba(110,91,255,0.35)]"
                        : "bg-[rgba(19,21,38,0.52)] border-[rgba(190,185,255,0.12)] hover:border-[rgba(190,185,255,0.28)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A1A2B5]">
                        {cat.code}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full transition-colors ${
                          isSelected
                            ? cat.orbitAccent === "lavender"
                              ? "bg-[#A79AFF] shadow-[0_0_8px_#A79AFF]"
                              : "bg-[#A9D8FF] shadow-[0_0_8px_#A9D8FF]"
                            : "bg-white/15"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-2 font-editorial text-2xl text-[#F4F3FA]">
                      {cat.title}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Category Detail & Illustrative Examples */}
            <div
              role="tabpanel"
              className="rounded-[22px] border border-[rgba(190,185,255,0.16)] bg-[rgba(19,21,38,0.68)] backdrop-blur-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF]">
                  ПРИМЕР ТОЧЕК СОПРИКОСНОВЕНИЯ · {activeCategory.title.toUpperCase()}
                </span>
                <Sparkles
                  className="h-4 w-4 text-[#A9D8FF]"
                  aria-hidden="true"
                />
              </div>

              <p className="font-sans text-sm sm:text-[15px] text-[#A1A2B5] font-light leading-relaxed">
                {activeCategory.description}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-[rgba(190,185,255,0.1)]">
                {activeCategory.sharedExamples.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-sans text-sm text-[#F4F3FA]/90"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#A79AFF] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-2 font-mono-tech text-[10px] text-[#A1A2B5]/80 leading-relaxed">
                Иллюстративный пример концепции. Совпадение орбит отражает общие
                ориентиры в профиле и не является научным или гарантированным
                расчётом совместимости.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
