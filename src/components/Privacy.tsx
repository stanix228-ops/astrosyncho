import React, { useRef } from "react"
import { Sliders, Database, UserX, ShieldAlert, FileText } from "lucide-react"
import {
  usePrefersReducedMotion,
  useInView,
} from "@/hooks/useMotionPreferences"
import type { LegalDocType } from "@/components/LegalModal"

interface PrivacyProps {
  onOpenLegal?: (doc: LegalDocType) => void
}

const PRIVACY_ITEMS = [
  {
    icon: Sliders,
    title: "Настройки профиля",
    description:
      "Вы сами определяете, какие фотографии, интересы и детали анкеты отображаются в вашем профиле при знакомстве.",
  },
  {
    icon: Database,
    title: "Управление данными",
    description:
      "Прозрачный контроль над переданной информацией и возможность в любой момент запросить изменение или удаление учётных данных.",
  },
  {
    icon: UserX,
    title: "Блокировка пользователей",
    description:
      "Возможность мгновенно прекратить диалог и ограничить доступ любого участника к вашему профилю.",
  },
  {
    icon: ShieldAlert,
    title: "Жалобы и безопасность",
    description:
      "Инструменты отправки обращений модерации при нарушении правил уважительного общения на платформе.",
  },
]

export const Privacy: React.FC<PrivacyProps> = ({ onOpenLegal }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { hasEntered } = useInView(sectionRef, "150px")

  return (
    <section
      id="privacy"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#080910]"
      aria-labelledby="privacy-heading"
    >
      {/* Calm, Restrained Ambient Background Light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full opacity-14 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,154,255,0.28) 0%, rgba(169,216,255,0.08) 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start transition-opacity duration-1000 ease-out ${
            hasEntered || prefersReducedMotion ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left Column (5 Cols): Calm Editorial Copy, Transparency Note & Legal Links */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
              PRIVACY / 05
            </span>

            <h2
              id="privacy-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F3FA] leading-[1.06] tracking-[-0.015em]"
            >
              Твоё пространство.{" "}
              <span className="italic font-light text-[#A79AFF]">
                Твои правила.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#A1A2B5] font-light leading-[1.65] max-w-[480px]">
              Знакомься в комфортном для себя темпе. Понимай, какую информацию о
              себе раскрываешь и как управляешь своим профилем.
            </p>

            <div className="w-full max-w-[480px] rounded-none border border-[rgba(190,185,255,0.16)] bg-[rgba(19,21,38,0.62)] backdrop-blur-md p-5">
              <span className="block font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A9D8FF]">
                ПРОЗРАЧНОСТЬ И КОНТРОЛЬ
              </span>
              <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#F4F3FA]/90 font-light leading-relaxed">
                Спокойная цифровая среда, в которой вы сами выбираете темп
                знакомства и объём открытой информации.
              </p>
            </div>

            {/* Direct Link to Privacy Policy Modal */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenLegal?.("privacy")}
                className="inline-flex items-center gap-2 rounded-none border border-[rgba(190,185,255,0.24)] bg-[#14182A]/75 px-5 py-2.5 font-sans text-xs sm:text-sm text-[#F4F3FA] hover:border-[#A79AFF] transition-colors cursor-pointer"
              >
                <FileText
                  className="h-4 w-4 text-[#A79AFF]"
                  aria-hidden="true"
                />
                <span>Политика конфиденциальности</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenLegal?.("terms")}
                className="font-mono-tech text-xs text-[#A1A2B5] hover:text-[#F4F3FA] transition-colors cursor-pointer"
              >
                Пользовательское соглашение
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): 2x2 Architectural Grid of Planned Privacy Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-2 pb-1">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A1A2B5]">
                ПЛАНИРУЕМАЯ АРХИТЕКТУРА УПРАВЛЕНИЯ ПРОФИЛЕМ В ПРИЛОЖЕНИИ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRIVACY_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex flex-col justify-between gap-4 rounded-none border border-[rgba(190,185,255,0.14)] bg-[rgba(19,21,38,0.58)] p-5 sm:p-6 transition-colors hover:border-[rgba(190,185,255,0.26)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[rgba(190,185,255,0.2)] bg-[#14182A]/80 text-[#A79AFF]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span className="font-mono-tech text-[9px] uppercase tracking-[0.14em] text-[#A1A2B5]/80">
                        ПЛАНИРУЕМАЯ ФУНКЦИЯ
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-editorial text-xl sm:text-2xl text-[#F4F3FA]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#A1A2B5] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
