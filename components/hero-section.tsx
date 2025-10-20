import Link from "next/link"
import Prism from "./Prism"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground py-20 md:py-32 overflow-hidden">
      {/* Prism Background */}
      <div className="relative inset-0 w-full h-full -z-10">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Empower Your <span className="text-accent">Education</span> Journey
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 text-balance">
              Gyaan Rich provides comprehensive counselling, engaging lectures, and custom school websites to transform
              educational experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
              >
                Start Your Journey
              </Link>
              <Link
                href="/services"
                className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-colors text-center"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl"></div>
            <div className="absolute inset-4 bg-secondary/50 rounded-xl border-2 border-accent/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-4">∞</div>
                <p className="text-secondary-foreground/70">Unlimited Learning Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
