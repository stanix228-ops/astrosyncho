import React, { useState } from "react"
import { Shield, Clock, EyeOff, Lock, Sliders, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PrivacyControlItem {
  id: string
  title: string
  subtitle: string
  description: string
  statusBadge: string
  defaultEnabled: boolean
  icon: React.ComponentType<{ className?: string }>
}

const PRIVACY_CONTROLS: PrivacyControlItem[] = [
  {
    id: "ephemeral-24h",
    title: "Исчезающие сообщения с настраиваемым сроком жизни",
    subtitle: "Автоматическое затухание диалога через 24 часа или по выбранному таймеру",
    description:
      "В проектируемой архитектуре AstroSyncho вы сами задаёте время жизни переписки и голосовых заметок (например, 24 часа). После истечения таймера сообщения удаляются из активного окна диалога.",
    statusBadge: "КОНЦЕПЦИЯ ПРОДУКТА · 24H LIFECYCLE",
    defaultEnabled: true,
    icon: Clock,
  },
  {
    id: "orbital-visibility",
    title: "Управление доступностью своего профиля",
    subtitle: "Режим селективной орбиты и скрытия из общего радара",
    description:
      "Вы можете перевести профиль в режим «Тёмной орбиты»: ваш сигнал не отображается в общем сканировании и становится доступен только тем людям, которым вы сами отправили импульс.",
    statusBadge: "КОНЦЕПЦИЯ ПРОДУКТА · VISIBILITY CONTROL",
    defaultEnabled: true,
    icon: EyeOff,
  },
  {
    id: "mutual-consent",
    title: "Приватное взаимодействие по двойному согласию",
    subtitle: "Отсутствие непрошеных сообщений и закрытый обмен медиа",
    description:
      "Канал связи открывается исключительно при обоюдном подтверждении резонанса. Любая сторона может в одно касание свернуть орбиту и прекратить доступ к своему профилю.",
    statusBadge: "КОНЦЕПЦИЯ ПРОДУКТА · MUTUAL GATE",
    defaultEnabled: true,
    icon: Lock,
  },
  {
    id: "content-boundaries",
    title: "Предполагаемые механизмы контроля контента",
    subtitle: "Персональные фильтры чувствительности и защита медиафайлов в интерфейсе",
    description:
      "Фотографии и аудиосигналы в личном диалоге по умолчанию отображаются под деликатной вуалью размытия до явного нажатия получателем и не индексируются внешними поисковыми системами.",
    statusBadge: "ПЛАНИРУЕМАЯ ФУНКЦИЯ · MEDIA SHIELD",
    defaultEnabled: false,
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
                07 // PRIVACY & CONTROL
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                АРХИТЕКТУРА ПРИВАТНОСТИ
              </span>
            </div>
            <h2
              id="privacy-heading"
              className="font-editorial text-3xl sm:text-5xl lg:text-[56px] font-normal text-[#F4F0FF] leading-[1.06]"
            >
              Интимность требует{" "}
              <span className="italic text-[#A79AFF]">
                полного контроля над границами.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#A7A6B8] font-light leading-relaxed">
              Мы проектируем AstroSyncho как камерное пространство, где вы сами
              управляете видимостью своего сигнала, временем жизни сообщений и
              глубиной доступа к профилю.
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
                        isOn ? "bg-[#6E5BFF]" : "bg-[#080910] border border-[#A79AFF]/30"
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

          {/* Right 5 Cols: Interactive Lifecycle Preview & Honest Technical Disclosure */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cosmic-glass rounded-[28px] p-6 sm:p-8 border border-[#A79AFF]/25 space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="signal">
                  <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>DEMO КОНФИГУРАТОР ПРИВАТНОСТИ</span>
                </Badge>
                <span className="font-mono-tech text-xs text-[#A79AFF]">
                  {enabledIds.length}/4 АКТИВНО
                </span>
              </div>

              <div className="space-y-3">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A7A6B8] block">
                  СРОК ЖИЗНИ ИСЧЕЗАЮЩИХ СООБЩЕНИЙ (ПРОТОТИП):
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

              {/* Simulated Ephemeral Message Preview */}
              <div className="rounded-2xl bg-[#080910]/90 border border-[#A79AFF]/20 p-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#A79AFF]">
                  <span>ПРИМЕР ЗАЩИЩЁННОГО СИГНАЛА</span>
                  <span>ТАЙМЕР: {ttlHours}:00:00</span>
                </div>
                <p className="font-editorial italic text-lg text-[#F4F0FF]">
                  «Встретимся у панорамного окна на верхнем ярусе в 22:30. Сигнал
                  исчезнет автоматически через {ttlHours} ч.»
                </p>
              </div>

              {/* Honest Technical & Production Disclosure */}
              <div className="rounded-2xl bg-[#080910] border border-[#A79AFF]/25 p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F4F0FF]">
                  <AlertCircle className="h-4 w-4 text-[#A79AFF] shrink-0" aria-hidden="true" />
                  <span>Честное уведомление об архитектуре и ограничениях</span>
                </div>
                <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                  1. <strong className="text-[#F4F0FF]">Статус функций:</strong> На данной
                  странице представлен интерактивный концепт-макет. Полноценное
                  серверное удаление сообщений по таймеру и управление видимостью
                  профиля будут задействованы при подключении backend-инфраструктуры
                  в рамках релиза Open Beta.
                </p>
                <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                  2. <strong className="text-[#F4F0FF]">Техническая реальность браузера:</strong>{" "}
                  Мы не даём ложных обещаний об абсолютной невозможности сделать
                  скриншот. В стандартном веб-браузере невозможно универсально
                  заблокировать системный захват экрана ОС или съёмку дисплея на
                  внешнюю камеру, поэтому мы рекомендуем делиться чувствительным
                  контентом только при возникновении личного доверия.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
