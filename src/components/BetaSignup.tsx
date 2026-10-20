import React, { useState, useRef } from "react"
import { Sparkles, CheckCircle2, AlertTriangle, Loader2, Radio, ArrowRight } from "lucide-react"
import { SIGNAL_STATES, DESIRE_ITEMS, type SignalStateConfig } from "@/data/astroData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface BetaSignupProps {
  selectedStateKey: SignalStateConfig["key"]
  onSelectStateKey: (key: SignalStateConfig["key"]) => void
  selectedDesireIds: string[]
}

interface FormValues {
  alias: string
  email: string
  signalState: SignalStateConfig["key"]
  orbitWindow: string
  personalNote: string
  consent: boolean
}

interface FormErrors {
  alias?: string
  email?: string
  consent?: string
}

/**
 * Ready-for-API service adapter.
 * In production, replace simulated timeout with fetch(import.meta.env.VITE_API_URL + '/beta-signup', ...)
 */
async function submitBetaRegistrationDemo(payload: FormValues & { desires: string[] }) {
  await new Promise((resolve) => setTimeout(resolve, 900))
  const passCode = `AS-2026-${payload.signalState.slice(0, 3).toUpperCase()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`
  return {
    mode: "DEMO_CLIENT_ONLY" as const,
    passCode,
    submittedAt: new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }
}

