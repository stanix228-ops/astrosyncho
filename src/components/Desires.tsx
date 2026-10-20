import React, { useState, useRef } from "react"
import { Sparkles } from "lucide-react"
import {
  usePrefersReducedMotion,
  useInView,
} from "@/hooks/useMotionPreferences"

interface DesiresProps {
  selectedDesireIds?: string[]
  onToggleDesire?: (id: string) => void
}

interface EditorialPortraitItem {
  id: string
  name: string
  age: number
  src: string
  alt: string
  categoryLabel: string
  note: string
}

const EDITORIAL_PORTRAITS: EditorialPortraitItem[] = [
  {
    id: "portrait-01",
    name: "Адель",
    age: 28,
    src: "./images/desires-portrait-01.webp",
    alt: "Редакционный портрет молодой женщины в мягком сумеречном и лавандовом освещении",
    categoryLabel: "ЦЕННОСТИ · ТОНКОЕ ВОСПРИЯТИЕ",
    note: "Ценит искреннюю интонацию, ночные разговоры и людей, рядом с которыми можно быть собой без ролей.",
  },
  {
    id: "portrait-02",
    name: "Леон",
    age: 31,
    src: "./images/desires-portrait-02.webp",
    alt: "Редакционный портрет мужчины со спокойным взглядом в глубоком графитовом пространстве",
    categoryLabel: "ОБРАЗ ЖИЗНИ · АРХИТЕКТУРА И ТИШИНА",
    note: "Ищет спокойное притяжение, совпадение вечернего ритма и содержательный диалог.",
  },
  {
    id: "portrait-03",
    name: "Клара",
    age: 26,
    src: "./images/desires-portrait-03.webp",
    alt: "Камерный кинематографический портрет молодой женщины с мягким серебристо-фиолетовым отблеском",
    categoryLabel: "ИНТЕРЕСЫ · ЭСТЕТИКА И МУЗЫКА",
    note: "Вдохновляется камерным кино, аналоговым звуком и спонтанными маршрутами по ночному городу.",
  },
]

const PREFERENCE_CATEGORIES = [
  {
    title: "Интересы",
    detail: "Музыка, кино, искусство, книги и темы, которые вдохновляют.",
  },
  {
    title: "Образ жизни",
    detail: "Привычный ритм дня, отношение к спонтанности и совместному отдыху.",
  },
  {
    title: "Ценности",
    detail: "Личные границы, открытость, эмпатия и взгляд на близость.",
  },
  {
    title: "Предпочтения",
    detail: "Комфортный формат знакомства, темп сближения и тональность общения.",
  },
]

