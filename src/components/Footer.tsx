import React from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import { type LegalDocType } from "@/components/LegalModal"

interface FooterProps {
  onOpenLegal: (doc: LegalDocType) => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const currentYear = new Date().getFullYear()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer
      className="relative bg-[#080910] pt-20 pb-12 overflow-hidden"
      aria-label="Подвал сайта AstroSyncho"
    >
      {/* Delicate Orbital Animation in Footer Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
        aria-hidden="true"
      >
        <div className="h-[680px] w-[680px] rounded-full border border-[#A79AFF]/25 animate-orbit-slow" />
        <div className="absolute h-[480px] w-[480px] rounded-full border border-dashed border-[#6E5BFF]/30 animate-orbit-reverse" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Top Row: Closing Phrase & Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#A79AFF]/15">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.2em] text-[#A79AFF]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>КОСМИЧЕСКАЯ БЛИЗОСТЬ · ЭПИЛОГ</span>
            </div>
            <p className="font-editorial italic text-2xl sm:text-4xl text-[#F4F0FF] max-w-xl leading-snug">
              «Где-то во Вселенной есть человек, чей сигнал совпадает с твоим».
            </p>
            <p className="text-xs sm:text-sm text-[#A7A6B8] font-light max-w-md">
              Премиальное цифровое пространство эмоционального притяжения,
              совпадения ритмов и деликатной приватности.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
                НАВИГАЦИЯ
              </h3>
              <ul className="space-y-2 text-sm text-[#A7A6B8]">
                {[
                  { id: "hero", label: "Главная сцена" },
                  { id: "radar", label: "Космический радар" },
                  { id: "synchronicity", label: "Синхронность" },
                  { id: "stories", label: "Человеческие истории" },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.id)
                      }}
                      className="hover:text-[#F4F0FF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
                СИГНАЛ И ДОСТУП
              </h3>
              <ul className="space-y-2 text-sm text-[#A7A6B8]">
                {[
                  { id: "signal", label: "Ваш сигнал" },
                  { id: "desires", label: "Желания и импульсы" },
                  { id: "privacy", label: "Приватность" },
                  { id: "beta", label: "Open Beta регистрация" },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.id)
                      }}
                      className="hover:text-[#F4F0FF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#A79AFF]">
                ДОКУМЕНТЫ
              </h3>
              <ul className="space-y-2 text-sm text-[#A7A6B8]">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenLegal("privacy")}
                    className="hover:text-[#F4F0FF] transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenLegal("terms")}
                    className="hover:text-[#F4F0FF] transition-colors text-left cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monumental Wordmark */}
        <div className="py-10 sm:py-14 flex flex-col items-center justify-center text-center select-none">
          <div className="font-brand text-[15vw] sm:text-[13vw] lg:text-[152px] leading-[0.88] tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-b from-[#F4F0FF] via-[#F4F0FF]/80 to-[#6E5BFF]/25">
            AstroSyncho
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-[#A79AFF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#A7A6B8]">
          <div>
            © {currentYear} AstroSyncho. Все права защищены · Концептуальный релиз Open Beta.
          </div>

          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="inline-flex items-center gap-2 rounded-none border border-[#A79AFF]/25 bg-[#14182A]/60 px-4 py-2 text-[#F4F0FF] hover:border-[#A79AFF] transition-colors cursor-pointer"
          >
            <span>НАВЕРХ К ЗЕНИТУ</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
