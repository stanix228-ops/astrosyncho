import React, { useEffect } from "react"
import { X, ShieldCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export type LegalDocType = "privacy" | "terms" | null

interface LegalModalProps {
  openDoc: LegalDocType
  onClose: () => void
}

export const LegalModal: React.FC<LegalModalProps> = ({ openDoc, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openDoc) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [openDoc, onClose])

  if (!openDoc) return null

  const isPrivacy = openDoc === "privacy"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080910]/85 backdrop-blur-xl animate-hero-reveal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="cosmic-glass relative w-full max-w-2xl rounded-[28px] border border-[#A79AFF]/35 p-6 sm:p-8 text-[#F4F0FF] shadow-[0_0_80px_-10px_rgba(110,91,255,0.45)] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#A79AFF]/15">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? (
              <ShieldCheck className="h-5 w-5 text-[#A79AFF]" aria-hidden="true" />
            ) : (
              <FileText className="h-5 w-5 text-[#A79AFF]" aria-hidden="true" />
            )}
            <div>
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#A79AFF] block">
                ASTROSYNCHO LEGAL & CONCEPT DISCLOSURE
              </span>
              <h2 id="legal-modal-title" className="font-editorial text-2xl sm:text-3xl">
                {isPrivacy ? "Privacy Policy (Политика приватности)" : "Terms of Service (Условия использования)"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="rounded-full p-2 text-[#A7A6B8] hover:text-[#F4F0FF] hover:bg-[#14182A] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-[#A7A6B8] font-light leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="text-[#F4F0FF]">
                Настоящий документ описывает принципы обработки данных в рамках
                интерактивной демонстрационной версии сайта <strong>AstroSyncho</strong>.
              </p>
              <p>
                <strong>1. Отсутствие скрытого сбора данных в демо-режиме:</strong>{" "}
                Данный веб-сайт работает как клиентское интерактивное приложение.
                Данные, которые вы вводите в форму Open Beta или в селектор сигналов,
                обрабатываются исключительно локально в оперативной памяти вашего
                браузера и не отправляются на внешние серверы.
              </p>
              <p>
                <strong>2. Архитектура для Production-версии:</strong> При подключении
                серверного API в рамках релиза Open Beta мы предусматриваем
                хранение профилей в зашифрованном контуре, настройку времени жизни
                сообщений (24 часа по умолчанию) и возможность полного удаления
                орбиты пользователя по первому запросу.
              </p>
              <p>
                <strong>3. Технические ограничения веб-среды:</strong> AstroSyncho не
                использует вводящих в заблуждение заявлений об абсолютной защите от
                скриншотов в браузере, поскольку операционные системы и внешние
                устройства находятся вне контроля веб-страницы.
              </p>
            </>
          ) : (
            <>
              <p className="text-[#F4F0FF]">
                Добро пожаловать в концептуальное пространство <strong>AstroSyncho</strong>.
              </p>
              <p>
                <strong>1. Назначение проекта:</strong> AstroSyncho — это цифровой
                сервис знакомств для совершеннолетних пользователей (18+), основанный
                на метафоре космической синхронности, совпадении ритмов активности и
                взаимном уважении к личным границам.
              </p>
              <p>
                <strong>2. Концептуальные профили:</strong> Все портреты и сигналы,
                представленные в секции «Космический радар», являются художественными
                редакционными иллюстрациями концепции и не изображают анкеты реальных
                зарегистрированных пользователей.
              </p>
              <p>
                <strong>3. Научная добросовестность:</strong> Механика «орбитального
                резонанса» и «частоты сигнала» является художественной и продуктовой
                моделью персонализации пользовательского опыта и не претендует на
                статус научно доказанной астрологической или биоритмической методики.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#A79AFF]/15 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Понятно · Закрыть
          </Button>
        </div>
      </div>
    </div>
  )
}
