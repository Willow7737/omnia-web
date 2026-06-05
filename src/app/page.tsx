import { OmniaNav } from '@/components/omnia-nav'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { ArchitecturePreview } from '@/components/architecture-preview'
import { PerformanceSection } from '@/components/performance-section'
import { AgentSection } from '@/components/agent-section'
import { TransparencySection } from '@/components/transparency-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { OmniaProviders } from '@/components/providers'

export default function Home() {
  return (
    <OmniaProviders>
      <div className="min-h-screen flex flex-col">
        <OmniaNav />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <ArchitecturePreview />
          <PerformanceSection />
          <AgentSection />
          <TransparencySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </OmniaProviders>
  )
}
