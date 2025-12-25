import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Workflow } from "@/components/workflow"
import { VoiceAgent } from "@/components/voice-agent"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Workflow />
      <section id="voice-agent">
        <VoiceAgent />
      </section>
      <Footer />
    </main>
  )
}
