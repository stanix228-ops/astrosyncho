import { useState } from "react"
import { IntroOverlay } from "@/components/IntroOverlay"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { CosmicRadar } from "@/components/CosmicRadar"
import { Synchronicity } from "@/components/Synchronicity"
import { Desires } from "@/components/Desires"
import { Connection } from "@/components/Connection"
import { Privacy } from "@/components/Privacy"
import { SignalSelector } from "@/components/SignalSelector"
import { HumanStories } from "@/components/HumanStories"
import { BetaSignup } from "@/components/BetaSignup"
import { Footer } from "@/components/Footer"
import { LegalModal, type LegalDocType } from "@/components/LegalModal"
import {
  RADAR_SIGNALS,
  type RadarSignalNode,
  type SignalStateConfig,
} from "@/data/astroData"

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true)
  const [selectedSignalId, setSelectedSignalId] = useState<string>(
    RADAR_SIGNALS[0].id
  )
  const [userSignalState, setUserSignalState] =
    useState<SignalStateConfig["key"]>("Attraction")
  const [selectedDesireIds, setSelectedDesireIds] = useState<string[]>([
    "desire-01",
    "desire-02",
  ])
  const [openLegalDoc, setOpenLegalDoc] = useState<LegalDocType>(null)

  const activeRadarSignal: RadarSignalNode =
    RADAR_SIGNALS.find((s) => s.id === selectedSignalId) || RADAR_SIGNALS[0]

  const handleTestSynchronicity = (signal: RadarSignalNode) => {
    setSelectedSignalId(signal.id)
    const el = document.getElementById("synchronicity")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleToggleDesire = (id: string) => {
    setSelectedDesireIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-[#080910] text-[#F4F0FF] relative selection:bg-[#6E5BFF]/35 selection:text-[#F4F0FF]">
      {showIntro && (
        <IntroOverlay
          onComplete={() => setShowIntro(false)}
          durationMs={5000}
        />
      )}
      {/* Top Navigation */}
      <Navigation activeSignalLabel={userSignalState} />

      {/* Main Sequential Narrative */}
      <main>
        {/* 01. HERO */}
        <Hero onSelectRadarSignal={(id) => setSelectedSignalId(id)} />

        {/* 02. ACTIVE SIGNALS (SIGNAL DETECTION / 01) */}
        <CosmicRadar
          selectedSignalId={selectedSignalId}
          onSelectSignal={setSelectedSignalId}
          onTestSynchronicity={handleTestSynchronicity}
        />

        {/* 03. SYNCHRONICITY (SYNCHRONICITY / 02) */}
        <Synchronicity
          partnerSignal={activeRadarSignal}
          onSelectSignal={setSelectedSignalId}
        />

        {/* 04. DESIRES (DESIRES / 03) */}
        <Desires
          selectedDesireIds={selectedDesireIds}
          onToggleDesire={handleToggleDesire}
        />

        {/* 05. CONNECTION (CONNECTION / 04) */}
        <Connection />

        {/* 06. PRIVACY (PRIVACY / 05) */}
        <Privacy onOpenLegal={(doc) => setOpenLegalDoc(doc)} />

        {/* 07. YOUR SIGNAL */}
        <SignalSelector
          selectedStateKey={userSignalState}
          onSelectStateKey={setUserSignalState}
        />

        {/* 08. HUMAN STORIES */}
        <HumanStories />

        {/* 09. OPEN BETA */}
        <BetaSignup
          selectedStateKey={userSignalState}
          onSelectStateKey={setUserSignalState}
          selectedDesireIds={selectedDesireIds}
        />
      </main>

      {/* 10. LARGE FOOTER */}
      <Footer onOpenLegal={(doc) => setOpenLegalDoc(doc)} />

      {/* Legal & Concept Disclosure Modal */}
      <LegalModal
        openDoc={openLegalDoc}
        onClose={() => setOpenLegalDoc(null)}
      />
    </div>
  )
}

export default App
