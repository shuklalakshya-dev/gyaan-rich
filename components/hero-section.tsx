import Link from "next/link"
import FloatingLines from "./FloatingLines"


export function HeroSection() {
  return (
    <section className="relative bg-black text-secondary-foreground py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh]">
      {/* FloatingLines Background */}
      <div className="absolute inset-0 w-full h-full">
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh]">
          {/* Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl w-full px-2 sm:px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance text-accent leading-tight">
              Empower Your <span className="text-accent">Education</span> Journey
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-foreground/80 text-balance leading-relaxed px-2 sm:px-4 md:px-8">
              Gyan Rich provides comprehensive counselling, engaging lectures, and custom school websites to transform
              educational experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 md:pt-6 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
              <a
                href="https://forms.office.com/r/EvDTiBr8fE"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transform duration-200"
              >
                Start Your Journey
              </a>
              <Link
                href="/services"
                className="text-white border-2 border-accent px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors text-center text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transform duration-200"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          {/* <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl"></div>
            <div className="absolute inset-4 bg-secondary/50 rounded-xl border-2 border-accent/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-4">∞</div>
                <p className="text-secondary-foreground/70">Unlimited Learning Possibilities</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
