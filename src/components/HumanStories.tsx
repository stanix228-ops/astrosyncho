import React, { useState, useRef } from "react"
import { Eye, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useInView, useElementScrollProgress } from "@/hooks/useMotionPreferences"

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
  const sectionRef = useRef<HTMLElement | null>(null)
  const diptychRef = useRef<HTMLDivElement | null>(null)
  const { hasEntered } = useInView(sectionRef, "50px")
  const scrollProgress = useElementScrollProgress(sectionRef)

  const [activePerspectiveId, setActivePerspectiveId] =
    useState<string>("convergence")

  const activeStory =
    GAZE_PERSPECTIVES.find((p) => p.id === activePerspectiveId) ||
    GAZE_PERSPECTIVES[0]

  // Subtle scale shift driven by scroll
  const portraitScale = 1 + Math.min(0.05, scrollProgress * 0.06)

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative scroll-mt-20 py-24 lg:py-36 bg-[#080910] overflow-hidden"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 space-y-20 lg:space-y-28">
        {/* Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                STORIES / 07 — EVERY SIGNAL HAS A STORY
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
              между фразами, в естественном свете и в способности узнать своего
              человека среди миллионов чужих сигналов.
            </p>
          </div>
        </div>

        {/* Spread 01: Wide Architectural Cinema Frame + Interactive Perspective Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-none overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] shadow-[0_0_70px_-20px_rgba(110,91,255,0.28)]">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="./images/human-connection.webp"
                  alt="Мужчина и женщина в современном полутёмном архитектурном пространстве смотрят в сторону друг друга"
                  loading="lazy"
                  style={{ transform: `scale(${portraitScale.toFixed(3)})` }}
                  className="h-full w-full object-cover object-center transition-transform duration-700"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910] via-transparent to-transparent opacity-85"
                aria-hidden="true"
              />
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
                    className={`rounded-none px-3.5 py-1.5 text-xs font-mono-tech transition-all cursor-pointer border ${
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

            <div className="cosmic-glass rounded-none p-6 sm:p-8 border border-[#A79AFF]/20 space-y-4">
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

        {/* Spread 02: Asymmetric Dual Portrait Diptych Linked by Luminous Orbital Arc */}
        <div
          ref={diptychRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4"
        >
          {/* Left Editorial Pull-Quote */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="default">РЕДАКЦИОННАЯ ЭСТЕТИКА · 35MM</Badge>
              <blockquote className="font-editorial italic text-3xl sm:text-4xl text-[#F4F0FF] leading-[1.15]">
                «Мы устали от бесконечных витрин, где люди превращены в анкеты.
                Настоящее притяжение всегда камерно, немного таинственно и
                абсолютно индивидуально».
              </blockquote>
              <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
                Тёплая кожа, естественный сумеречный свет у окна, спокойная
                мимика без позирования. Каждая история в AstroSyncho раскрывается
                как личный кинематографический кадр.
              </p>
            </div>

            <div className="rounded-none border border-[#A79AFF]/15 bg-[#0D0F18]/75 p-5 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  СВЯЗУЮЩИЙ КОНТУР ОРБИТЫ
                </span>
                <span className="font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                  Два самостоятельных мира, соединённых тонкой линией резонанса
                </span>
              </div>
              <Sparkles className="h-5 w-5 text-[#A79AFF] shrink-0" aria-hidden="true" />
            </div>
          </div>

          {/* Right Diptych Portraits with Connecting Orbital Contour SVG */}
          <div className="lg:col-span-7 relative grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2">
            {/* Luminous Orbital Arc Linking the Two Portraits */}
            <svg
              className="pointer-events-none hidden sm:block absolute inset-0 z-20 h-full w-full"
              viewBox="0 0 600 460"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="diptychOrbitArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F4F0FF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#A79AFF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6E5BFF" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d="M 145 190 Q 300 95 455 235"
                stroke="url(#diptychOrbitArc)"
                strokeWidth="1.75"
                strokeDasharray="6 4"
              />
              <circle cx="145" cy="190" r="4.5" fill="#F4F0FF" />
              <circle cx="300" cy="152" r="3.5" fill="#A79AFF" />
              <circle cx="455" cy="235" r="4.5" fill="#F4F0FF" />
            </svg>

            {/* Portrait 1: Distinct Editorial Man Portrait (story-portrait-man.webp) */}
            <figure
              className={`group relative rounded-none overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] transition-all duration-700 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-90 translate-y-3"
              }`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src="./images/story-portrait-man.webp"
                  alt="Редакционный портрет взрослого мужчины с тёплым янтарно-серебристым контровым светом и спокойным взглядом"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 bg-gradient-to-t from-[#080910] via-[#080910]/95 to-transparent">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  STORY // ЛЕОН, 31 · QUIET CONVERSATION
                </span>
                <span className="font-editorial text-xl text-[#F4F0FF] mt-0.5 block">
                  «Слова важны, но интонация говорит всё»
                </span>
              </figcaption>
            </figure>

            {/* Portrait 2: Distinct Editorial Woman Portrait (story-portrait-woman.webp) */}
            <figure
              className={`group relative sm:mt-10 rounded-none overflow-hidden border border-[#A79AFF]/25 bg-[#0D0F18] transition-all duration-700 ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-90 translate-y-4"
              }`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src="./images/story-portrait-woman.webp"
                  alt="Естественный портрет взрослой женщины у вечернего окна с мягким сумеречным светом и тёплым взглядом"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 sm:p-5 bg-gradient-to-t from-[#080910] via-[#080910]/95 to-transparent">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  STORY // МИЯ, 28 · MEANINGFUL CONNECTION
                </span>
                <span className="font-editorial text-xl text-[#F4F0FF] mt-0.5 block">
                  «Сумерки у окна и ощущение, что тебя услышали»
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
