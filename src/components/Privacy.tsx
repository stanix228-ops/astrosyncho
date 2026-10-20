import React, { useState } from "react"
import { Shield, Clock, EyeOff, Lock, Sliders, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PrivacyControlItem {
  id: string
  title: string
  subtitle: string
  description: string
  statusBadge: string
  icon: React.ComponentType<{ className?: string }>
}

const PRIVACY_CONTROLS: PrivacyControlItem[] = [
  {
    id: "ephemeral-24h",
    title: "Исчезающие сообщения (24 часа)",
    subtitle: "Запланированный механизм автоматического затухания диалога",
    description:
      "В проектируемой архитектуре AstroSyncho вы можете включить 24-часовой цикл жизни переписки и голосовых заметок, чтобы история общения не накапливалась бессрочно.",
    statusBadge: "КОНЦЕПТУАЛЬНАЯ ФУНКЦИЯ · 24H LIFECYCLE",
    icon: Clock,
  },
  {
    id: "orbital-visibility",
    title: "Защитная орбита и скрытие из общего радара",
    subtitle: "Второстепенные сигналы гаснут — доступ только по вашему импульсу",
    description:
      "В режиме защищённой орбиты ваш профиль исчезает из общего сканирования. Пространство вокруг вас становится тише, а связь возможна только с выбранным вами сигналом.",
    statusBadge: "КОНЦЕПТУАЛЬНАЯ ФУНКЦИЯ · PROTECTIVE ORBIT",
    icon: EyeOff,
  },
  {
    id: "mutual-consent",
    title: "Взаимодействие только по двойному резонансу",
    subtitle: "Никаких непрошеных сообщений и мгновенное свёртывание орбиты",
    description:
      "Личный диалог открывается исключительно при взаимном отклике двух людей. В любой момент орбиту можно закрыть в одно касание.",
    statusBadge: "КОНЦЕПТУАЛЬНАЯ ФУНКЦИЯ · MUTUAL GATE",
    icon: Lock,
  },
  {
    id: "content-boundaries",
    title: "Деликатный экран для личных медиафайлов",
    subtitle: "Превью под вуалью размытия до явного открытия получателем",
    description:
      "Фотографии и видео в личном чате по умолчанию скрыты мягкой оптической вуалью и не индексируются внешними системами.",
    statusBadge: "ПЛАНИРУЕМАЯ ФУНКЦИЯ · MEDIA SHIELD",
    icon: Sliders,
  },
]

export const Privacy: React.FC = () => {
  const [enabledIds, setEnabledIds] = useState<string[]>([
    "ephemeral-24h",
    "orbital-visibility",
    "mutual-consent",
  ])
  const [ttlHours, setTtlHours] = useState<number>(24)

  const toggleControl = (id: string) => {
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const shieldActive = enabledIds.includes("orbital-visibility")
  const shieldStrength = enabledIds.length / PRIVACY_CONTROLS.length

  return (
    <section
      id="privacy"
      className="relative scroll-mt-20 py-24 lg:py-32 bg-[#0D0F18] border-t border-[#A79AFF]/10 overflow-hidden"
      aria-labelledby="privacy-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                07 // PRIVACY — YOUR UNIVERSE IS YOURS
              </span>
            </div>
            <h2
              id="privacy-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Ваша Вселенная принадлежит вам.{" "}
              <span className="italic text-[#A79AFF]">
                Защитная орбита личных границ.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
              Когда вы активируете защитную орбиту, пространство вокруг вашего
              сигнала становится спокойнее, а второстепенные внешние сигналы
              гаснут.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Interactive Concept Preview Toggles */}
          <div className="lg:col-span-7 space-y-4">
            {PRIVACY_CONTROLS.map((ctrl) => {
              const Icon = ctrl.icon
              const isOn = enabledIds.includes(ctrl.id)
              return (
                <div
                  key={ctrl.id}
                  className={`cosmic-glass rounded-[24px] p-5 sm:p-6 border transition-all ${
                    isOn
                      ? "border-[#A79AFF]/40 bg-[#14182A]/75"
                      : "border-[#A79AFF]/15 bg-[#080910]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#080910] border border-[#A79AFF]/25 text-[#A79AFF]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A79AFF] block">
                          {ctrl.statusBadge}
                        </span>
                        <h3 className="font-editorial text-xl sm:text-2xl text-[#F4F0FF]">
                          {ctrl.title}
                        </h3>
                        <p className="text-xs font-medium text-[#A79AFF]/90">
                          {ctrl.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-[#A7A6B8] font-light leading-relaxed pt-1">
                          {ctrl.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={isOn}
                      aria-label={`Переключить демонстрационный режим: ${ctrl.title}`}
                      onClick={() => toggleControl(ctrl.id)}
                      className={`relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                        isOn
                          ? "bg-[#6E5BFF]"
                          : "bg-[#080910] border border-[#A79AFF]/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-[#F4F0FF] transition-transform ${
                          isOn ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right 5 Cols: Protective Orbit Visual Scene + Honest Disclosure */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cosmic-glass rounded-[28px] p-6 sm:p-8 border border-[#A79AFF]/25 space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="signal">
                  <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ЗАЩИТНАЯ ОРБИТА · CONCEPT</span>
                </Badge>
                <span className="font-mono-tech text-xs text-[#A79AFF]">
                  КОНТУРОВ: {enabledIds.length}/4
                </span>
              </div>

              {/* Protective Orbit SVG Scene: Secondary signals fade when shield is active */}
              <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#080910] border border-[#A79AFF]/20 overflow-hidden flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 420 260"
                  fill="none"
                  role="img"
                  aria-label="Визуализация защитной орбиты вокруг вашего сигнала: второстепенные сигналы приглушаются"
                >
                  <defs>
                    <radialGradient id="privacyShieldGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6E5BFF" stopOpacity="0.35" />
                      <stop offset="70%" stopColor="#A79AFF" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#080910" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Exterior Secondary Signals (fade out when shieldActive is true) */}
                  <g
                    style={{
                      opacity: shieldActive ? 0.12 : 0.75,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    <circle cx="55" cy="52" r="3" fill="#A79AFF" />
                    <circle cx="365" cy="60" r="3.5" fill="#A79AFF" />
                    <circle cx="68" cy="205" r="3" fill="#6E5BFF" />
                    <circle cx="352" cy="210" r="3" fill="#A79AFF" />
                    <line
                      x1="55"
                      y1="52"
                      x2="135"
                      y2="95"
                      stroke="#A79AFF"
                      strokeOpacity="0.3"
                      strokeDasharray="3 4"
                    />
                    <line
                      x1="365"
                      y1="60"
                      x2="285"
                      y2="98"
                      stroke="#A79AFF"
                      strokeOpacity="0.3"
                      strokeDasharray="3 4"
                    />
                  </g>

                  {/* Protective Orbital Dome around Center */}
                  <circle
                    cx="210"
                    cy="130"
                    r={62 + shieldStrength * 28}
                    fill="url(#privacyShieldGlow)"
                  />
                  <circle
                    cx="210"
                    cy="130"
                    r="86"
                    stroke="#A79AFF"
                    strokeOpacity={shieldActive ? "0.85" : "0.25"}
                    strokeWidth={shieldActive ? "1.8" : "1"}
                  />
                  <circle
                    cx="210"
                    cy="130"
                    r="60"
                    stroke="#6E5BFF"
                    strokeOpacity={0.4 + shieldStrength * 0.45}
                    strokeWidth="1.2"
                    strokeDasharray="5 4"
                  />

                  {/* Protected Core Signal */}
                  <circle cx="210" cy="130" r="7" fill="#F4F0FF" />
                  <text
                    x="210"
                    y="156"
                    textAnchor="middle"
                    fill="#F4F0FF"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="1.5"
                  >
                    {shieldActive ? "ЗАЩИЩЁННАЯ ОРБИТА" : "ОТКРЫТЫЙ ЭФИР"}
                  </text>
                </svg>
              </div>

              <div className="space-y-3">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8] block">
                  ТАЙМЕР ИСЧЕЗАЮЩИХ СООБЩЕНИЙ (КОНЦЕПТ):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { hours: 6, label: "6 часов" },
                    { hours: 24, label: "24 часа" },
                    { hours: 72, label: "72 часа" },
                  ].map((opt) => (
                    <button
                      key={opt.hours}
                      type="button"
                      onClick={() => setTtlHours(opt.hours)}
                      className={`rounded-xl py-2.5 px-3 text-xs font-mono-tech transition-all cursor-pointer border ${
                        ttlHours === opt.hours
                          ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#A79AFF]"
                          : "bg-[#080910]/80 text-[#A7A6B8] border-[#A79AFF]/20 hover:text-[#F4F0FF]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Honest Technical & Production Disclosure */}
              <div className="rounded-2xl bg-[#080910] border border-[#A79AFF]/25 p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F4F0FF]">
                  <AlertCircle
                    className="h-4 w-4 text-[#A79AFF] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Честное уведомление об архитектуре</span>
                </div>
                <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                  1. <strong className="text-[#F4F0FF]">Концептуальный статус:</strong>{" "}
                  Представленные выше переключатели (включая исчезающие через{" "}
                  {ttlHours} ч. сообщения) демонстрируют запланированную
                  продуктовую архитектуру и не являются работающей серверной
                  гарантией на данной демо-странице.
                </p>
                <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                  2. <strong className="text-[#F4F0FF]">Скриншоты и анонимность:</strong>{" "}
                  Веб-сайт не может гарантировать абсолютную анонимность или
                  технический запрет скриншотов и фотосъёмки экрана на всех
                  устройствах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