export const BetaSignup: React.FC<BetaSignupProps> = ({
  selectedStateKey,
  onSelectStateKey,
  selectedDesireIds,
}) => {
  const [values, setValues] = useState<FormValues>({
    alias: "",
    email: "",
    signalState: selectedStateKey,
    orbitWindow: "22:00 — 02:00 · Ночной эфир",
    personalNote: "",
    consent: false,
  })

  // Keep form signalState synced when user changes it in Section 05
  React.useEffect(() => {
    setValues((prev) => ({ ...prev, signalState: selectedStateKey }))
  }, [selectedStateKey])

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [demoResult, setDemoResult] = useState<{
    passCode: string
    submittedAt: string
  } | null>(null)

  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}
    if (!values.alias.trim() || values.alias.trim().length < 2) {
      nextErrors.alias = "Укажите ваше имя или псевдоним (минимум 2 символа)."
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = "Введите корректный адрес электронной почты (например, name@domain.com)."
    }
    if (!values.consent) {
      nextErrors.consent =
        "Необходимо подтвердить согласие с условиями демонстрационного режима Open Beta."
    }
    return nextErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus()
      }, 50)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await submitBetaRegistrationDemo({
        ...values,
        desires: selectedDesireIds,
      })
      setDemoResult({
        passCode: res.passCode,
        submittedAt: res.submittedAt,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedDesireTitles = DESIRE_ITEMS.filter((d) =>
    selectedDesireIds.includes(d.id)
  ).map((d) => d.title)

  return (
    <section
      id="beta"
      className="relative scroll-mt-20 py-24 lg:py-36 bg-[#080910] border-t border-[#A79AFF]/15 overflow-hidden"
      aria-labelledby="beta-heading"
    >
      {/* Cosmic Environment Background Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('./images/cosmic-environment.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080910] via-[#080910]/80 to-[#080910]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Cols: Open Beta Context & What Happens Next */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
                08 // OPEN BETA
              </span>
              <span className="h-px w-12 bg-[#A79AFF]/30" aria-hidden="true" />
              <span className="font-mono-tech text-xs text-[#A7A6B8]">
                РАННИЙ ДОСТУП
              </span>
            </div>

            <h2
              id="beta-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[58px] font-normal text-[#F4F0FF] leading-[1.04]"
            >
              Войдите в орбиту{" "}
              <span className="italic text-[#A79AFF]">AstroSyncho.</span>
            </h2>

            <p className="text-base text-[#A7A6B8] font-light leading-relaxed">
              Сейчас проект находится на этапе открытого концептуального
              beta-тестирования. Вы можете сформировать свой первичный сигнал и
              оставить заявку на включение в первую волну участников.
            </p>

            {/* Clear Explanation of What Happens After Form Submission */}
            <div className="cosmic-glass rounded-[26px] p-6 border border-[#A79AFF]/20 space-y-4">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#A79AFF]">
                ЧТО ПРОИСХОДИТ ПОСЛЕ ОТПРАВКИ ФОРМЫ:
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm text-[#F4F0FF]/90 font-light">
                <li className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">01.</span>
                  <span>
                    <strong className="font-medium text-[#F4F0FF]">
                      Генерация персонального кода сигнала:
                    </strong>{" "}
                    вы сразу увидите сформированный демонстрационный пропуск
                    Orbital Pass с выбранной вами частотой и импульсами.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">02.</span>
                  <span>
                    <strong className="font-medium text-[#F4F0FF]">
                      Привилегия раннего этапа (при запуске сервера):
                    </strong>{" "}
                    участники первой волны Open Beta получат статус{" "}
                    <em>Founder&apos;s Orbit</em> — расширенный контроль радиуса
                    радара и приоритетный доступ к закрытым сценариям знакомств.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">03.</span>
                  <span>
                    <strong className="font-medium text-[#F4F0FF]">
                      Прозрачность демо-сценария:
                    </strong>{" "}
                    поскольку эта страница работает без подключённого внешнего
                    сервера, введённые данные валидируются локально в браузере и не
                    передаются третьим лицам.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Registration Form / Demo Confirmation */}
          <div className="lg:col-span-7">
            <div className="cosmic-glass rounded-[32px] p-6 sm:p-10 border border-[#A79AFF]/30 shadow-[0_0_80px_-20px_rgba(110,91,255,0.35)]">
              {demoResult ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6 py-4 animate-hero-reveal"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="signal">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#A79AFF]" aria-hidden="true" />
                      <span>ДЕМО-ЗАЯВКА СФОРМИРОВАНА · {demoResult.submittedAt}</span>
                    </Badge>
                    <span className="font-mono-tech text-xs text-[#A7A6B8]">
                      CLIENT-SIDE DEMO MODE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-editorial text-3xl sm:text-4xl text-[#F4F0FF]">
                      Ваш сигнал откалиброван, {values.alias}.
                    </h3>
                    <p className="text-sm text-[#A7A6B8] font-light leading-relaxed">
                      Ниже представлена карточка вашего конфигурационного пропуска для
                      Open Beta. В текущей демонстрационной версии без backend-сервера
                      данные проверены на стороне клиента и не сохранялись во внешнюю
                      базу данных.
                    </p>
                  </div>

                  {/* Generated Orbital Pass Card */}
                  <div className="rounded-2xl bg-[#080910] border border-[#A79AFF]/35 p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#A79AFF]/15">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A79AFF] block">
                          FOUNDER&apos;S ORBITAL PASS (DEMO)
                        </span>
                        <span className="font-mono-tech text-lg text-[#F4F0FF]">
                          {demoResult.passCode}
                        </span>
                      </div>
                      <Radio className="h-5 w-5 text-[#6E5BFF]" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-mono-tech text-[#A7A6B8] block">
                          ИМЯ / ПСЕВДОНИМ:
                        </span>
                        <span className="text-[#F4F0FF] font-medium mt-0.5 block">
                          {values.alias} ({values.email})
                        </span>
                      </div>
                      <div>
                        <span className="font-mono-tech text-[#A7A6B8] block">
                          ЧАСТОТА СОСТОЯНИЯ:
                        </span>
                        <span className="text-[#A79AFF] font-medium mt-0.5 block">
                          {values.signalState}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono-tech text-[#A7A6B8] block">
                          ВРЕМЯ АКТИВНОСТИ ОРБИТЫ:
                        </span>
                        <span className="text-[#F4F0FF] mt-0.5 block">
                          {values.orbitWindow}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono-tech text-[#A7A6B8] block">
                          ВЫБРАННЫЕ ИМПУЛЬСЫ:
                        </span>
                        <span className="text-[#F4F0FF] mt-0.5 block">
                          {selectedDesireTitles.length > 0
                            ? selectedDesireTitles.join(", ")
                            : "Базовый резонанс"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="orbital"
                      onClick={() => setDemoResult(null)}
                    >
                      Изменить параметры сигнала
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const el = document.getElementById("radar")
                        if (el) el.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      <span>Вернуться к радару</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Форма регистрации в Open Beta AstroSyncho"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#A79AFF]/15">
                    <div>
                      <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                        РЕГИСТРАЦИЯ СИГНАЛА · OPEN BETA
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] mt-0.5">
                        Запрос на включение в орбиту
                      </h3>
                    </div>
                    <Badge variant="subtle">DEMO VALIDATION</Badge>
                  </div>

                  {/* Accessible Error Summary when validation fails */}
                  {Object.keys(errors).length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      className="rounded-2xl bg-[#2A121E]/90 border border-rose-400/50 p-4 text-xs text-rose-100 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 font-mono-tech uppercase tracking-wider text-rose-300">
                        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Проверьте заполнение полей формы:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {errors.alias && <li>{errors.alias}</li>}
                        {errors.email && <li>{errors.email}</li>}
                        {errors.consent && <li>{errors.consent}</li>}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Field 1: Name / Alias */}
                    <div className="space-y-2">
                      <label
                        htmlFor="beta-alias"
                        className="block font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F4F0FF]"
                      >
                        Имя или псевдоним в эфире *
                      </label>
                      <Input
                        id="beta-alias"
                        name="alias"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Например, Элина или Орион"
                        value={values.alias}
                        aria-invalid={Boolean(errors.alias)}
                        aria-describedby={errors.alias ? "beta-alias-error" : undefined}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, alias: e.target.value }))
                          if (errors.alias) {
                            setErrors((prev) => ({ ...prev, alias: undefined }))
                          }
                        }}
                      />
                      {errors.alias && (
                        <p id="beta-alias-error" className="text-xs text-rose-300">
                          {errors.alias}
                        </p>
                      )}
                    </div>

                    {/* Field 2: Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="beta-email"
                        className="block font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F4F0FF]"
                      >
                        Email для приглашения *
                      </label>
                      <Input
                        id="beta-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="signal@domain.com"
                        value={values.email}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "beta-email-error" : undefined}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }))
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }))
                          }
                        }}
                      />
                      {errors.email && (
                        <p id="beta-email-error" className="text-xs text-rose-300">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Field 3: Primary Signal State */}
                  <div className="space-y-2">
                    <label
                      htmlFor="beta-signal-state"
                      className="block font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F4F0FF]"
                    >
                      Ваше первичное состояние сигнала
                    </label>
                    <div
                      id="beta-signal-state"
                      className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                      role="radiogroup"
                      aria-label="Первичное состояние сигнала"
                    >
                      {SIGNAL_STATES.map((st) => {
                        const active = values.signalState === st.key
                        return (
                          <button
                            key={st.key}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => {
                              setValues((prev) => ({ ...prev, signalState: st.key }))
                              onSelectStateKey(st.key)
                            }}
                            className={`rounded-xl px-3 py-2.5 text-xs font-mono-tech transition-all cursor-pointer border ${
                              active
                                ? "bg-[#6E5BFF] text-[#F4F0FF] border-[#A79AFF]"
                                : "bg-[#080910]/85 text-[#A7A6B8] border-[#A79AFF]/20 hover:text-[#F4F0FF]"
                            }`}
                          >
                            {st.titleEn}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Field 4: Preferred Active Orbit Window */}
                  <div className="space-y-2">
                    <label
                      htmlFor="beta-orbit-window"
                      className="block font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F4F0FF]"
                    >
                      Предпочтительное время резонанса
                    </label>
                    <select
                      id="beta-orbit-window"
                      name="orbitWindow"
                      value={values.orbitWindow}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, orbitWindow: e.target.value }))
                      }
                      className="flex h-12 w-full rounded-xl bg-[#0D0F18]/90 border border-[#A79AFF]/20 px-4 py-3 text-sm text-[#F4F0FF] focus-visible:border-[#A79AFF] focus-visible:outline-none"
                    >
                      <option value="22:00 — 02:00 · Ночной эфир">
                        22:00 — 02:00 · Ночной эфир и полутона
                      </option>
                      <option value="18:00 — 22:00 · Вечерние сумерки">
                        18:00 — 22:00 · Вечерние сумерки города
                      </option>
                      <option value="Свободная фаза · По совпадению импульса">
                        Свободная фаза · По совпадению импульса
                      </option>
                    </select>
                  </div>

                  {/* Field 5: Optional Note */}
                  <div className="space-y-2">
                    <label
                      htmlFor="beta-note"
                      className="block font-mono-tech text-xs uppercase tracking-[0.14em] text-[#A7A6B8]"
                    >
                      Короткий сигнал в эфир (необязательно)
                    </label>
                    <Input
                      id="beta-note"
                      name="personalNote"
                      type="text"
                      placeholder="Фраза, песня или место, которое описывает вашу частоту..."
                      value={values.personalNote}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, personalNote: e.target.value }))
                      }
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={values.consent}
                        aria-invalid={Boolean(errors.consent)}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, consent: e.target.checked }))
                          if (errors.consent) {
                            setErrors((prev) => ({ ...prev, consent: undefined }))
                          }
                        }}
                        className="mt-1 h-4 w-4 rounded border-[#A79AFF]/40 bg-[#080910] accent-[#6E5BFF] cursor-pointer"
                      />
                      <span className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                        Я понимаю, что это интерактивная демонстрационная форма Open
                        Beta без отправки персональных данных на внешний сервер, и
                        соглашаюсь с концептуальными правилами приватности AstroSyncho. *
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-rose-300 pl-7">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Калибровка вашего сигнала...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" aria-hidden="true" />
                          <span>Активировать сигнал в Open Beta</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