export const Desires: React.FC<DesiresProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { hasEntered } = useInView(sectionRef, "150px")

  const [activePortraitId, setActivePortraitId] = useState<string>(
    EDITORIAL_PORTRAITS[0].id
  )

  const activePortrait =
    EDITORIAL_PORTRAITS.find((p) => p.id === activePortraitId) ||
    EDITORIAL_PORTRAITS[0]

  return (
    <section
      id="desires"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#080910] border-t border-[rgba(190,185,255,0.12)]"
      aria-labelledby="desires-heading"
    >
      {/* Restrained Lavender Light Source */}
      <div
        className="pointer-events-none absolute top-1/3 right-[-8%] h-[500px] w-[500px] rounded-full opacity-18 blur-[135px]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,91,255,0.34) 0%, rgba(169,216,255,0.1) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center transition-all duration-1000 ease-out ${
            hasEntered || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left Column (5 Cols): Heading, Supporting Copy & Preference Categories */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
                DESIRES / 03
              </span>
              <span
                className="h-1 w-1 rounded-full bg-[#A9D8FF]/60"
                aria-hidden="true"
              />
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A1A2B5]">
                DISCOVER WHAT CONNECTS YOU
              </span>
            </div>

            <h2
              id="desires-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F3FA] leading-[1.06] tracking-[-0.015em]"
            >
              Тебе не нужно притворяться{" "}
              <span className="italic font-light text-[#A79AFF]">
                кем-то другим.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#A1A2B5] font-light leading-[1.65] max-w-[480px]">
              Расскажи о том, что тебя привлекает. Открывай людей с похожими
              интересами, взглядами и желаниями.
            </p>

            {/* Preference Categories (Visual Examples) */}
            <div className="w-full pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A1A2B5]">
                  ОРИЕНТИРЫ ЛИЧНОГО ПРОФИЛЯ (ПРИМЕРЫ КАТЕГОРИЙ)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PREFERENCE_CATEGORIES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[rgba(190,185,255,0.14)] bg-[rgba(19,21,38,0.58)] p-4 transition-colors duration-300 hover:border-[#A79AFF]/40"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#A79AFF]"
                        aria-hidden="true"
                      />
                      <h3 className="font-editorial text-xl text-[#F4F3FA]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 font-sans text-xs text-[#A1A2B5] font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Editorial Portrait Note */}
            <div className="w-full rounded-[20px] border border-[rgba(190,185,255,0.16)] bg-[rgba(19,21,38,0.68)] backdrop-blur-xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A9D8FF]">
                  {activePortrait.categoryLabel}
                </span>
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A1A2B5]">
                  ИЛЛЮСТРАТИВНЫЙ ПОРТРЕТ
                </span>
              </div>
              <div className="mt-2 font-editorial text-2xl text-[#F4F3FA]">
                {activePortrait.name}, {activePortrait.age}
              </div>
              <p className="mt-1 font-sans text-xs sm:text-sm text-[#A1A2B5] font-light leading-relaxed">
                {activePortrait.note}
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Asymmetric Editorial Portrait Arrangement */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* Dominant Visual Anchor Portrait (7 Cols on sm+) */}
              <div className="sm:col-span-7">
                <button
                  type="button"
                  onClick={() => setActivePortraitId(EDITORIAL_PORTRAITS[0].id)}
                  onMouseEnter={() =>
                    setActivePortraitId(EDITORIAL_PORTRAITS[0].id)
                  }
                  className={`group relative block w-full text-left rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer bg-[#0D0F18] ${
                    activePortrait.id === EDITORIAL_PORTRAITS[0].id
                      ? "border-[#A79AFF]/60 shadow-[0_24px_70px_-20px_rgba(110,91,255,0.38)]"
                      : "border-[rgba(190,185,255,0.16)] hover:border-[#A79AFF]/40"
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={EDITORIAL_PORTRAITS[0].src}
                      alt={EDITORIAL_PORTRAITS[0].alt}
                      width={896}
                      height={1200}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910]/90 via-[#080910]/15 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Translucent Interface Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-[rgba(190,185,255,0.18)] bg-[rgba(19,21,38,0.72)] backdrop-blur-md p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A79AFF]">
                        {EDITORIAL_PORTRAITS[0].categoryLabel}
                      </span>
                      <Sparkles
                        className="h-3.5 w-3.5 text-[#A9D8FF]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-1 font-editorial text-2xl text-[#F4F3FA]">
                      {EDITORIAL_PORTRAITS[0].name}, {EDITORIAL_PORTRAITS[0].age}
                    </div>
                  </div>
                </button>
              </div>

              {/* Staggered Secondary Column (5 Cols on sm+) */}
              <div className="sm:col-span-5 flex flex-col gap-5 sm:gap-6 sm:pt-10">
                {EDITORIAL_PORTRAITS.slice(1).map((portrait) => {
                  const isSelected = activePortrait.id === portrait.id
                  return (
                    <button
                      key={portrait.id}
                      type="button"
                      onClick={() => setActivePortraitId(portrait.id)}
                      onMouseEnter={() => setActivePortraitId(portrait.id)}
                      className={`group relative block w-full text-left rounded-[22px] overflow-hidden border transition-all duration-500 cursor-pointer bg-[#0D0F18] ${
                        isSelected
                          ? "border-[#A79AFF]/60 shadow-[0_20px_55px_-18px_rgba(110,91,255,0.35)]"
                          : "border-[rgba(190,185,255,0.16)] hover:border-[#A79AFF]/40"
                      }`}
                    >
                      <div className="aspect-[4/4.6] w-full overflow-hidden">
                        <img
                          src={portrait.src}
                          alt={portrait.alt}
                          width={896}
                          height={1200}
                          loading="lazy"
                          className="h-full w-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910]/90 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-[rgba(190,185,255,0.16)] bg-[rgba(19,21,38,0.72)] backdrop-blur-md px-3.5 py-2.5">
                        <span className="block font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A9D8FF] truncate">
                          {portrait.categoryLabel}
                        </span>
                        <span className="mt-0.5 block font-editorial text-xl text-[#F4F3FA]">
                          {portrait.name}, {portrait.age}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
