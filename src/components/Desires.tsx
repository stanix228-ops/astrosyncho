import React, { useState } from "react"
import {
  Sparkles,
  Check,
  Flame,
  Video,
  Mic,
  MessageSquare,
  Volume2,
} from "lucide-react"
import { DESIRE_ITEMS } from "@/data/astroData"
import { Badge } from "@/components/ui/badge"

interface DesiresProps {
  selectedDesireIds: string[]
  onToggleDesire: (id: string) => void
}

const PRESENCE_MODES = [
  {
    id: "video",
    label: "Камерный видеозвонок",
    badge: "CONCEPT UI // NOCTURNAL VIDEO",
    title: "Взгляд и живая мимика вместо бесконечной переписки",
    description:
      "Когда два сигнала совпадают, интерфейс открывает возможность мягкого вечернего видеозвонка без резкого офисного света и лишних деталей — только живое присутствие.",
    waveform: [28, 45, 62, 38, 74, 52, 85, 64, 42, 70, 58, 36, 48, 66, 30],
  },
  {
    id: "voice",
    label: "Голосовые импульсы",
    badge: "CONCEPT UI // ACOUSTIC WAVE",
    title: "Тембр голоса, дыхание и паузы полуночного эфира",
    description:
      "Короткие аудиозаметки с визуализацией звуковой волны позволяют услышать интонацию человека ещё до первой встречи в городе.",
    waveform: [18, 68, 84, 42, 92, 76, 34, 60, 88, 50, 72, 95, 44, 62, 24],
  },
  {
    id: "chat",
    label: "Личный диалог",
    badge: "CONCEPT UI // PRIVATE ORBIT CHAT",
    title: "Диалог без свайпов, статусов «прочитано» и давления",
    description:
      "Приватное окно общения фокусируется на общих темах и совпавших импульсах, помогая легко начать разговор без банальных фраз.",
    waveform: [22, 32, 48, 56, 40, 64, 52, 38, 45, 58, 42, 35, 50, 38, 20],
  },
]

export const Desires: React.FC<DesiresProps> = ({
  selectedDesireIds,
  onToggleDesire,
}) => {
  const [activePresenceId, setActivePresenceId] = useState<string>("video")

  const currentPresence =
    PRESENCE_MODES.find((m) => m.id === activePresenceId) || PRESENCE_MODES[0]

  return (
    <section
      id="desires"
      className="relative scroll-mt-20 py-24 lg:py-36 bg-[#080910] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="desires-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                06 // MORE THAN A PROFILE — FEEL THE PRESENCE
              </span>
            </div>
            <h2
              id="desires-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[60px] font-normal text-[#F4F0FF] leading-[1.04]"
            >
              Больше, чем анкета.{" "}
              <span className="italic text-[#A79AFF]">
                Почувствуйте живое присутствие.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
              Естественное общение начинается там, где заканчиваются шаблонные
              анкеты: камерные видеозвонки, голосовые сообщения с живой интонацией
              и взаимные эмоциональные импульсы (концептуальная демонстрация
              интерфейса).
            </p>
          </div>
        </div>

        {/* =====================================================================
            PART 1: CINEMATIC COMMUNICATION INTERFACE SHOWCASE (VIDEO / VOICE / CHAT)
           ===================================================================== */}
        <div className="cosmic-glass rounded-[32px] overflow-hidden border border-[#A79AFF]/30 mb-14 shadow-[0_0_85px_-20px_rgba(110,91,255,0.32)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left 7 Cols: Nocturnal Video Call & Presence Visual Frame */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] bg-[#0D0F18] overflow-hidden flex flex-col justify-between p-5 sm:p-7">
              <img
                src="./images/presence-call-editorial.webp"
                alt="Молодая женщина в мягком вечернем свете настольной лампы во время тёплого ночного видеозвонка"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080910] via-[#080910]/35 to-[#080910]/40"
                aria-hidden="true"
              />

              {/* Top Call Status Bar (Conceptual Demo Overlay) */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#080910]/85 backdrop-blur-md border border-[#A79AFF]/35 px-3.5 py-1.5 font-mono-tech text-[10px] text-[#F4F0FF]">
                  <span className="h-2 w-2 rounded-full bg-[#A79AFF] animate-ping" />
                  <span>{currentPresence.badge}</span>
                </div>
                <span className="rounded-full bg-[#080910]/85 backdrop-blur-md border border-white/15 px-3 py-1 font-mono-tech text-[10px] text-[#A7A6B8]">
                  КОНЦЕПТ-ДЕМОНСТРАЦИЯ UI
                </span>
              </div>

              {/* Bottom Acoustic Waveform & Presence Overlay */}
              <div className="relative z-10 rounded-2xl bg-[#080910]/85 backdrop-blur-xl border border-[#A79AFF]/25 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Volume2 className="h-4 w-4 text-[#A79AFF]" aria-hidden="true" />
                    <span className="font-editorial text-lg sm:text-xl text-[#F4F0FF]">
                      {currentPresence.label} · 96.4% Синхронность
                    </span>
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#A79AFF]">
                    01:42 · LIVE WAVE
                  </span>
                </div>

                {/* Animated / Interactive Acoustic Waveform Bars */}
                <div
                  className="flex items-end justify-between gap-1.5 h-9 pt-1"
                  aria-hidden="true"
                >
                  {currentPresence.waveform.map((val, idx) => (
                    <span
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#6E5BFF] to-[#F4F0FF] transition-all duration-500"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Mode Switcher (Video / Voice / Chat) + Connection Detail */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6 bg-[#0D0F18]/90">
              <div className="space-y-5">
                <div
                  className="grid grid-cols-3 gap-2"
                  role="tablist"
                  aria-label="Режимы коммуникации AstroSyncho"
                >
                  {[
                    { id: "video", label: "Видео", icon: Video },
                    { id: "voice", label: "Голос", icon: Mic },
                    { id: "chat", label: "Чат", icon: MessageSquare },
                  ].map((tab) => {
                    const Icon = tab.icon
                    const active = activePresenceId === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActivePresenceId(tab.id)}
                        className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-mono-tech transition-all cursor-pointer border ${
                          active
                            ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#A79AFF]"
                            : "bg-[#080910] text-[#A7A6B8] border-[#A79AFF]/20 hover:text-[#F4F0FF]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] leading-snug">
                    {currentPresence.title}
                  </h3>
                  <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                    {currentPresence.description}
                  </p>
                </div>

                {/* Abstract Orbital Connection Detail Thumbnail */}
                <div className="relative rounded-2xl overflow-hidden border border-[#A79AFF]/20 bg-[#080910] p-3 flex items-center gap-4">
                  <img
                    src="./images/connection-detail.webp"
                    alt="Световая дуга, соединяющая два далёких сигнала"
                    loading="lazy"
                    className="h-16 w-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="text-xs text-[#A7A6B8] font-light">
                    <strong className="text-[#F4F0FF] font-medium block mb-0.5">
                      Взаимный импульс перед звонком
                    </strong>
                    Выбирайте близкие вам эмоциональные импульсы ниже — они
                    станут темами для первого разговора.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#A79AFF]/15 flex items-center justify-between text-xs font-mono-tech text-[#A79AFF]">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ВЫБРАНО ВАМИ ИМПУЛЬСОВ:</span>
                </span>
                <Badge variant="signal">
                  {selectedDesireIds.length} из {DESIRE_ITEMS.length}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            PART 2: INTERACTIVE EMOTIONAL IMPULSE CARDS
           ===================================================================== */}
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
