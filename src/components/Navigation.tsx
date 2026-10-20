import React, { useState, useEffect } from "react"
import { Menu, X, Radio, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeSignalLabel: string
  onNavigate?: (sectionId: string) => void
}

const NAV_LINKS = [
  { id: "radar", label: "Сигналы", num: "01" },
  { id: "synchronicity", label: "Синхронность", num: "02" },
  { id: "desires", label: "Желания", num: "03" },
  { id: "connection", label: "Связь", num: "04" },
  { id: "privacy", label: "Приватность", num: "05" },
  { id: "signal", label: "Ваш сигнал", num: "06" },
]

export const Navigation: React.FC<NavigationProps> = ({ activeSignalLabel }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080910]/85 backdrop-blur-xl border-b border-[#A79AFF]/15 py-3.5"
          : "bg-gradient-to-b from-[#080910]/90 via-[#080910]/40 to-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("hero")
          }}
          className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#A79AFF] rounded-lg"
          aria-label="AstroSyncho — На главную"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#A79AFF]/35 bg-[#14182A]/80 transition-transform duration-500 group-hover:scale-105">
            <span
              className="absolute inset-1 rounded-full border border-[#6E5BFF]/50 animate-orbit-slow"
              aria-hidden="true"
            />
            <span
              className="h-2 w-2 rounded-full bg-[#F4F0FF] shadow-[0_0_12px_2px_#6E5BFF]"
              aria-hidden="true"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-brand text-2xl sm:text-[26px] tracking-[0.04em] text-[#F4F0FF] leading-none">
              AstroSyncho
            </span>
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.24em] text-[#A7A6B8] mt-0.5">
              Orbital Intimacy
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Основная навигация"
          className="hidden lg:flex items-center gap-1 xl:gap-2 rounded-none border border-[#A79AFF]/15 bg-[#0D0F18]/75 px-4 py-1.5 backdrop-blur-md"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
              className="group relative whitespace-nowrap px-3 py-1.5 text-xs sm:text-[13px] text-[#A7A6B8] hover:text-[#F4F0FF] transition-colors rounded-none"
            >
              <span className="font-mono-tech text-[10px] text-[#6E5BFF] mr-1.5 opacity-75 group-hover:opacity-100">
                {item.num}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Actions & Live Signal Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("signal")}
            className="hidden xl:flex items-center gap-2 rounded-none border border-[#A79AFF]/20 bg-[#14182A]/60 px-3.5 py-1.5 text-[11px] font-mono-tech text-[#A7A6B8] hover:text-[#F4F0FF] hover:border-[#A79AFF]/45 transition-all cursor-pointer"
            title="Изменить ваш активный сигнал"
          >
            <Radio className="h-3.5 w-3.5 text-[#A79AFF] animate-pulse" aria-hidden="true" />
            <span>ЧАСТОТА:</span>
            <span className="text-[#F4F0FF] font-medium">{activeSignalLabel.toUpperCase()}</span>
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => scrollToSection("beta")}
            className="px-5 py-2.5 h-10 text-xs font-mono-tech tracking-[0.14em]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Войти в орбиту</span>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#A79AFF]/25 bg-[#14182A]/80 text-[#F4F0FF] hover:border-[#A79AFF]/60 transition-colors cursor-pointer"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? "Закрыть меню навигации" : "Открыть меню навигации"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#080910]/95 backdrop-blur-2xl border-b border-[#A79AFF]/20 px-4 pt-4 pb-6 mt-3 animate-hero-reveal"
        >
          <nav aria-label="Мобильная навигация" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className="flex items-center justify-between rounded-none px-4 py-3 text-base text-[#F4F0FF] hover:bg-[#14182A]/70 transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono-tech text-xs text-[#A79AFF]">{item.num}</span>
              </a>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-[#A79AFF]/15 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono-tech text-[#A7A6B8]">
              <span>АКТИВНЫЙ СИГНАЛ:</span>
              <span className="text-[#A79AFF]">{activeSignalLabel.toUpperCase()}</span>
            </div>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => scrollToSection("beta")}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Войти в орбиту · Open Beta</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
