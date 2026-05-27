import { OmniaNav } from '@/components/omnia-nav'
import { HeroSection } from '@/components/hero-section'
import { CurlSection } from '@/components/curl-section'
import { ArchitectureSection } from '@/components/architecture-section'
import { AgentSection } from '@/components/agent-section'
import { PerformanceSection } from '@/components/performance-section'
import { TransparencySection } from '@/components/transparency-section'
import { EventStream } from '@/components/event-stream'
import { ContributeSection } from '@/components/contribute-section'
import { Footer } from '@/components/footer'
import { OmniaProviders } from '@/components/providers'

const isLiveMode = process.env.NEXT_PUBLIC_LIVE_MODE === 'true'

export default function Home() {
  return (
    <OmniaProviders>
      <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
        <OmniaNav />
        <main className="flex-1">
          <HeroSection />
          <CurlSection />
          <ArchitectureSection />
          <AgentSection />
          <PerformanceSection />
          <TransparencySection />
          {isLiveMode && <EventStream />}
          <ContributeSection />
        </main>
        <Footer />
      </div>
    </OmniaProviders>
  )
}
