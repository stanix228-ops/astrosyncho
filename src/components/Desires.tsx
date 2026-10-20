import React from "react"
import { Sparkles, Check, Flame } from "lucide-react"
import { DESIRE_ITEMS } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"

interface DesiresProps {
  selectedDesireIds: string[]
  onToggleDesire: (id: string) => void
}

export const Desires: React.FC<DesiresProps> = ({
  selectedDesireIds,
  onToggleDesire,
}) => {
  return (
    <section
      id="desires"
      className="relative scroll-mt-20 py-24 lg:py-36 bg-[#080910] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="desires-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                06 // DESIRES & IMPULSES
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                ПРИТЯЖЕНИЕ И ИМПУЛЬСЫ
              </span>
            </div>
            <h2
              id="desires-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[60px] font-normal text-[#F4F0FF] leading-[1.04]"
            >
              Невысказанные желания,{" "}
              <span className="italic text-[#A79AFF]">
                обретающие форму при совпадении.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
              Притяжение взрослых людей складывается из тонких импульсов — от
              желания услышать живой голос среди ночи до спонтанного побега из
              привычного маршрута. Отметьте импульсы, которые близки вашей орбите.
            </p>
          </div>
        </div>

        {/* Visual Artwork Banner: Connection Detail */}
        <div className="relative rounded-[30px] overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] mb-12 shadow-[0_0_80px_-20px_rgba(110,91,255,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden">
              <img
                src="./images/connection-detail.webp"
                alt="Абстрактная световая визуализация двух далёких сигналов, соединённых тонкими фиолетовыми и серебристыми орбитальными линиями в тёмном космосе"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0F18] hidden lg:block"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0F18] via-transparent to-transparent lg:hidden"
                aria-hidden="true"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-5">
              <Badge variant="signal">
                <Flame className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
                <span>ПРОТОКОЛ ВЗАИМНОГО ИМПУЛЬСА</span>
              </Badge>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] leading-snug">
                Свобода быть откровенным без риска быть непонятым.
              </h3>
              <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                В концепции AstroSyncho ваши выбранные импульсы остаются скрытыми в
                зашифрованном контуре. Они становятся видимыми другому человеку
                только тогда, когда он независимо выбирает те же векторы близости.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono-tech text-[#A79AFF]">
                <span>ВЫБРАНО ВАМИ ИМПУЛЬСОВ:</span>
                <span className="rounded-full bg-[#14182A] border border-[#A79AFF]/35 px-3 py-1 text-[#F4F0FF]">
                  {selectedDesireIds.length} из {DESIRE_ITEMS.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Impulse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DESIRE_ITEMS.map((item) => {
            const isSelected = selectedDesireIds.includes(item.id)
            return (
              <article
                key={item.id}
                onClick={() => onToggleDesire(item.id)}
                className={`group cosmic-glass-interactive rounded-[28px] p-6 sm:p-8 cursor-pointer flex flex-col justify-between transition-all ${
                  isSelected
                    ? "border-[#A79AFF] bg-[#14182A]/85 shadow-[0_0_40px_-10px_rgba(110,91,255,0.4)]"
                    : "border-[#A79AFF]/15"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-xs text-[#A79AFF] tracking-[0.2em]">
                      IMPULSE // {item.index}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleDesire(item.id)
                      }}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono-tech transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#6E5BFF] text-[#F4F0FF]"
                          : "bg-[#080910]/80 text-[#A7A6B8] border border-[#A79AFF]/25 group-hover:text-[#F4F0FF]"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-3 w-3" aria-hidden="true" />
                          <span>В ВАШЕЙ ОРБИТЕ</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          <span>ВЫБРАТЬ ИМПУЛЬС</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] group-hover:text-[#A79AFF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-editorial italic text-lg text-[#A79AFF]/90 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                    {item.prose}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#A79AFF]/15 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech">
                  <span className="text-[#F4F0FF]/80">{item.sensoryTag}</span>
                  <span className="text-[#A79AFF]">{item.orbitMetric}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
