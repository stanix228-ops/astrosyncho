import React, { useState, useEffect, useRef } from "react"
import { ArrowDownRight } from "lucide-react"
import {
  usePrefersReducedMotion,
  useInView,
} from "@/hooks/useMotionPreferences"

type ConnectionShowcaseProps = {
  profileName?: string
  subtitle?: string
  portraitSrc?: string
  portraitAlt?: string
}

export const Connection: React.FC<ConnectionShowcaseProps> = ({
  profileName = "Новый сигнал",
  subtitle = "Возможно, вам есть о чём поговорить",
  portraitSrc = "./images/desires-portrait-01.webp",
  portraitAlt = "Иллюстративный портрет найденного сигнала в интерфейсе AstroSyncho",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { hasEntered } = useInView(sectionRef, "120px")

  // 3-step visual story when entering the viewport:
  // 1 -> Profile card visible, 2 -> Connecting line illuminates, 3 -> Conversation preview appears
  const [storyStep, setStoryStep] = useState<number>(
    prefersReducedMotion ? 3 : 0
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      setStoryStep(3)
      return
    }
    if (!hasEntered) return

    const t1 = window.setTimeout(() => setStoryStep(1), 80)
    const t2 = window.setTimeout(() => setStoryStep(2), 380)
    const t3 = window.setTimeout(() => setStoryStep(3), 680)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [hasEntered, prefersReducedMotion])

  const scrollToBeta = () => {
    const el = document.getElementById("beta")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="connection"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#080910] border-t border-[rgba(190,185,255,0.12)]"
      aria-labelledby="connection-heading"
    >
      {/* Atmospheric Backdrop: connection-hero.webp */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="./images/connection-hero.webp"
          alt=""
          width={1400}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080910] via-[#080910]/45 to-[#080910]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section Copy Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
              CONNECTION / 04
            </span>
            <span
              className="h-1 w-1 rounded-full bg-[#A9D8FF]/60"
              aria-hidden="true"
            />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A1A2B5]">
              FROM DISCOVERY TO CONNECTION
            </span>
          </div>

          <h2
            id="connection-heading"
            className="mt-3 font-editorial text-4xl sm:text-5xl lg:text-[58px] font-normal text-[#F4F3FA] leading-[1.06] tracking-[-0.015em]"
          >
            Сигнал найден.{" "}
            <span className="italic font-light text-[#A9D8FF]">
              История начинается.
            </span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#A1A2B5] font-light leading-[1.65]">
            Первый интерес превращается в разговор. А дальше всё зависит от вас
            двоих.
          </p>
        </div>

        {/* Product Showcase Mockup (Real HTML & CSS) */}
        <div className="mt-12 lg:mt-16">
          <div className="connection-showcase">
            {/* Step 1: Profile Card Preview */}
            <div
              className={`connection-showcase__profile transition-all duration-700 ease-out ${
                storyStep >= 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="connection-showcase__image">
                <img
                  src={portraitSrc}
                  alt={portraitAlt}
                  width={896}
                  height={1200}
                  loading="lazy"
                />
              </div>

              <div className="connection-showcase__details">
                <div className="flex items-center justify-between gap-2 mt-3">
                  <span className="connection-showcase__eyebrow">
                    SIGNAL DISCOVERED
                  </span>
                  <span className="rounded-full border border-[rgba(190,185,255,0.18)] bg-[#0D0F18]/80 px-2.5 py-0.5 font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A1A2B5]">
                    ДЕМО-ПРОФИЛЬ
                  </span>
                </div>

                <h3>{profileName}</h3>
                <p>{subtitle}</p>

                <div className="mt-4 pt-3 border-t border-[rgba(190,185,255,0.12)] flex flex-wrap gap-2">
                  <span className="rounded-full border border-[rgba(190,185,255,0.16)] bg-[#14182A]/75 px-3 py-1 font-sans text-xs text-[#F4F3FA]/90">
                    Интересы и эстетика
                  </span>
                  <span className="rounded-full border border-[rgba(190,185,255,0.16)] bg-[#14182A]/75 px-3 py-1 font-sans text-xs text-[#F4F3FA]/90">
                    Вечерний ритм
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Delicate Connecting Line */}
            <div
              className={`connection-showcase__link transition-all duration-700 ease-out ${
                storyStep >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              aria-hidden="true"
            >
              <span />
            </div>

            {/* Step 3: Conversation Preview */}
            <div
              className={`connection-showcase__conversation transition-all duration-700 ease-out ${
                storyStep >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(190,185,255,0.12)]">
                <span className="connection-showcase__eyebrow">
                  A NEW CONNECTION
                </span>
                <span className="font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A9D8FF]">
                  ПРИМЕР ДИАЛОГА
                </span>
              </div>

              <div className="connection-showcase__message">
                Привет! Что тебя привело сюда?
              </div>

              <div className="connection-showcase__message connection-showcase__message--reply">
                Любопытство. И желание встретить интересного человека.
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(190,185,255,0.12)] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono-tech text-[10px] text-[#A1A2B5]">
                  Иллюстративный макет интерфейса переписки
                </span>
                <button
                  type="button"
                  onClick={scrollToBeta}
                  className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#A79AFF] hover:text-[#F4F3FA] transition-colors cursor-pointer"
                >
                  <span>Присоединиться к бете</span>
                  <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
