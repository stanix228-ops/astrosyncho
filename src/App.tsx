import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { CosmicRadar } from "@/components/CosmicRadar"
import { Synchronicity } from "@/components/Synchronicity"
import { HumanStories } from "@/components/HumanStories"
import { SignalSelector } from "@/components/SignalSelector"
import { Desires } from "@/components/Desires"
import { Privacy } from "@/components/Privacy"
import { BetaSignup } from "@/components/BetaSignup"
import { Footer } from "@/components/Footer"
import { LegalModal, type LegalDocType } from "@/components/LegalModal"
import {
  RADAR_SIGNALS,
  type RadarSignalNode,
  type SignalStateConfig,
} from "@/data/astroData"

export function App() {
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
      {/* Subtle Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 film-grain opacity-60"
        aria-hidden="true"
      />

      {/* Top Navigation */}
      <Navigation activeSignalLabel={userSignalState} />

      {/* Main Sequential Narrative */}
      <main>
        {/* 01. HERO */}
        <Hero onSelectRadarSignal={(id) => setSelectedSignalId(id)} />

        {/* 02. SIGNAL DETECTED (COSMIC RADAR) */}
        <CosmicRadar
          selectedSignalId={selectedSignalId}
          onSelectSignal={setSelectedSignalId}
          onTestSynchronicity={handleTestSynchronicity}
        />

        {/* 03. SYNCHRONICITY & GALAXY BUILDER */}
        <Synchronicity
          partnerSignal={activeRadarSignal}
          onSelectSignal={setSelectedSignalId}
        />

        {/* 04. HUMAN STORIES */}
        <HumanStories />

        {/* 05. YOUR SIGNAL */}
        <SignalSelector
          selectedStateKey={userSignalState}
          onSelectStateKey={setUserSignalState}
        />

        {/* 06. DESIRES / TEMPTATIONS */}
        <Desires
          selectedDesireIds={selectedDesireIds}
          onToggleDesire={handleToggleDesire}
        />

        {/* 07. PRIVACY */}
        <Privacy />

        {/* 08. OPEN BETA */}
        <BetaSignup
          selectedStateKey={userSignalState}
          onSelectStateKey={setUserSignalState}
          selectedDesireIds={selectedDesireIds}
        />
      </main>

      {/* 09. LARGE FOOTER */}
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
