import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Target, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="About Gyaan Rich"
        description="Pioneering educational excellence through innovation, expertise, and dedication"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story </h2>
              <p className="text-lg text-foreground/70 mb-4">
                Gyaan Rich was founded with a simple yet powerful mission: to revolutionize education by making quality
                learning accessible to everyone. We believe that every student deserves expert guidance and engaging
                educational content.
              </p>
              <p className="text-lg text-foreground/70">
                Over the years, we have helped thousands of students achieve their dreams and supported numerous
                educational institutions in their digital transformation journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-12 border border-accent/20 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-4">10K+</div>
                <p className="text-foreground/70">Students Empowered</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To empower students and institutions through innovative educational solutions and expert guidance.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description:
                  "Excellence, integrity, innovation, and a commitment to transforming lives through education.",
              },
              {
                icon: Zap,
                title: "Our Vision",
                description:
                  "To be the leading educational platform that bridges the gap between aspirations and achievements.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 border border-border hover:border-accent transition-colors"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground rounded-2xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Choose Gyaan Rich?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Expert team with years of experience",
                "Personalized solutions for each client",
                "Proven track record of success",
                "Cutting-edge technology and tools",
                "24/7 customer support",
                "Affordable and flexible pricing",
              ].map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-foreground text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
