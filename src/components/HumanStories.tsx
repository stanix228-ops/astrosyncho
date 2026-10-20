import React, { useState } from "react"
import { Eye, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const GAZE_PERSPECTIVES = [
  {
    id: "convergence",
    label: "01 · Точка пересечения",
    timecode: "23:18 · ЗАКРЫТАЯ ГАЛЕРЕЯ",
    headline: "За секунду до первого слова возникает гравитация.",
    quote:
      "Два человека стоят в разных концах полутёмного зала. Между ними — двенадцать метров воздуха, бетон и отражения ночного города в стекле. Они ещё не знакомы, но оба уже знают, что вечер изменил свою траекторию.",
    detail:
      "AstroSyncho фиксирует именно эти моменты — когда два сигнала оказываются в одном эмоциональном и пространственном контуре без неловкости случайного вторжения.",
  },
  {
    id: "her-signal",
    label: "02 · Её сигнал (Intimacy)",
    timecode: "23:19 · ЧАСТОТА 396.0 HZ",
    headline: "«Я заметила не то, как он смотрит, а то, как он умеет молчать».",
    quote:
      "В шумных пространствах все стараются казаться ярче. Но притягивает всегда обратное — спокойное присутствие человека, которому не нужно ничего доказывать комнате.",
    detail:
      "В её профиле включён режим вечернего резонанса: сигнал виден только тем, у кого совпадает темп диалога и созерцательное настроение.",
  },
  {
    id: "his-signal",
    label: "03 · Его сигнал (Calm)",
    timecode: "23:19 · ЧАСТОТА 288.4 HZ",
    headline: "«Её взгляд не скользил по залу — он искал совпадение».",
    quote:
      "Обычно взгляд незнакомца длится долю секунды. Когда он задерживается чуть дольше, привычное течение времени прерывается. Остаётся только чистое любопытство.",
    detail:
      "Взаимное подтверждение сигнала в AstroSyncho открывает приватный диалог только тогда, когда оба человека отметили резонанс.",
  },
]

export const HumanStories: React.FC = () => {
  const [activePerspectiveId, setActivePerspectiveId] = useState<string>("convergence")

  const activeStory =
    GAZE_PERSPECTIVES.find((p) => p.id === activePerspectiveId) ||
    GAZE_PERSPECTIVES[0]

  return (
    <section
      id="stories"
      className="relative scroll-mt-20 py-24 lg:py-36 bg-[#080910] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 space-y-20 lg:space-y-28">
        {/* Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                04 // HUMAN STORIES
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                ЧЕЛОВЕЧЕСКОЕ ПРИТЯЖЕНИЕ
              </span>
            </div>
            <h2
              id="stories-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[62px] font-normal text-[#F4F0FF] leading-[1.03]"
            >
              За каждой орбитой —{" "}
              <span className="italic text-[#A79AFF]">
                живое дыхание, взгляд и история.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#A7A6B8] font-light leading-relaxed">
              Технология — лишь оптика. Главное происходит между людьми: в паузах
              между фразами, в полуночном свете и в способности узнать своего
              человека среди миллионов чужих сигналов.
            </p>
          </div>
        </div>

        {/* Spread 01: Wide Architectural Cinema Frame + Interactive Perspective Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-[28px] overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] shadow-[0_0_70px_-20px_rgba(110,91,255,0.28)]">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="./images/human-connection.webp"
                  alt="Мужчина и женщина в современном полутёмном архитектурном пространстве смотрят в сторону друг друга"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910] via-transparent to-transparent opacity-85"
                aria-hidden="true"
              />
              {/* Film Metadata Overlay */}
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#F4F0FF]/85">
                <span>SCENE I · АРХИТЕКТУРА ВСТРЕЧИ</span>
                <span className="text-[#A79AFF]">{activeStory.timecode}</span>
              </div>
            </div>
          </div>

          {/* Interactive Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Перспектива сцены"
            >
              {GAZE_PERSPECTIVES.map((item) => {
                const active = item.id === activePerspectiveId
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActivePerspectiveId(item.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-mono-tech transition-all cursor-pointer border ${
                      active
                        ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#A79AFF]/60"
                        : "bg-[#0D0F18] text-[#A7A6B8] border-[#A79AFF]/20 hover:text-[#F4F0FF]"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div className="cosmic-glass rounded-[26px] p-6 sm:p-8 border border-[#A79AFF]/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A79AFF]">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{activeStory.timecode}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] leading-snug">
                {activeStory.headline}
              </h3>

              <p className="text-sm sm:text-base text-[#F4F0FF]/90 font-light leading-relaxed">
                {activeStory.quote}
              </p>

              <p className="text-xs sm:text-sm text-[#A7A6B8] font-light leading-relaxed pt-2 border-t border-[#A79AFF]/15">
                {activeStory.detail}
              </p>
            </div>
          </div>
        </div>

        {/* Spread 02: Asymmetric Dual Portrait Diptych + Editorial Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
          {/* Left Editorial Pull-Quote & Diptych Column 1 */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="default">ЭСТЕТИКА ПРИСУТСТВИЯ</Badge>
              <blockquote className="font-editorial italic text-3xl sm:text-4xl text-[#F4F0FF] leading-[1.15]">
                «Мы устали от бесконечных витрин, где люди превращены в анкеты.
                Настоящее притяжение всегда камерно, немного таинственно и
                абсолютно индивидуально».
              </blockquote>
              <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
                В AstroSyncho нет публичных рейтингов, лайков и гонки за вниманием.
                Каждая фотография и каждый сигнал раскрываются постепенно — как
                кинематографический кадр в тёмной комнате.
              </p>
            </div>

            <div className="rounded-2xl border border-[#A79AFF]/15 bg-[#0D0F18]/75 p-5 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  ФОТОГРАФИЧЕСКИЙ ПРИНЦИП
                </span>
                <span className="font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Естественный свет, фактура и честный взгляд без масок
                </span>
              </div>
              <Sparkles className="h-5 w-5 text-[#A79AFF] shrink-0" aria-hidden="true" />
            </div>
          </div>

          {/* Right Diptych Portraits */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2">
            {/* Portrait 1 */}
            <figure className="group relative rounded-[26px] overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18]">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src="./images/signal-portrait-male.webp"
                  alt="Кинематографический портрет взрослого мужчины в тёмном пальто с мягким серебристо-лавандовым светом"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 bg-gradient-to-t from-[#080910] via-[#080910]/95 to-transparent">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  SIG // 04-VEGA · CALM
                </span>
                <span className="font-editorial text-xl text-[#F4F0FF] mt-0.5 block">
                  Тишина как язык доверия
                </span>
              </figcaption>
            </figure>

            {/* Portrait 2 (Staggered on Desktop) */}
            <figure className="group relative sm:mt-10 rounded-[26px] overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18]">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src="./images/signal-portrait-female.webp"
                  alt="Естественный камерный портрет взрослой женщины в тёмном свитере с тёплым выразительным взглядом"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 bg-gradient-to-t from-[#080910] via-[#080910]/95 to-transparent">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  SIG // 07-CYGNUS · INTIMACY
                </span>
                <span className="font-editorial text-xl text-[#F4F0FF] mt-0.5 block">
                  Чувственность в полутонах
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
