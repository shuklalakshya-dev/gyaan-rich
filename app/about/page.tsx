"use client"

import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Target, Heart, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower students and institutions through innovative educational solutions and expert guidance.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      hoverGradient: "from-blue-500/30 to-cyan-500/30",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Excellence, integrity, innovation, and a commitment to transforming students through education.",
      gradient: "from-purple-500/20 to-pink-500/20",
      hoverGradient: "from-purple-500/30 to-pink-500/30",
    },
    {
      icon: Zap,
      title: "Our Vision",
      description:
        "To be the leading educational platform that bridges the gap between aspirations and achievements.",
      gradient: "from-orange-500/20 to-yellow-500/20",
      hoverGradient: "from-orange-500/30 to-yellow-500/30",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="About Gyan Rich"
        description="Pioneering educational excellence through innovation, expertise, and dedication"
      />

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story </h2>
              <p className="text-lg text-foreground/70 mb-4">
                At Gyan Rich, our journey began with a simple vision — to make learning meaningful and personal for every student. We realized that schools often focus on academics but lack the emotional and digital support that truly helps students grow. That's where we stepped in. Gyan Rich bridges this gap by providing expert counselling sessions, interactive video lectures, and customized digital platforms for schools. Our mission is to empower institutions to go beyond textbooks — helping students discover their potential, schools scale their impact, and learning become an inspiring journey for all.
              </p>
              <p className="text-lg text-foreground/70">
                Over the years, we have helped thousands of students achieve their dreams and supported numerous
                educational institutions in their digital transformation journey.
              </p>
            </div>

            <div className="flex items-center justify-end pl-8">
              <Image
                src="/logo_gyanrich_withbg.png"
                alt="Gyan Rich - We will light the lamp of knowledge"
                width={420}
                height={520}
                className="object-contain w-full h-auto max-w-[320px]"
                priority
              />
            </div>
          </div>

          {/* Mission, Values, Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {cards.map((card, index) => {
              const Icon = card.icon
              const isHovered = hoveredCard === index

              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative bg-card rounded-2xl p-8 border-2 border-border transition-all duration-300 h-full flex flex-col items-center text-center ${
                      isHovered ? "scale-[1.02] shadow-2xl shadow-accent/20 border-accent/50 bg-accent" : ""
                    }`}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-accent transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                          isHovered
                            ? "bg-accent scale-110 rotate-6"
                            : "bg-gradient-to-br " + card.gradient + " border-2 border-border"
                        }`}
                      >
                        <Icon className={`w-10 h-10 transition-colors duration-300 ${isHovered ? "text-white" : "text-accent"}`} />
                      </div>

                      <h2 className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${isHovered ? "text-accent" : ""}`}>
                        {card.title}
                      </h2>

                      <p className={`text-lg leading-relaxed transition-colors duration-300 ${isHovered ? "text-foreground" : "text-foreground/70"}`}>
                        {card.description}
                      </p>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-20 transition-opacity duration-300 ${
                        isHovered ? "opacity-40" : ""
                      }`}
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
