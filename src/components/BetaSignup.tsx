import React, { useState, useRef } from "react"
import {
  Sparkles,
  AlertTriangle,
  Loader2,
  Code2,
  ArrowRight,
  Gift,
} from "lucide-react"
import {
  SIGNAL_STATES,
  DESIRE_ITEMS,
  type SignalStateConfig,
} from "@/data/astroData"
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
 * Integration Endpoint Specification (Backend Not Connected in Demo)
 * Target endpoint: POST /api/v1/beta-waitlist
 */
export const BETA_API_INTEGRATION_ENDPOINT = "/api/v1/beta-waitlist"

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

  React.useEffect(() => {
    setValues((prev) => ({ ...prev, signalState: selectedStateKey }))
  }, [selectedStateKey])

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  const [preparedPayload, setPreparedPayload] = useState<{
    endpoint: string
    payload: FormValues & { desires: string[] }
  } | null>(null)

  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}
    if (!values.alias.trim() || values.alias.trim().length < 2) {
      nextErrors.alias = "Укажите ваше имя или псевдоним (минимум 2 символа)."
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email =
        "Введите корректный адрес электронной почты (например, name@domain.com)."
    }
    if (!values.consent) {
      nextErrors.consent =
        "Необходимо отметить согласие с условиями участия в Open Beta."
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

    setIsValidating(true)
    await new Promise((resolve) => setTimeout(resolve, 450))
    setPreparedPayload({
      endpoint: BETA_API_INTEGRATION_ENDPOINT,
      payload: {
        ...values,
        desires: selectedDesireIds,
      },
    })
    setIsValidating(false)
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
        {/* Final Cosmic Convergence Scene: Space gathers around a single glowing focal point */}
        <div className="flex flex-col items-center text-center mb-14">
          <div
            className="relative flex h-28 w-28 items-center justify-center mb-4"
            aria-hidden="true"
          >
            <span className="absolute inset-0 rounded-full border border-[#A79AFF]/25 animate-orbit-slow" />
            <span className="absolute inset-3 rounded-full border border-dashed border-[#6E5BFF]/45 animate-orbit-reverse" />
            <span className="absolute inset-6 rounded-full bg-[#6E5BFF]/25 blur-md animate-signal-pulse" />
            <span className="relative h-4 w-4 rounded-full bg-[#F4F0FF] shadow-[0_0_28px_8px_#6E5BFF]" />
          </div>

          <span className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#A79AFF]">
            08 // OPEN BETA — YOUR SIGNAL BELONGS HERE
          </span>
          <h2
            id="beta-heading"
            className="mt-2 font-editorial text-4xl sm:text-6xl lg:text-[68px] font-normal text-[#F4F0FF] leading-[1.02]"
          >
            Твой сигнал{" "}
            <span className="italic text-[#A79AFF]">принадлежит этой Вселенной.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Cols: Open Beta Context, Early-Access Gift & Next Step Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-[#A7A6B8] font-light leading-relaxed">
              AstroSyncho открыт для набора участников закрытого и открытого
              бета-тестирования. Присоединяйтесь к сообществу людей, ищущих
              настоящий эмоциональный резонанс.
            </p>

            {/* Early User Welcome Gift Card */}
            <div className="rounded-2xl bg-[#14182A]/75 border border-[#A79AFF]/30 p-5 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6E5BFF]/20 border border-[#A79AFF]/40 text-[#A79AFF]">
                <Gift className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                  ПРИВЕТСТВЕННАЯ ПРИВИЛЕГИЯ РАННИХ УЧАСТНИКОВ
                </span>
                <h3 className="font-editorial text-xl text-[#F4F0FF]">
                  Статус Founder&apos;s Orbit при запуске приложения
                </h3>
                <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                  Для участников первой волны бета-тестирования предусмотрен
                  приветственный подарок — расширенный радиус сканирования радара
                  и доступ к закрытым сценариям вечернего резонанса.
                </p>
              </div>
            </div>

            {/* Clear Explanation of Next Steps & Backend Integration Point */}
            <div className="cosmic-glass rounded-[26px] p-6 border border-[#A79AFF]/20 space-y-4">
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#A79AFF]">
                СЛЕДУЮЩИЙ ШАГ И СТАТУС ИНТЕГРАЦИИ:
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm text-[#F4F0FF]/90 font-light">
                <li className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">
                    01.
                  </span>
                  <span>
                    <strong className="font-medium text-[#F4F0FF]">
                      Калибровка параметров:
                    </strong>{" "}
                    выберите ваше состояние сигнала ({values.signalState}) и
                    предпочтительное время активности орбиты.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs text-[#A79AFF] mt-0.5">
                    02.
                  </span>
                  <span>
                    <strong className="font-medium text-[#F4F0FF]">
                      Точка подключения Backend API:
                    </strong>{" "}
                    в текущем фронтенд-проекте внешний сервер ещё не подключён.
                    Форма выполняет полноценную клиентскую валидацию и формирует
                    готовый JSON-запрос к эндпоинту{" "}
                    <code className="font-mono-tech text-[#A79AFF]">
                      POST /api/v1/beta-waitlist
                    </code>{" "}
                    без имитации ложного сохранения в БД.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right 7 Cols: Form UI + Explicit Integration Point Inspector */}
          <div className="lg:col-span-7">
            <div className="cosmic-glass rounded-[32px] p-6 sm:p-10 border border-[#A79AFF]/30 shadow-[0_0_80px_-20px_rgba(110,91,255,0.35)]">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
                aria-label="Форма регистрации в Open Beta AstroSyncho"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#A79AFF]/15">
                  <div>
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#A79AFF] block">
                      OPEN BETA · ПАРАМЕТРЫ ВАШЕГО СИГНАЛА
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4F0FF] mt-0.5">
                      Присоединиться к бета-тестированию
                    </h3>
                  </div>
                  <Badge variant="subtle">API ENDPOINT: /api/v1/beta-waitlist</Badge>
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
                      <AlertTriangle
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
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
                      aria-describedby={
                        errors.alias ? "beta-alias-error" : undefined
                      }
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          alias: e.target.value,
                        }))
                        setPreparedPayload(null)
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
                      aria-describedby={
                        errors.email ? "beta-email-error" : undefined
                      }
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                        setPreparedPayload(null)
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
                            setValues((prev) => ({
                              ...prev,
                              signalState: st.key,
                            }))
                            onSelectStateKey(st.key)
                            setPreparedPayload(null)
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
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        orbitWindow: e.target.value,
                      }))
                      setPreparedPayload(null)
                    }}
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
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        personalNote: e.target.value,
                      }))
                      setPreparedPayload(null)
                    }}
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
                        setValues((prev) => ({
                          ...prev,
                          consent: e.target.checked,
                        }))
                        setPreparedPayload(null)
                        if (errors.consent) {
                          setErrors((prev) => ({
                            ...prev,
                            consent: undefined,
                          }))
                        }
                      }}
                      className="mt-1 h-4 w-4 rounded border-[#A79AFF]/40 bg-[#080910] accent-[#6E5BFF] cursor-pointer"
                    />
                    <span className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                      Я ознакомлен с концепцией проекта AstroSyncho и соглашаюсь
                      проверить параметры своей заявки для Open Beta. *
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
                    disabled={isValidating}
                    className="w-full"
                  >
                    {isValidating ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        <span>Проверка параметров сигнала...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <span>Активировать сигнал в Open Beta</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Honest Integration Point Inspector (No Fake Registration Claim) */}
                {preparedPayload && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-2xl bg-[#080910] border border-[#A79AFF]/40 p-5 space-y-3 animate-hero-reveal"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#A79AFF]">
                        <Code2 className="h-4 w-4" aria-hidden="true" />
                        <span>
                          ТОЧКА ИНТЕГРАЦИИ API ГОТОВА (BACKEND НЕ ПОДКЛЮЧЁН)
                        </span>
                      </span>
                      <Badge variant="signal">ВАЛИДАЦИЯ ПРОЙДЕНА</Badge>
                    </div>

                    <p className="text-xs text-[#A7A6B8] font-light leading-relaxed">
                      Клиентская валидация для{" "}
                      <strong className="text-[#F4F0FF]">
                        {preparedPayload.payload.alias}
                      </strong>{" "}
                      выполнена успешно. Поскольку серверный backend в текущей
                      демонстрационной среде отсутствует, мы не имитируем фиктивное
                      сохранение в базу данных. Ниже представлен сформированный
                      объект для отправки в{" "}
                      <code className="font-mono-tech text-[#F4F0FF]">
                        POST {preparedPayload.endpoint}
                      </code>
                      :
                    </p>

                    <pre className="rounded-xl bg-[#0D0F18] border border-[#A79AFF]/20 p-3.5 text-[11px] font-mono-tech text-[#F4F0FF]/90 overflow-x-auto">
                      {JSON.stringify(
                        {
                          alias: preparedPayload.payload.alias,
                          email: preparedPayload.payload.email,
                          signalState: preparedPayload.payload.signalState,
                          orbitWindow: preparedPayload.payload.orbitWindow,
                          impulses: selectedDesireTitles,
                        },
                        null,
                        2
                      )}
                    </pre>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("radar")
                          if (el) el.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#A79AFF] hover:text-[#F4F0FF] cursor-pointer"
                      >
                        <span>Вернуться к радару</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
